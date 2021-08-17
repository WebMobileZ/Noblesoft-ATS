import { Component, OnInit } from '@angular/core';
import { DashboarService } from '../dashboar.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/store/app.reducers';
import { HttpClient } from '@angular/common/http';
import { Consultant } from 'src/app/customer';


@Component({
  selector: 'app-dashboard-placed-candidates',
  templateUrl: './dashboard-placed-candidates.component.html',

})
export class DashboardPlacedCandidatesComponent implements OnInit {
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
    this.authService.getPlacedCandidates().subscribe(
      response => {
        this.loading = false;
        this.activeBenchSales = response.data;
      }, err => {

      });
  }


}
