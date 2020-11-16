import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Guards
import { AuthGuard } from '../guards/auth.guard';

// Components Dashboard
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    // LAZY LOAD
    canLoad: [ AuthGuard ],
    loadChildren: () => import('./child-routes.module').then( module => module.ChildRoutesModule)
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
