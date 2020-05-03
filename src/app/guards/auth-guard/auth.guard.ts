import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  helper = new JwtHelperService();

  constructor(private router: Router) {
  }

  canActivate(){
    var token = localStorage.getItem("jwt");
    
    if (token && !this.helper.isTokenExpired(token)){
      return true;
    }

    this.router.navigate(["login-page"]);
    return false;
  }
  
}
