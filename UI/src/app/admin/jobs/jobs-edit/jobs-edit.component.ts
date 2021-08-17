
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { State } from '../../../auth/store/auth.reducers';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/app.reducers';
import { Customer, Representative, Consultant, Technology, User, Job, Client } from "../../../customer";
import { CustomerService } from "../../../customer.service";
import { Table } from 'primeng/table';
import { ConsultantDetail } from '../../../product';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Message } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
@Component({
  selector: 'app-jobs-edit',
  templateUrl: './jobs-edit.component.html',
  styleUrls: ['./jobs-edit.component.scss']
})

export class JobsEditComponent implements OnInit {

  title = 'Webmobilez';
  isAuthnoticated: Observable<State>;
  jobs: Job[];
  job: Job;
  applicants: Consultant[];
  events: any[];
  products: Consultant[];
  items: MenuItem[];

  constructor(private route: ActivatedRoute, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, private store: Store<AuthState>, private consultantService: CustomerService) {

  }

  ngOnInit(): void {

    this.isAuthnoticated = this.store.select('authState');
    let id = this.route.snapshot.params.id;
    this.consultantService.editJob(id).subscribe(
      (response) => {
        this.job = response.job;
        this.applicants = response.job.benchtalents;
      
      },
      (error) => console.log(error)
    );
    this.events = [
      { status: 'Pipeline', date: '15/10/2020 14:00', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg' },
      { status: 'Submission', date: '15/10/2020 10:30', icon: PrimeIcons.COG, color: '#673AB7' },
      { status: 'Client Submission', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800' },
      { status: 'Interviewed', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B' },
      { status: 'Confirmation', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B' },
      { status: 'Placement', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B' },

    ];
  }



}
