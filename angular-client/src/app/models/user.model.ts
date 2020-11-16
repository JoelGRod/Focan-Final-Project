import { environment } from 'src/environments/environment.prod';

const base_url = environment.base_url;

export class User {
    
    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE',
        public uid?: string,
    ) { }

    get imageUrl() {
        if(!this.img) {
            return `${base_url}/uploads/users/no-image`;
        } else if(this.img.includes('https')) {
            return this.img;
        } else if(this.img) {
            return `${base_url}/uploads/users/${this.img}`;
        };
    }

}