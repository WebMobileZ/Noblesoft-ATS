
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../../../auth/store/auth.reducers';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/app.reducers';
import { Customer, Representative, Consultant, Technology, User,Submission } from "../../../customer";
import { CustomerService } from "../../../customer.service";
import { Table } from 'primeng/table';
import { ConsultantDetail } from '../../../product';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { SubmissionRestService } from '../submission-rest.service';
import {SelectItem} from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-submission-list',
  templateUrl: './submission-list.component.html',
  styleUrls: ['./submission-list.component.scss']
})
export class SubmissionListComponent implements OnInit {
  title = 'Webmobilez';
  isAuthnoticated: Observable<State>;
  consultantForm: FormGroup;
  submissions: Submission[];
  submission: Submission;
  User: User[];
  statuses: any[];
  visaTypes: any[];
  states: any[];
  priority: any[];
  resources: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];

  consultant: Consultant;
  submitted: boolean;
  consultantDialog: boolean;
  msgs: Message[] = [];
  position: string;
  successResult: any;
  serverErrors: any;
  submissionButton:string;
  commentsData:string;
  heading1:string;

  submissiontypes:any[];
  filterstatuses:any[];
  employees:any[]=[];
  submissionfilterstatus:any;
  submissionfilter:any;
  employeeFilter:any;
  lastLazyEvent:any;
  totalRecords: number;
  isAdmin: boolean = false;
  displayModal1: boolean;
  valuenote: any;
  constructor(private messageService: MessageService,  private userRest: SubmissionRestService, private confirmationService: ConfirmationService, private store: Store<AuthState>, private consultantService: CustomerService) {

  }

  showModalDialog1(value: any) {

    this.displayModal1 = true;
    this.valuenote = value
  }
  get timezone() { return this.consultantForm.get('timezone'); }

  get submissionStatus() { return this.consultantForm.get('submissionStatus'); }
  get scheduleDate() { return this.formatDate(this.consultantForm.get('scheduleDate')); }

  get comments() { return this.consultantForm.get('comments'); }
  formatDate(date) {
    if(date)
    {
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (month < 10) {
        month = '0' + month;
      }

      if (day < 10) {
        day = '0' + day;
      }

      return date.getFullYear() + '-' + month + '-' + day;
    }else{
      return '';
    }

  }

  loadData(event) {
    this.lastLazyEvent = event;
    this.loading = true;
    //event.first = First row offset
    //event.rows = Number of rows per page

    setTimeout(() => {
      this.userRest.SubmissionsFilter(event,this.submissionfilter,this.submissionfilterstatus,this.employeeFilter).then(submissions => {
        this.submissions = [...submissions.data];
        this.totalRecords = submissions.total;
        this.loading = false;

      });

    }, 1000);

}
  ngOnInit(): void {
    this.commentsData ="";

    this.isAuthnoticated = this.store.select('authState');
    this.userRest.getConsultantsList().subscribe(
      (response) => {
       this.submissiontypes = response.submissions;
      //  this.vendors = response.vendorslist;
      //  this.clients = response.clients;
       // this.data = response.data;
      },
      (error) => { console.log(error) }
    );
    this.userRest.getBenchUsers().subscribe(
      (response) => {
       this.employees = response.users;
      //  this.vendors = response.vendorslist;
      //  this.clients = response.clients;
       // this.data = response.data;
      },
      (error) => { console.log(error) }
    );

    if ( localStorage.getItem('roles') == 'admin' || localStorage.getItem('roles') == 'sales-lead') {
      this.isAdmin = true;
    }
    this.consultantForm = new FormGroup({
    //  'consultant_id': new FormControl(null, [Validators.required]),
     // 'vendor_company_contact_id': new FormControl(null, [Validators.required]),
   //   'clientId': new FormControl(null, [Validators.required]),
   //   'actualRate': new FormControl(null, [Validators.required]),
   //   'submissionRate': new FormControl("", [Validators.required]),
      'timezone': new FormControl(null),
      'submissionStatus': new FormControl(null, [Validators.required]),
      'comments': new FormControl(null),
      'scheduleDate': new FormControl(null),
    })

   /* this.consultantService.getSubmissions().then(submissions => {
      //this.technologies.push({ technology_id:0,name:'Choose Technology',created_at:'' });
      this.submissions=submissions;
      this.loading=false;

    }); */

    this.visaTypes = [
      { name: "Choose VisaType", value: '' },
      { name: "H4 EAD", value: "H4 EAD" },
      { name: "H1B-Transfer", value: "H1B-Transfer" },
      { name: "CPT", value: "CPT" },
      { name: "OPT", value: "OPT" },
      { name: "H1-B", value: "H1-B" },
      { name: "GC-EAD", value: "GC-EAD" },
      { name: "Green Card", value: "Green Card" },
      { name: "US Citizen", value: "US Citizen" }

    ];
    this.states = [
      { name: "Choose State", value: '' },
      { name: "Michigan", value: "Michigan" },
      { name: "NewYork", value: "NewYork" },
    ];
    this.priority = [
      { name: "Low", value: 'Low' },
      { name: "Medium", value: "Medium" },
      { name: "High", value: "High" },
    ];
    this.resources = [
      { name: "Choose Resource", value: '' },
      { name: "LinkedIn", value: 'LinkedIn' },
      { name: "Dice", value: "Dice" },
      { name: "Noukari", value: "Noukari" },
    ];
    this.filterstatuses = [

      {label: 'Interview scheduled', value: 'Interview scheduled' },
      {label: 'Submitted to Client', value: 'Submitted to Client' },
      {label: 'Submitted to Vendor', value: 'Submitted to Vendor' }
    ,{label: 'Disqualified', value: 'Disqualified' },
    {label: 'Client rejected', value: 'Client rejected' },
    {label: 'Vendor Rejected', value: 'Vendor Rejected' },
    {label: 'Vendor screening call', value: 'Vendor screening call' },
    {label: 'Waiting for Evaluation', value: 'Waiting for Evaluation' },
    {label: 'Placed', value: 'Placed' },
    ];
    this.statuses = [

      {label: 'Interview scheduled', value: 'Interview scheduled' },
      {label: 'Submitted to Client', value: 'Submitted to Client' },
      {label: 'Submitted to Vendor', value: 'Submitted to Vendor' }
    ,{label: 'Disqualified', value: 'Disqualified' },
    {label: 'Client rejected', value: 'Client rejected' },
    {label: 'Vendor Rejected', value: 'Vendor Rejected' },
    {label: 'Vendor screening call', value: 'Vendor screening call' },
    {label: 'Waiting for Evaluation', value: 'Waiting for Evaluation' },
    {label: 'Placed', value: 'Placed' },
    ];



  }



  searchBenchList()
  {
    this.loading = true;

    this.userRest.SubmissionsFilter(this.lastLazyEvent,this.submissionfilter,this.submissionfilterstatus,this.employeeFilter).then(submissions => {
      this.submissions = [...submissions.data];
      this.totalRecords = submissions.total;
      this.loading = false;

    });

  }
  clear(table: Table) {
    table.clear();
    this.submissionfilterstatus='';
    this.submissionfilter='';
    this.employeeFilter='';
    this.loading = true;
    this.userRest.SubmissionsFilter('',this.submissionfilter,this.submissionfilterstatus,this.employeeFilter).then(submissions => {
      this.submissions = [...submissions.data];
        this.totalRecords = submissions.total;
        this.loading = false;

    });
  }

 //create Consultant
  openNew() {

    this.submissionButton ="Add Submission";
    this.consultantForm.reset();
    this.consultant = {};
    this.submitted = false;
    this.consultantDialog = true;
  }
  updateConsultantDetails() {

    if (this.consultantForm.valid) {
      this.submitted = true;
    } else {
      this.submitted = false;
    }
      this.consultantService.updateSubmission(this.consultantForm, this.submission.submission_id).subscribe(data => {
        this.successResult = data;

        this.submissions[this.findIndexById(data.submission.submission_id)] = data.submission;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Submission Updated', life: 3000 });
      }, err => {
        this.serverErrors = err.error;
      });
      // this.consultants[this.findIndexById(this.consultant.consultant_id)] = this.consultant;




    this.submissions = [...this.submissions];
    this.consultantDialog = false;
    this.consultant = {};

  }
  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.submissions.length; i++) {
      if (this.submissions[i].submission_id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  hideDialog() {

    this.consultantDialog = false;
    this.submitted = false;
  }
  editProduct(consultantObj: any) {

   this.heading1 = consultantObj.consultant.consultatName + " submiting to "+consultantObj.contact_list.companies.name;
  //this.heading1 = consultantObj.consultant.consultatName + " submiting to "+consultantObj.vendorCompanyName;
    this.submissionButton ="Update Submission"
    this.consultantForm.patchValue({ ...consultantObj });
    this.submission = { ...consultantObj };
     this.consultantDialog = true;
  }
  deleteProduct(event: Event,consultantObj: any) {

    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure you want to delete ' + consultantObj.consultant?.consultatName + '?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
      //  const formData = new FormData();
      //  formData.append("submission_id", id );
      //  formData.append("user_status",status );

        this.submissions = this.submissions.filter(val => val.submission_id !== consultantObj.submission_id);
        //this.consultant = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Submission Deleted', life: 3000 });


      },
      reject: () => {
          this.messageService.add({severity:'error', summary:'Rejected', detail:'Rejected'});
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
