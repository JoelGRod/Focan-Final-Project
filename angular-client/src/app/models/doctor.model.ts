interface _DoctorUser {
    _id: string;
    name: string;
    img: string;
}

interface _DoctorHospital {
    _id: string;
    name: string;
    img: string;
}

export class Doctor {

    // Manage images with pipes (alternative to user model method)

    constructor(
        public id: string,
        public name: string,
        public img?: string,
        public user?: _DoctorUser,
        public hospital?: _DoctorHospital
    ) { }

}