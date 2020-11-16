import { Component, OnDestroy, OnInit } from '@angular/core';
// rxjs
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
// External
import Swal from 'sweetalert2';
// Services
import { UserService } from 'src/app/services/user.service';
import { SearchsService } from 'src/app/services/searchs.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
// Models
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public from: number = 0;
  // Delay in userService - getUsers()
  public loading: boolean = true;
  // MODAL IMAGE
  public imgUps: Subscription;

  constructor(private userService: UserService,
              private searchsService: SearchsService,
              private modalImageService: ModalImageService) { }

  ngOnInit(): void {
    this.loadUsers();
    // MODAL IMAGE - General for all maintenances.
    this.imgUps = this.modalImageService.newImage
      .pipe( delay(100) )
      .subscribe( fileName => this.loadUsers() );
  }

  // MODAL IMAGE
  ngOnDestroy(): void {
    this.imgUps.unsubscribe();
  }

  loadUsers() {
    this.loading = true;

    this.userService.getUsers(this.from)
      .subscribe(({ total_regs, users }) => {
        this.totalUsers = total_regs;
        this.users = users;
        this.usersTemp = users;
        this.loading = false;
      });
  }

  changePage(value: number) {
    this.from += value;

    if (this.from < 0) this.from = 0;
    else if (this.from >= this.totalUsers) this.from -= value;

    this.loadUsers();
  }

  search(search: string) {
    if (search.length === 0) return this.users = this.usersTemp;

    this.searchsService.searchByCollection('user', search)
      .subscribe((results: User[]) => {
        this.users = results;
      });
  }

  deleteUser(user: User) {
    if( user.uid === this.userService.uid ) return Swal.fire('Error', 'You Cant delete yourself', 'error');

    Swal.fire({
      title: 'Delete User',
      text: `You are about to delete the user: ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.uid)
          .subscribe(resp => {
            Swal.fire(
              'Deleted!',
              `The user: ${user.name}, has been deleted.`,
              'success'
            );

            this.loadUsers();
          });
      }
    })
  }

  changeRole( user: User ) {
    this.userService.saveUser(user).subscribe();
  }

  // MODAL IMAGE - General for all maintenances. Only change type ('users' 'doctors' 'hospitals') and parameter and go on
  openModal(user: User) {
    this.modalImageService.openModal('users', user.uid, user.img);
  }

}
