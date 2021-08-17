import { Component, OnInit } from '@angular/core';
import { DashboarService } from '../dashboar.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/store/app.reducers';
import { HttpClient } from '@angular/common/http';
import { Consultant } from 'src/app/customer';


@Component({
  selector: 'app-dashboard-headhunters',
  templateUrl: './dashboard-headhunters.component.html',

})
export class DashboardHeadHuntersComponent implements OnInit {
  applicants: Consultant[];
  dateDropDown: any[];
  loading: boolean;
  role: string;
  selectManager: any;
  selectBenchSales: any;
  selectBenchTalent: any;
  activeBenchTalents: any[] = [];
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
    this.authService.activeBenchTalents('', '').subscribe(
      response => {
        this.loading = false;
        this.activeBenchTalents = response.data;

      }, err => {

      });
  }
  onStatusChangeBenchTalent($event) {
    this.loading =true;
    this.authService.activeBenchTalents($event.value.code, this.selectManager).subscribe(
      response => {
        this.loading =false;
        this.activeBenchTalents = response.data;
      }, err => {

      });

  }

}
