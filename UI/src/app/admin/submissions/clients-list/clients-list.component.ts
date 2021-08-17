
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../../../auth/store/auth.reducers';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/app.reducers';
import { Customer, Representative, Consultant, Client, User } from "../../../customer";
import { CustomerService } from "../../../customer.service";
import { Table } from 'primeng/table';
import { ConsultantDetail } from '../../../product';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';

import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  title = 'Webmobilez';
  isAuthnoticated: Observable<State>;
  clientsForm: FormGroup;
  clients: Client[];
  client : Client;
  statuses: any[];
  loading: boolean = true;
  submitted: boolean;
  technologyDialog: boolean;
  msgs: Message[] = [];
  position: string;
  successResult: any;
  serverErrors: any;
  created_Client:string;
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private store: Store<AuthState>, private consultantService: CustomerService) {

  }

  get name() { return this.clientsForm.get('name'); }


  ngOnInit(): void {

    this.isAuthnoticated = this.store.select('authState');

    this.clientsForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
    })
    this.consultantService.getClients().then(clients => {
      this.clients = clients;
      this.loading = false;

    });


  }




  clear(table: Table) {
    table.clear();
  }

  //create Consultant
  openNew() {
    this.created_Client ="Add Client";
    this.clientsForm.reset();
    this.client = {};
    this.submitted = false;
    this.technologyDialog = true;
  }
  updateConsultantDetails() {

    if (this.clientsForm.valid) {
      this.submitted = true;
    } else {
      this.submitted = false;
    }

    if (this.client.client_id) {
      this.consultantService.updateClient(this.clientsForm, this.client.client_id).subscribe(data => {
        this.successResult = data;
        this.clients[this.findIndexById( data.client.client_id)] = data.client;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Updated', life: 3000 });
      }, err => {
        this.serverErrors = err.error;
      });
      // this.consultants[this.findIndexById(this.consultant.consultant_id)] = this.consultant;


    }
    else {


      this.consultantService.storeClient(this.clientsForm).subscribe(data => {
        this.clientsForm.reset();
        this.successResult = data;
        this.clients.unshift(data.client);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Created', life: 3000 });
        //  this.consultantForm.reset();

      }, err => {
        this.serverErrors = err.error;
      });
      // this.consultant.consultant_id = this.createId();


    }

    this.clients = [...this.clients];
    this.technologyDialog = false;
    this.client = {};

  }
  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i].client_id === id) {
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
  editProduct(consultantObj: Client) {
    this.created_Client ="Update Client";
    this.clientsForm.patchValue({ ...consultantObj });

    this.client = { ...consultantObj };
  
     this.technologyDialog = true;
  }
  deleteProduct(consultantObj: Client) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + consultantObj.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clients = this.clients.filter(val => val.client_id !== consultantObj.client_id);
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
