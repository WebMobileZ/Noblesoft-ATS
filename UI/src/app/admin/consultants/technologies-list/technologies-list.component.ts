
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../../../auth/store/auth.reducers';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/app.reducers';
import { Customer, Representative, Consultant, Technology, User } from "../../../customer";
import { CustomerService } from "../../../customer.service";
import { Table } from 'primeng/table';
import { ConsultantDetail } from '../../../product';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';

import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-technologies-list',
  templateUrl: './technologies-list.component.html',
  styleUrls: ['./technologies-list.component.scss']
})
export class TechnologiesListComponent implements OnInit {

  title = 'Webmobilez';
  isAuthnoticated: Observable<State>;
  technologiesForm: FormGroup;
  technologies: Technology[];
  technology : Technology;
  statuses: any[];
  loading: boolean = true;
  submitted: boolean;
  technologyDialog: boolean;
  msgs: Message[] = [];
  position: string;
  successResult: any;
  serverErrors: any;
  technologyButton:string;
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private store: Store<AuthState>, private consultantService: CustomerService) {

  }

  get name() { return this.technologiesForm.get('name'); }


  ngOnInit(): void {

    this.isAuthnoticated = this.store.select('authState');

    this.technologiesForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
    })
    this.consultantService.getTechnologies().then(technologies => {
      this.technologies = technologies;
      this.loading = false;

    });


  }




  clear(table: Table) {
    table.clear();
  }

  //create Consultant
  openNew() {
    this.technologyButton ="Add Technology";
    this.technologiesForm.reset();
    this.technology = {};
    this.submitted = false;
    this.technologyDialog = true;
  }
  updateConsultantDetails() {

    if (this.technologiesForm.valid) {
      this.submitted = true;
    } else {
      this.submitted = false;
    }

    if (this.technology.technology_id) {
      this.consultantService.updateTechnology(this.technologiesForm, this.technology.technology_id).subscribe(data => {
        this.successResult = data;
        this.technologies[this.findIndexById( data.technology.technology_id)] = data.technology;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Technology Updated', life: 3000 });
      }, err => {
        this.messageService.add({severity:'error', summary: 'Error', detail: err.name[0],life: 3000 });
      });
      // this.consultants[this.findIndexById(this.consultant.consultant_id)] = this.consultant;


    }
    else {


      this.consultantService.storeTechnology(this.technologiesForm).subscribe(data => {
        this.technologiesForm.reset();
        this.successResult = data;
        this.technologies.unshift(data.technology);

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Technology Created', life: 3000 });
        //  this.consultantForm.reset();

      }, err => {
       // console.log(err.error.errors)
        this.serverErrors = err;
        this.messageService.add({severity:'error', summary: 'Error', detail: err.name[0],life: 3000 });

      });
      // this.consultant.consultant_id = this.createId();


    }

    this.technologies = [...this.technologies];
    this.technologyDialog = false;
    this.technology = {};

  }
  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.technologies.length; i++) {
      if (this.technologies[i].technology_id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  hideDialog() {

    this.technologyDialog = false;
    this.submitted = false;
  }
  editProduct(consultantObj: Technology) {
    this.technologyButton ="Update Technology";
    this.technologiesForm.patchValue({ ...consultantObj });

    this.technology = { ...consultantObj };
 
     this.technologyDialog = true;
  }
  deleteProduct(consultantObj: Technology) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + consultantObj.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.technologies = this.technologies.filter(val => val.technology_id !== consultantObj.technology_id);
        //this.consultant = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Consultant Deleted', life: 3000 });
      }
    });
  }



  confirmPosition(position: string) {
    this.position = position;

    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Successful Approved', detail: 'Consultant Approved to HotList', life: 3000 });
        //  this.msgs = [{severity:'info', summary:'Confirmed', detail:'Holtlisted'}];
      },
      reject: () => {
        //this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      },
      key: "positionDialog"
    });
  }
}
