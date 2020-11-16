import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    terms: [false, [Validators.required]],
  }, {
    validators: this.equalsPasswords('password', 'password2')
  });

  constructor(private fb: FormBuilder, 
              private userService: UserService,
              private router: Router) { }

  createUser() {
    this.formSubmitted = true;

    if(this.registerForm.invalid) {
      return;
    } 
    
    // Post user
    this.userService.createUser(this.registerForm.value)
      .subscribe(resp => {
        // Redirect to dashboard
        this.router.navigateByUrl('/');
      }, (error) => {
        // If error from backend
        Swal.fire('Error', error.error.msg, 'error');
      });

  }

  // Warning text box
  fieldInvalid(field: string) {
    if (this.registerForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  // Warning box
  acceptTerms() {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  // Warning box
  passwordInvalid() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    };
  }

  // Custom validator
  equalsPasswords(pass1: string, pass2: string) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ notEquals: true });
      }
    };
  }

}
