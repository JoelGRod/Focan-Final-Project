import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// rxjs - observables
import { map } from 'rxjs/operators';
// Environment
import { environment } from 'src/environments/environment';
// Models
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchsService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(): Object {
    return { headers: { 'x-token': this.token } };
  }

  private userTransform(results: any[]): User[] {
    return results.map(
      user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid)
    );
  }

  private hospitalTransform(results: any[]): Hospital[] {
    return results.map(
      hospital => new Hospital(hospital.id, hospital.name, hospital.img, hospital.user)
    );
  }

  private doctorTransform(results: any[]): Doctor[] {
    return results.map(
      doctor => new Doctor(doctor.id, doctor.name, doctor.img, doctor.user, doctor.hospital)
    );
  }

  searchByCollection(type: 'user' | 'hospital' | 'doctor', search: string = '') {

    return this.http.get<any[]>(`${base_url}/search/collection/${type}/${search}`, this.headers)
      .pipe(
        map((resp: any) => {
          switch (type) {
            case 'user':
              return this.userTransform(resp.data);
            case 'hospital':
              return this.hospitalTransform(resp.data);
            case 'doctor':
              return this.doctorTransform(resp.data);
            default:
              return [];
          }
        })
      );
  }

  searchGlobal(search: string) {
    // http://localhost:3000/api/search/:search
    return this.http.get(`${base_url}/search/${search}`, this.headers);
  }


}
