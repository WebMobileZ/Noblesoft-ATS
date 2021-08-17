import { Component, OnInit } from '@angular/core';
import { DashboarService } from '../dashboar.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/store/app.reducers';
import { HttpClient } from '@angular/common/http';
import { Consultant } from 'src/app/customer';


@Component({
  selector: 'app-dashboard-benchsales',
  templateUrl: './dashboard-benchsales.component.html',

})
export class DashboardBenchsalesComponent implements OnInit {
  applicants: Consultant[];
  dateDropDown: any[];
  loading: boolean;
  role: string;
  selectManager: any;
  selectBenchSales: any;
  selectBenchTalent: any;
  activeBenchSales: any[] = [];
  constructor(private authService: DashboarService,
    private router: Router,
    private store: Store<AuthState>,
    private http: HttpClient
  ) {

    this.dateDropDown = [
      { name: 'Today', code: '1' },
      { name: 'Yesterday', code: '2' },
      { name: 'Last Week', code: '3' },
      { name: 'Last Month', code: '4' },

    ];

  }

  ngOnInit(): void {
    //reactive form object
    this.role = localStorage.getItem('roles');
    if (this.role == 'admin') {
    }
    this.loading = true;
    this.authService.activeBenchSales('', '').subscribe(
      response => {
this.loading = false;
        this.activeBenchSales = response.data;
      }, err => {

      });
  }
  onStatusChangeBenchSales($event) {
    this.authService.activeBenchSales($event.value.code, this.selectBenchSales).subscribe(
      response => {

        this.activeBenchSales = response.data;
      }, err => {

      });

  }

}
