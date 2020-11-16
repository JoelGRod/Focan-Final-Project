import { Component, OnDestroy, OnInit } from '@angular/core';
// External
import Swal from 'sweetalert2';
// rxjs
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
// Services
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
// Models
import { Doctor } from 'src/app/models/doctor.model';


@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public loading: boolean = true;
  public doctors: Doctor[] = [];
  // MODAL IMAGE
  public imgUps: Subscription;

  constructor(private doctorService: DoctorService,
    private modalImageService: ModalImageService,
    private searchsService: SearchsService) { }

  ngOnInit(): void {
    this.loadDoctors();
    // MODAL IMAGE - General for all maintenances. Listener
    this.imgUps = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe(fileName => this.loadDoctors());
  }

  // MODAL IMAGE
  ngOnDestroy(): void {
    this.imgUps.unsubscribe();
  }

  loadDoctors() {
    this.loading = true;

    this.doctorService.getDoctors().subscribe(doctors => {
      this.loading = false;
      this.doctors = doctors;
    });
  }

  deleteDoctor(doctor: Doctor) {
    const { id } = doctor;

    Swal.fire({
      title: 'Delete Doctor',
      text: `You are about to delete the doctor: ${doctor.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(id)
          .subscribe(doctor => {
            Swal.fire(
              'Deleted!',
              `The doctor: ${doctor.name}, has been deleted.`,
              'success'
            );

            this.loadDoctors();
          });
      }
    })
  }

  // MODAL IMAGE - General for all maintenances. Only change type ('users' 'doctors' 'hospitals') and parameter and go on
  openModal(doctor: Doctor) {
    this.modalImageService.openModal('doctors', doctor.id, doctor.img);
  }

  search(search: string) {
    if (search.length === 0) return this.loadDoctors();

    this.searchsService.searchByCollection('doctor', search)
      .subscribe((results: Doctor[]) => {
        this.doctors = results;
      });
  }

}
