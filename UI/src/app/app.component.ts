import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from './auth/store/auth.reducers';
import { Store } from '@ngrx/store';
import { AuthState } from './store/app.reducers';

import { DashboarService } from './admin/dashboar.service';
import * as AuthActions from './auth/store/auth.actions';
import { Router } from '@angular/router';
import { VendorSubmissions, SubmissionList, ConsultantsList, RecruitmentList, UsersList, DocumentsList } from './core/models/permissions';
import { UserProfileService } from './services/user-profile-service';
import { AuthService } from './auth/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})

export class AppComponent implements OnInit {

  user: any;
  title = 'Webmobilez';
  isAuthnoticated: Observable<State>;
  private name: string;
  color: any = "admincolor";

  get VendorSubmissionsPermissions() {
    return VendorSubmissions;
  }
  get ConsultantsPermissions() {
    return ConsultantsList;
  }
  get RecruitmentPermissions() {
    return RecruitmentList;
  }
  get DocumentsPermissions() {
    return DocumentsList;
  }
  get SubmissionPermissions() {
    return SubmissionList;
  }
  get Userspermissions() {
    return UsersList;
  }
  get getUserName() {
    return this.authProfileService.userValue?.user?.name;
  }
  get getColorName() {

    if (this.authProfileService.userValue?.user?.role) {

      if (this.authProfileService.userValue?.user?.role == 'admin') {
        return 'admincolor';
      }
      if (this.authProfileService.userValue?.user?.role == 'adminhunters' || this.authProfileService.userValue?.user?.role == 'head-hunters') {
        return 'huntercolor';
      }
      if (this.authProfileService.userValue?.user?.role == 'recruiter') {
        return "recruitercolor";
      }
      if (this.authProfileService.userValue?.user?.role == 'accountmanager' || this.authProfileService.userValue?.user?.role == 'bdm') {
        return "mangercolor";
      }
      if (this.authProfileService.userValue?.user?.role == 'bench-sales' || this.authProfileService.userValue?.user?.role == 'jr-bench-sales' || this.authProfileService.userValue?.user?.role == 'sales-lead') {
        return 'benchsalescolor';
      }

    } else {
      return 'admincolor';
    }
  }
  constructor(private router: Router, private store: Store<AuthState>, private userProfileService: UserProfileService, private authService: DashboarService, private authProfileService: AuthService) {


  }

  ngOnInit(): void {



    this.isAuthnoticated = this.store.select('authState');

    this.name = this.userProfileService.getProfileName();
  }

  logout(): void {

    this.userProfileService.logout();
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
    this.authProfileService.logOutUser(user_id).subscribe(
      response => {
        localStorage.clear();
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/login']);
      },
      err => { console.log(err); }
    )
  }

  getstatusBtnColor() {
    return "#a11b34";
    /*  if(localStorage.getItem('roles')=='admin')
      {
        return "#a11b34 !important"
      }

      if(localStorage.getItem('roles')=='recruiter' || localStorage.getItem('roles')=='accountmanager' || localStorage.getItem('roles')=='bdm')
      {
        return "#212529 !important"
      }
      if(localStorage.getItem('roles')=='adminhunters' ||  localStorage.getItem('roles')=='head-hunters')
      {
        return "#7952b3 !important"
      }
  */
  }


}
