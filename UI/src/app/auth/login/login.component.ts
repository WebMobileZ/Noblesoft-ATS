import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';
import { AuthState } from 'src/app/store/app.reducers';
import { UserProfileService } from 'src/app/services/user-profile-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  serverErrors: null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AuthState>,
    private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  loginFormData() {

    this.authService.getLogin(this.loginForm).subscribe(
      (response) => {

        localStorage.clear();

        this.router.navigate(['/dashboard']);

        this.userProfileService.setUserProfile(response.user);
        localStorage.setItem('dialogbanner','yes');
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user_id', response.user.id);
        localStorage.setItem('roles', response.role);
        localStorage.setItem('user', JSON.stringify(response));
        this.store.dispatch(new AuthActions.SignIn());
        this.store.dispatch(new AuthActions.SetToken(response.access_token));
        //set bearer token
        this.store.dispatch(new AuthActions.SignupSuccess(response));
      }, (err) => {

       this.serverErrors = err;
      });
    //console.log(this.registerForm.value);
  }
}
