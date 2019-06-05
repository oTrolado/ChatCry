import { Injectable } from '@angular/core';
import { CanActivate, 
          ActivatedRouteSnapshot, 
          RouterStateSnapshot, 
          Router  } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router:Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):boolean {

    if(localStorage.getItem('chatCryProfile')) {
      let user = JSON.parse(localStorage.getItem('chatCryProfile'));
      
      if(user.auth) return true; 
    }
    this.router.navigate(['']);
    return false;

  }
}
