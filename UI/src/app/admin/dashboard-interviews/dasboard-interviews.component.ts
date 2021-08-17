import { Component, OnInit } from '@angular/core';
import { DashboarService } from '../dashboar.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/store/app.reducers';
import { HttpClient } from '@angular/common/http';
import { Consultant } from 'src/app/customer';


@Component({
  selector: 'app-dashboard-interview',
  templateUrl: './dashboard-interviews.component.html',

})
export class DashboardInterviewsComponent implements OnInit {
  applicants: Consultant[];
  interviewDropDown: any[];
  loading: boolean;
  role: string;
  selectBenchSales: any;
  selectBenchTalent: any;
  activeBenchSales: any[] = [];
  constructor(private authService: DashboarService,
    private router: Router,
    private store: Store<AuthState>,
    private http: HttpClient
  ) {

    this.interviewDropDown = [
      { name: 'Today', code: '1' },
      { name: 'Yesterday', code: '5' },
      { name: 'Tomorrow', code: '2' },
      { name: 'Next Week', code: '3' },
      { name: 'Last Week', code: '4' },
      { name: 'Last Month', code: '6' },

    ];


  }

  ngOnInit(): void {
    //reactive form object
    this.role = localStorage.getItem('roles');
    if (this.role == 'admin') {
    }
    this.loading = true;
    this.authService.getInterviewreports('').subscribe(
      response => {
        this.loading = false;
        this.applicants = response.aplicants;
      }, err => {

      });


  }
  onStatusChangeBenchSales($event) {
    this.loading = true;
    this.authService.getInterviewreports($event.value.code).subscribe(
      response => {
        this.loading = false;
        this.applicants = response.aplicants;
      }, err => {

      });

  }
}
