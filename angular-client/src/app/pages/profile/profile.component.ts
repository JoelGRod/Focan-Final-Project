import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// External
import Swal from 'sweetalert2';
// Services
import { UserService } from 'src/app/services/user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
// Models
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public user: User;
  public profileForm: FormGroup;
  public photoUpload: File;
  public imgTemp: any = '';

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private fu: FileUploadService) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, [Validators.required, Validators.minLength(3)]],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateUser() {
    this.userService.modifyUser(this.profileForm.value)
      .subscribe((resp: any) => {
        const { name, email } = resp.user;
        this.user.name = name;
        this.user.email = email;
        Swal.fire('Saved', 'User updated', 'success');
      }, (error) => {
        Swal.fire('Error', error.error.msg, 'error');
      });
  }

  updatePhotoInLocal(file: File) {
    this.photoUpload = file;

    if (!file) {
      return this.imgTemp = null;
    };

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  updatePhoto() {
    this.fu.updatePhoto(this.photoUpload, 'users', this.user.uid)
      .then(fileName => {
        this.user.img = fileName;
        Swal.fire('Saved', 'User image updated', 'success');
      })
      .catch(error => {
        console.log(error);
        Swal.fire('Error', 'Error updating image', 'error');
      });
  }

}
