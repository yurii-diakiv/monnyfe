import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { LoginModel } from 'src/app/models/loginModel';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private helper: JwtHelperService) { }

  currentUserId() {
    if (!this.helper.isTokenExpired()) {
      var information = this.helper.decodeToken();
      return Number(information.sub);
    }
  }

  get(userId: number) {
    return this.http.get<User>("https://monnybe.herokuapp.com/users/" + userId);
  }

  add(user: User) {
    return this.http.post<User>("https://monnybe.herokuapp.com/users", user);
  }

  login(loginModel: LoginModel) {
    let credentials = JSON.stringify(loginModel);

    return this.http.post("https://monnybe.herokuapp.com/users/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }
}
