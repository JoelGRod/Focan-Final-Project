import { Component, OnDestroy, OnInit } from '@angular/core';
// rxjs
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
// External
import Swal from 'sweetalert2';
// Services
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
// Models
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  // MODAL IMAGE
  public imgUps: Subscription;

  constructor(private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private searchsService: SearchsService) { }

  ngOnInit(): void {
    this.loadHospitals();
    // MODAL IMAGE - General for all maintenances.
    this.imgUps = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe(fileName => this.loadHospitals());
  }

  // MODAL IMAGE
  ngOnDestroy(): void {
    this.imgUps.unsubscribe();
  }

  loadHospitals() {
    this.loading = true;

    this.hospitalService.getHospitals()
      .subscribe(hospitals => {
        this.loading = false;
        this.hospitals = hospitals;
      });
  }

  async createHospital() {
    const { value: hospitalName = '' } = await Swal.fire<string>({
      title: 'Create Hospital',
      input: 'text',
      inputLabel: 'Hospital Name',
      inputPlaceholder: 'Define Hospital Name',
      showCancelButton: true
    })

    if (hospitalName.trim().length > 0) {
      this.hospitalService.createHospital(hospitalName).subscribe(hospital => {
        this.hospitals.push(hospital);
      });
    }
  }

  modifyHospital(hospital) {
    const { id, name } = hospital;
    this.hospitalService.modifyHospital(id, name).subscribe(hospital => {
      Swal.fire('Hospital Updated', hospital.name, 'success');
    });
  }

  deleteHospital(hospital: Hospital) {
    const { id } = hospital;

    Swal.fire({
      title: 'Delete Hospital',
      text: `You are about to delete the hospital: ${hospital.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.deleteHospital(id)
          .subscribe(hospital => {
            Swal.fire(
              'Deleted!',
              `The hospital: ${hospital.name}, has been deleted.`,
              'success'
            );

            this.loadHospitals();
          });
      }
    })
  }

  // MODAL IMAGE - General for all maintenances. Only change type ('users' 'doctors' 'hospitals') and parameter and go on
  openModal(hospital: Hospital) {
    this.modalImageService.openModal('hospitals', hospital.id, hospital.img);
  }

  search(search: string) {
    if (search.length === 0) return this.loadHospitals();

    this.searchsService.searchByCollection('hospital', search)
      .subscribe((results: Hospital[]) => {
        this.hospitals = results;
      });
  }



}
