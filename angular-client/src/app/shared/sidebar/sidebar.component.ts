import { Component } from '@angular/core';
// Services
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';
// Model
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public user: User;

  constructor(public sidebarService: SidebarService, 
              private userService: UserService) { 
    this.user = userService.user;
  }

  logout() {
    this.userService.logout();
  }

}
