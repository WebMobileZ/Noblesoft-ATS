import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/app.reducers';
import { State } from '../auth/store/auth.reducers';

@Injectable({
  providedIn: 'root'
})
export class DashboardGaurdGuard implements CanActivate, CanActivateChild{

  constructor(private route: Router, private store: Store<AuthState>){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //
    //console.log("Inside gaurd"+token);

    let token = localStorage.getItem('token');
     if(token == null){
    //   console.log("Inside gaurd"+token);
      this.route.navigate(['/login']);
    //   return false;
    }
    return this.store.select('authState').pipe(
      map((a: State) => {
        console.log(a.authonticated)
        return a.authonticated
      })
    );

    // return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.canActivate(next, state);
  }
}
