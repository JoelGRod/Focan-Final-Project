import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Services
import { SearchsService } from 'src/app/services/searchs.service';
// Models
import { User } from 'src/app/models/user.model';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-global-searchs',
  templateUrl: './global-searchs.component.html',
  styles: [
  ]
})
export class GlobalSearchsComponent implements OnInit {

  public users: User[] = [];
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];

  constructor( private activatedRoute: ActivatedRoute,
                private searchsService: SearchsService,
                private router: Router ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({ search }) => this.searchGlobal(search) );
  }

  searchGlobal( search: string ) {
    this.searchsService.searchGlobal(search)
        .subscribe( (resp: any) => {
          this.users = resp.users;
          this.doctors = resp.doctors;
          this.hospitals = resp.hospitals;
        });
  }

  openDoctor(doctor: Doctor) {
    this.router.navigateByUrl(`/dashboard/doctor/${doctor.id}`);
  }

}
