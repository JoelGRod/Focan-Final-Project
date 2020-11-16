import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// rxjs
import { delay } from 'rxjs/operators';
// External
import Swal from 'sweetalert2';
// Services
import { HospitalService } from 'src/app/services/hospital.service';
import { DoctorService } from 'src/app/services/doctor.service';
// Models
import { Hospital } from 'src/app/models/hospital.model';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];
  public hospitalSelected: Hospital;
  public doctorSelected: Doctor;

  constructor( private fb: FormBuilder,
                private hospitalService: HospitalService,
                private doctorService: DoctorService,
                private router: Router,
                private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({ id }) => this.loadDoctor(id) );

    this.doctorForm = this.fb.group({
      name: ['', Validators.required ],
      hospital: ['', Validators.required],
    });

    this.loadHospitals();

    // Local Listener (image)
    this.doctorForm.get('hospital').valueChanges
      .subscribe( hospitalId => {
        this.hospitalSelected = this.hospitals.find( hosp => hosp.id === hospitalId );
      });
  }

  loadHospitals() {
    this.hospitalService.getHospitals()
      .subscribe( (hospitals: Hospital[]) => {
        this.hospitals = hospitals;
      });
  }

  saveDoctor() {

    if(this.doctorSelected) {
      // Update
      const data = {
        ...this.doctorForm.value,
        id: this.doctorSelected.id
      };
      this.doctorService.modifyDoctor(data)
        .subscribe( doctor => {
          Swal.fire('Doctor Modified', `Doctor: ${doctor.name}`, 'success');
        });
    } else {
      // Create
      this.doctorService.createDoctor(this.doctorForm.value)
        .subscribe( doctor => {
          Swal.fire('Doctor Created', `Doctor: ${doctor.name}`, 'success');
          this.router.navigateByUrl(`/dashboard/doctor/${doctor.id}`);
        });
    }
  }

  // Modify doctor
  loadDoctor(id: string) {

    if( id === 'new' ) return;

    this.doctorService.getDoctor(id)
      .pipe(
        delay(100)
      )
      .subscribe( doctor => {
        if(!doctor) this.router.navigateByUrl(`/dashboard/doctors`);
        const { name, hospital: { _id } } = doctor;
        this.doctorSelected = doctor;
        this.doctorForm.setValue({ name: name, hospital: _id });
      });
  }

}
