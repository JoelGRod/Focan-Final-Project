import { Component, OnInit } from '@angular/core';
// Services
import { ModalImageService } from 'src/app/services/modal-image.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
// External
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public photoUpload: File;
  public imgTemp: any = '';

  constructor( public modalImageService: ModalImageService,
                public fu: FileUploadService ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal();
  }

  updatePhotoInLocal(file: File) {
    this.photoUpload = file;

    if (!file) {
      return this.imgTemp = null;
    };

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  updatePhoto() {

    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fu.updatePhoto(this.photoUpload, type, id)
      .then(fileName => {
        Swal.fire('Saved', 'User image updated', 'success');
        this.modalImageService.newImage.emit(fileName);
        this.closeModal();
      })
      .catch(error => {
        console.log(error);
        Swal.fire('Error', 'Error updating image', 'error');
      });
  }

}
