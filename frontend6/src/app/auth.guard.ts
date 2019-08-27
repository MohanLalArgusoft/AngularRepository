import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable, from } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _route: Router, private _userService: UserService) { }

  canActivate():boolean{
    if(this._userService.loggedIn()){
      return true
    }else{
      this._route.navigate(['/login']);
      return false
    }
  }
}
