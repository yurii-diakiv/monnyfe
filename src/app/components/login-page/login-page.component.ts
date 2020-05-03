import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/loginModel';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [UserService]
})
export class LoginPageComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hide = true;

  constructor(
    private router: Router,
    private userSerivce: UserService
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

  login() {
    if (this.email.valid && this.password.valid) {

      let loginModel: LoginModel = new LoginModel();
      loginModel.email = this.email.value;
      loginModel.password = this.password.value;

      this.userSerivce.login(loginModel).subscribe(response => {

        let token = (<any>response).token;
        localStorage.setItem("jwt", token);
        
        this.router.navigate(["/"]);
      }, err => {
        console.log(err);
      });
    }
  }
}
