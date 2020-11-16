import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AdminGuard } from '../guards/admin.guard';
// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PromisesComponent } from './promises/promises.component';
import { ObservablesComponent } from './observables/observables.component';
import { ProfileComponent } from './profile/profile.component';
// Components Maintenance
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';
// Global searches component
import { GlobalSearchsComponent } from './global-searchs/global-searchs.component';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'progress', component: ProgressComponent, data: { title: 'Progress Bar' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
  { path: 'grafica1', component: Grafica1Component, data: { title: 'Graphics' } },
  { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
  { path: 'observables', component: ObservablesComponent, data: { title: 'Observables' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },

  // Maintenance
  { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals' } },
  { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors' } },
  { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Doctor Maintenance' } },
  // Maintenance Admin Routes
  { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data: { title: 'Users' } },

  // Global Search
  { path: 'search/:search', component: GlobalSearchsComponent, data: { title: 'Global Searches' } },
];


@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
