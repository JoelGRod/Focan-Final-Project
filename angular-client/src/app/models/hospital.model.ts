
interface _HospitalUser {
    _id: string;
    name: string;
    img: string;
}

export class Hospital {

    // Manage images with pipes (alternative to user model method)

    constructor(
        public id: string,
        public name: string,
        public img?: string,
        public user?: _HospitalUser
    ) { }

}