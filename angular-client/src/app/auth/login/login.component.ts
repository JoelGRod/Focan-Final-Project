import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// External
import Swal from 'sweetalert2';
// Services
import { UserService } from 'src/app/services/user.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  constructor(private router: Router, 
              private fb: FormBuilder, 
              private userService: UserService,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }
  
  // Normal Auth
  login() {
    
    this.userService.login(this.loginForm.value)
    .subscribe(resp => {
      if (this.loginForm.get('remember').value) {
        localStorage.setItem('email', this.loginForm.get('email').value);
      } else {
        localStorage.removeItem('email');
      };

      // Redirect to dashboard
      this.router.navigateByUrl('/');

      }, error => {
        Swal.fire('Error', error.error.msg, 'error');
      });
  }
  // End Normal Auth

  // Google Auth
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

  async startApp() {
    
    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;
    
    this.attachSignin(document.getElementById('my-signin2'));
    
  };

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        // Google token
        const id_token = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogle(id_token)
          .subscribe( resp => {
            // Redirect to dashboard
            this.ngZone.run(() => {
              this.router.navigateByUrl('/');
            })
          });
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
  // End Google Auth

}