const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/updateImg');

const imageUpload = async (request, response) => {
    const { collection, id } = request.params;

    /********************** Gral Validations ***************************/

    // Collection exists validation
    const validCollections = ['users', 'hospitals', 'doctors'];
    if (!validCollections.includes(collection)) {
        return response.status(400).json({
            ok: false,
            msg: 'Collection must be users, hospitals or doctors'
        });
    };

    // file exist validation (express-fileupload)
    if (!request.files || Object.keys(request.files).length === 0) {
        return response.status(400).json({
            ok: false,
            msg: 'No files included'
        });
    };

    // file processing
    const file = request.files.img;
    //console.log(file);

    const cutName = file.name.split('.');
    const fileExtension = cutName[cutName.length - 1];

    // Extension validation
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if (!validExtensions.includes(fileExtension)) {
        return response.status(400).json({
            ok: false,
            msg: 'Invalid file extension'
        });
    };

    /********************** Gral Validations End ***************************/

    /********* Move File to folder in server and save in DB ****************/

    // Generate file name
    const fileName = `${uuidv4()}.${fileExtension}`;

    // Save path (from root - ./)
    const path = `./uploads/${collection}/${fileName}`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, error => {
        if (error) {
            return response.status(500).json({
                ok: false,
                msg: 'Error uploading image'
            });
        } else {
            // Update db
            updateImage(collection, id, fileName);

            response.status(200).json({
                ok: true,
                msg: 'File uploaded!',
                file: fileName
            });
        };
    });

    /************** Move File to folder in server End **********************/
}

const getImages = async (request, response) => {
    const { collection, image } = request.params;

    // build path
    let pathImg = path.join( __dirname, `../uploads/${collection}/${image}`);

    // default image

    // Refactorized
    // if( fs.existsSync( pathImg ) ) {
    //     response.sendFile(pathImg);
    // } else {
    //     const pathImage = path.join( __dirname, '../uploads/no-img.jpg');
    //     response.sendFile(pathImage);
    // }

    if( !fs.existsSync( pathImg ) ) {
        pathImg = path.join( __dirname, '../uploads/no-img.jpg');
    }

    // express respond with a file (not json)
    response.sendFile(pathImg);
}

module.exports = {
    imageUpload,
    getImages
}