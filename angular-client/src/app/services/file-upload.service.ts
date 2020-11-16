import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  // Raw Javascript method, not http like user service. (Another point of view)
  async updatePhoto(
    file: File,
    type: 'users' | 'hospitals' | 'doctors',
    id: string
  ) {

    try {
      const url = `${base_url}/uploads/${type}/${id}`;
      // Data
      const formData = new FormData();
      formData.append('img', file);
      // http request
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      // Json transform
      const data = await resp.json();

      if( data.ok ) { 
        return data.file;
      } else {
        console.log(data.msg);
        return false;
      };

    } catch (error) {
      console.log(error);
      return false;
    }
  }

}
