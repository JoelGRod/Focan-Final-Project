import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// rxjs
import { delay, map } from 'rxjs/operators';
// Environments
import { environment } from 'src/environments/environment';
// Models
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  
  get headers(): Object {
    return { headers: { 'x-token': this.token } };
  }

  getDoctors() {
    // http://localhost:3000/api/doctors
    return this.http.get(`${base_url}/doctors`, this.headers)
      .pipe(
        delay(100),
        map((resp: { ok: boolean, doctors: Doctor[] }) => {
          return resp.doctors;
        })
      );
  }

  getDoctor(doctorId: string) {
    // http://localhost:3000/api/doctors/5fa90aeccf78a8120c0e5b8a
    return this.http.get(`${base_url}/doctors/${doctorId}`, this.headers)
      .pipe(
        delay(100),
        map((resp: { ok: boolean, doctor: Doctor }) => {
          return resp.doctor;
        })
      );
  }

  createDoctor(doctor: {name: string, hospital: string}) {
    // http://localhost:3000/api/doctors

    return this.http.post(`${base_url}/doctors`, doctor, this.headers)
    .pipe(
      map((resp: { ok: boolean, doctor: Doctor }) => {
        return resp.doctor;
      })
    );
  }

  modifyDoctor( doctor: Doctor ) {
    // http://localhost:3000/api/doctors/5fa90aeccf78a8120c0e5b8a

    return this.http.put(`${base_url}/doctors/${doctor.id}`, doctor, this.headers)
    .pipe(
      map((resp: { ok: boolean, msg: string, doctor: Doctor }) => {
        return resp.doctor;
      })
    );
  }

  deleteDoctor( id: string ) {
    // http://localhost:3000/api/doctors/5fa900b6c8a7960b535f4172

    return this.http.delete(`${base_url}/doctors/${id}`, this.headers)
    .pipe(
      map((resp: { ok: boolean, msg: string, doctor: Doctor }) => {
        return resp.doctor;
      })
    );
  }
}
