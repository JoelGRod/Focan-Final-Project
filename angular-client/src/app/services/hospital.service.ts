import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// rxjs
import { delay, map } from 'rxjs/operators';
// Environment
import { environment } from 'src/environments/environment';
// Models
import { Hospital } from '../models/hospital.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }
  
  get headers(): Object {
    return { headers: { 'x-token': this.token } };
  }

  getHospitals() {
    return this.http.get(`${base_url}/hospitals`, this.headers)
      .pipe(
        delay(100),
        map((resp: { ok: boolean, hospitals: Hospital[] }) => {
          return resp.hospitals;
        })
      );
  }

  createHospital(name: string) {
    // http://localhost:3000/api/hospitals

    return this.http.post(`${base_url}/hospitals`, {name}, this.headers)
    .pipe(
      map((resp: { ok: boolean, hospital: Hospital }) => {
        return resp.hospital;
      })
    );
  }

  modifyHospital( id: string, name: string ) {
    // http://localhost:3000/api/hospitals/5fa5637145892e1d118a8e76

    return this.http.put(`${base_url}/hospitals/${id}`, {name}, this.headers)
    .pipe(
      map((resp: { ok: boolean, hospital: Hospital }) => {
        return resp.hospital;
      })
    );
  }

  deleteHospital( id: string ) {
    // http://localhost:3000/api/hospitals/5fa68871b76cf21baeff0f74

    return this.http.delete(`${base_url}/hospitals/${id}`, this.headers)
    .pipe(
      map((resp: { ok: boolean, msg: string, hospital: Hospital }) => {
        return resp.hospital;
      })
    );
  }

  

}

