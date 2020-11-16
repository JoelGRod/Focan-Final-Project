import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// rxjs - observables
import { Observable, of } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';
// Environment
import { environment } from 'src/environments/environment';
// Interfaces
import { RegisterForm } from '../interfaces/register-form.interface';
import { ProfileForm } from '../interfaces/profile-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { LoadUsers } from '../interfaces/load-users.interface';
// Models
import { User } from '../models/user.model';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  // User info
  public user: User;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {

    this.googleInit();

  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.user.role;
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers(): Object {
    return { headers: { 'x-token': this.token } };
  }

  saveLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  validateToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    })
      .pipe(
        map((resp: any) => {
          const { email, google, img = '', name, role, uid } = resp.user;
          this.user = new User(name, email, '', img, google, role, uid);

          this.saveLocalStorage(resp.token, resp.menu);

          return true;
        }),
        catchError(error => of(false))
      );
  }

  // Normal login
  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          this.saveLocalStorage(resp.token, resp.menu);
        })
      );
  }

  // Login Google
  googleInit() {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '849414014023-470u2f2ojc4qudgckfa4r30lnntnea9l.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  loginGoogle(google_token: string) {
    return this.http.post(`${base_url}/login/google`, { 'google_token': google_token })
      .pipe(
        tap((resp: any) => {
          this.saveLocalStorage(resp.token, resp.menu);
        })
      );
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  // Users actions
  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap((resp: any) => {
          // This works (menu) because you do a renew. Innecessary
          this.saveLocalStorage(resp.token, resp.menu);
        })
      );
  }

  // Changes from profile
  modifyUser(formData: ProfileForm) {
    formData = {
      ...formData,
      role: this.user.role,
      google: this.user.google
    };
    return this.http.put(`${base_url}/users/${this.uid}`,
      formData,
      this.headers
    );
  }

  // Changes from maintenance
  saveUser(user: User) {
    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);
  }

  getUsers(from: number = 0) {
    return this.http.get<LoadUsers>(`${base_url}/users?from=${from}`, this.headers)
      .pipe(
        delay(1000),
        map(resp => {
          const users = resp.users.map(
            user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid)
          )
          return {
            total_regs: resp.total_regs,
            users: users
          };
        })
      );
  }

  deleteUser(uid: string = '') {
    return this.http.delete(`${base_url}/users/${uid}`, this.headers);
  }

}
