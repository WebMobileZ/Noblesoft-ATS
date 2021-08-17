import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,Router, NavigationStart, Event, NavigationEnd } from '@angular/router';
import { FormGroup, FormControlName,Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { VendorService } from '../../services/vendor.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'performance-cmp',

    templateUrl: 'performance.component.html'
})

export class PerformanceComponent implements OnInit{
  serverErrors = [];
  updateUser: FormGroup;
  timeout;
  routerChanged = false;
  success:boolean= false;
  performance: number = 0;
  isbench:boolean =false;
  user: Observable<any>;
  employees:any[]=[];
  constructor(private userService: VendorService,private http: HttpClient,private route: ActivatedRoute,  private router: Router)
  {
    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {
        // Show loading indicator
        this.routerChanged = false;
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.timeout = setTimeout(() => {
          clearTimeout(this.timeout);
          this.routerChanged = true;
        }, 1000);
      }
    });

  }

  async  ngOnInit() {
    this.userService.getBenchUsers().subscribe(
      (response) => {
       this.employees = response.users;
      },
      (error) => { console.log(error) }
    );
    if ( localStorage.getItem('roles') == 'admin' || localStorage.getItem('roles') == 'jr-bench-sales' || localStorage.getItem('roles') == 'bench-sales'|| localStorage.getItem('roles') == 'sales-lead' ) {
      this.isbench = true;
    }


    this.user = this.userService.loadUser().pipe(
      tap(user => this.performance=user.performance)
    );



  }


}
