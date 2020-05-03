import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
  providers: [UserService]
})
export class SignUpPageComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);

  constructor(
    private router:Router,
    private userService: UserService
    ) { }

  ngOnInit(): void {
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('minlength') ? 'Password must contains at least 6 characters' : '';
  }

  signUp() {
    if (this.email.valid && this.name.valid && this.password.valid && this.surname.valid) {

      let user: User = new User();
      user.email = this.email.value;
      user.name = this.name.value;
      user.surname = this.surname.value;
      user.password = this.password.value;

      this.userService.add(user).subscribe(
        responce => console.log(responce),
        err => console.log(err)
      );

      this.router.navigate(["/"]);      
    }
  }
}
