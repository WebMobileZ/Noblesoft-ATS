
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../../../auth/store/auth.reducers';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/app.reducers';
import { Customer, Representative, Consultant, Company, User } from "../../../customer";
import { CustomerService } from "../../../customer.service";
import { Table } from 'primeng/table';
import { ConsultantDetail } from '../../../product';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';

import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss']
})
export class CompaniesListComponent implements OnInit {

  title = 'Webmobilez';
  isAuthnoticated: Observable<State>;
  companiesForm: FormGroup;
  companies: Company[];
  company : Company;
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

 // get name() { return this.companiesForm.get('name'); }
 get vendorCompanyName() { return this.companiesForm.get('vendorCompanyName'); }
 get contactName() { return this.companiesForm.get('contactName'); }
 get contactMobile() { return this.companiesForm.get('contactMobile'); }
 get contactEmail() { return this.companiesForm.get('contactEmail'); }
 get ext() { return this.companiesForm.get('ext'); }

  ngOnInit(): void {

    this.isAuthnoticated = this.store.select('authState');

    this.companiesForm = new FormGroup({
    //  'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
        'vendorCompanyName': new FormControl('', [Validators.required]),
        'contactName': new FormControl('', [Validators.required]),
        'contactMobile': new FormControl('', [Validators.required]),
        'contactEmail': new FormControl('', [Validators.required, Validators.email]),
        'ext': new FormControl('', [Validators.required]),

    })
    this.consultantService.getCompanies().then(companies => {
      this.companies = companies;
      this.loading = false;

    });


  }




  clear(table: Table) {
    table.clear();
  }

  //create Consultant
  openNew() {
    this.companyButton = "Add Company";
    this.companiesForm.reset();
    this.company = {};
    this.submitted = false;
    this.companyDialog = true;
  }
  updateConsultantDetails() {

    if (this.companiesForm.valid) {
      this.submitted = true;
    } else {
      this.submitted = false;
    }

    if (this.company.vendor_company_id ) {
      this.consultantService.updateCompany(this.companiesForm, this.company.vendor_company_id ).subscribe(data => {
        this.successResult = data;
        this.companies[this.findIndexById( data.company.vendor_company_id )] = data.company;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'company Updated', life: 3000 });
      }, err => {
        this.serverErrors = err.error;
      });
      // this.consultants[this.findIndexById(this.consultant.consultant_id)] = this.consultant;


    }
    else {


      this.consultantService.storeCompany(this.companiesForm).subscribe(data => {
        this.companiesForm.reset();
        this.successResult = data;
        this.companies.unshift(data.company);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company Created', life: 3000 });
        //  this.consultantForm.reset();

      }, err => {
        this.serverErrors = err.error;
      });
      // this.consultant.consultant_id = this.createId();


    }

    this.companies = [...this.companies];
    this.companyDialog = false;
    this.company = {};

  }
  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.companies.length; i++) {
      if (this.companies[i].vendor_company_id  === id) {
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
  editProduct(comapnyObj: Company) {
    this.companyButton = "Update Company";
    this.companiesForm.patchValue({ ...comapnyObj });

    this.company = { ...comapnyObj };
  
     this.companyDialog = true;
  }
  deleteProduct(consultantObj: Company) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + consultantObj.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.companies = this.companies.filter(val => val.vendor_company_id  !== consultantObj.vendor_company_id );
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
