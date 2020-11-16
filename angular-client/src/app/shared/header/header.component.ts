import { Component} from '@angular/core';
import { Router } from '@angular/router';
// Services
import { UserService } from 'src/app/services/user.service';
// Model
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public user: User;

  constructor( private userService: UserService,
                private router: Router ) { 
    this.user = userService.user;
  }

  logout() {
    this.userService.logout();
  }

  globalSearch(search: string) {
    if(search.length === 0) return;
    else if(search.trim().length === 0) return;
    this.router.navigateByUrl(`/dashboard/search/${search.trim()}`);
  }

}
