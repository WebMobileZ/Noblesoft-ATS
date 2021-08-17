
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../../../auth/store/auth.reducers';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/app.reducers';
import { Customer, Representative, Consultant, Company,Contact, User } from "../../../customer";
import { CustomerService } from "../../../customer.service";
import { Table } from 'primeng/table';
import { ConsultantDetail } from '../../../product';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';

import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {

  title = 'Webmobilez';
  isAuthnoticated: Observable<State>;
  companiesForm: FormGroup;
  contacts: Contact[];
  companieslist : Company[];
  contact : Contact;
  statuses: any[];
  loading: boolean = true;
  submitted: boolean;
  companyDialog: boolean;
  msgs: Message[] = [];
  position: string;
  successResult: any;
  serverErrors: any;
  companyButton: string;
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private store: Store<AuthState>, private consultantService: CustomerService) {

  }

  get vendor_company_id() { return this.companiesForm.get('vendor_company_id'); }
  get contactEmail() { return this.companiesForm.get('contactEmail'); }
  get contactMobile() { return this.companiesForm.get('contactMobile'); }
  get contactName() { return this.companiesForm.get('contactName'); }

  ngOnInit(): void {

    this.isAuthnoticated = this.store.select('authState');

    this.companiesForm = new FormGroup({
      'vendor_company_id': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'contactEmail': new FormControl(null, [Validators.required, Validators.email]),
      'contactMobile': new FormControl(null, [Validators.required]),
      'contactName': new FormControl(null, [Validators.required]),
    })
    this.consultantService.getContacts().then(contacts => {
      this.contacts = contacts;
      this.loading = false;

    });

   this.consultantService.getCompanies().then(companieslist => {
      //this.technologies.push({ technology_id:0,name:'Choose Technology',created_at:'' });
      this.companieslist = companieslist;

    });
  }




  clear(table: Table) {
    table.clear();
  }

  //create Consultant
  openNew() {
    this.companyButton = "Add Company Contact";
    this.companiesForm.reset();
    this.contact = {};
    this.submitted = false;
    this.companyDialog = true;
  }
  updateConsultantDetails() {

    if (this.companiesForm.valid) {
      this.submitted = true;
    } else {
      this.submitted = false;
    }

    if (this.contact.vendor_company_contact_id ) {
      this.consultantService.updateContact(this.companiesForm, this.contact.vendor_company_contact_id ).subscribe(data => {
        this.successResult = data;
        this.contacts[this.findIndexById( data.contact.vendor_company_contact_id )] = data.contact;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Contact Updated', life: 3000 });
      }, err => {
        this.serverErrors = err.error;
      });
      // this.consultants[this.findIndexById(this.consultant.consultant_id)] = this.consultant;


    }
    else {


      this.consultantService.storeContact(this.companiesForm).subscribe(data => {
        this.companiesForm.reset();
        this.successResult = data;
        this.contacts.unshift(data.contact);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Contact Created', life: 3000 });
        //  this.consultantForm.reset();

      }, err => {
        this.serverErrors = err.error;
      });
      // this.consultant.consultant_id = this.createId();


    }

    this.contacts = [...this.contacts];
    this.companyDialog = false;
    this.contact = {};

  }
  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].vendor_company_contact_id  === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  hideDialog() {
   
    this.companyDialog = false;
    this.submitted = false;
  }
  editProduct(comapnyObj: Contact) {
    this.companyButton = "Update Vendor Contact";
    this.companiesForm.patchValue({ ...comapnyObj });

    this.contact = { ...comapnyObj };

     this.companyDialog = true;
  }
  deleteProduct(consultantObj: Contact) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + consultantObj.contactName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contacts = this.contacts.filter(val => val.vendor_company_contact_id  !== consultantObj.vendor_company_contact_id );
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
