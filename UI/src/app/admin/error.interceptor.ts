import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DashboarService } from './../admin/dashboar.service';
import * as AuthActions from './../auth/store/auth.actions';
import { State } from './../auth/store/auth.reducers';
import { Store } from '@ngrx/store';
import { AuthState } from './../store/app.reducers';
import { UserProfileService } from './../services/user-profile-service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router,private store: Store<AuthState>, private userProfileService: UserProfileService, private authService: DashboarService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403,500].indexOf(err.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                this.userProfileService.logout();
                let user_id = localStorage.getItem('user_id');
                localStorage.clear();
                this.store.dispatch(new AuthActions.Logout());
                this.router.navigate(['/login']);
              //  this.authService.logOutUser(user_id).subscribe(
               //   response => {
                //    console.log(response);

              //    },
               //   err => { console.log(err); }
              //  )
            }

            const error = err.error.errors;
            return throwError(error);
        }))
    }
}
