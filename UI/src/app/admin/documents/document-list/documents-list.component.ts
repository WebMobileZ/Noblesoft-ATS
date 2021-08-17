
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
import { SelectItem } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  title = 'Webmobilez';
  isAuthnoticated: Observable<State>;
  consultantForm: FormGroup;
  customers: Consultant[];
  consultants: Consultant[];
  representatives: Representative[];
  technologies: Technology[];
  technologiesforflter: Technology[];
  User: User[];
  statuses: any[];
  visaTypes: any[];
  states: any[];
  priority: any[];
  resources: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  displayModal: boolean;
  displayModal1: boolean;
  displayModalVendor: boolean;
  valuenote: any;
  consultant: Consultant;
  submitted: boolean;
  consultantDialog: boolean;
  sendmaildialog: boolean;
  msgs: Message[] = [];
  position: string;
  successResult: any;
  serverErrors: any;
  consulatnt_id: number;
  registerVendor: FormGroup;
  sendEmailForm:FormGroup;
  isHeadAdmin: boolean = false;
  consultantsstatus: any[] = [];
  submissionfilterstatus: any;
  technologyvalue: any;
  items: any[];
  selectedVendors: any;
  selectedcontacts:any;
  vendors: any[] = [];
  contacts: any[] = [];
  selectedConsultantDetails: Consultant;
  vcname: any;
  values: string[] = [];
  subjectValue: string;
  message: string;
  user: Observable<object>;
  senmails:boolean =false;
  isHeadhunterAdmin:boolean=false;
  resumeDialog:boolean = false;
  doc:any;
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private store: Store<AuthState>, private consultantService: CustomerService) {

  }
  openDocNew(doc:any) {
    this.doc='https://apiv2.webmobilez.com/storage/app/uploads/resume/'+doc;

        this.resumeDialog = true;

      }
  get note() { return this.registerVendor.get('note'); }
  get portal_status() { return this.registerVendor.get('portal_status'); }
  get consultant_email() { return this.registerVendor.get('consultant_email'); }
  registerUser(submissionId: number) {

    this.consultantService.updateConsultantStatus(this.registerVendor,this.consulatnt_id).subscribe(data => {

    //  this.consultants[this.findIndexById(data.consultant.consultant_id)] = data.consultant;
  //    this.registerVendor.reset();
  //    this.consultants = [...this.consultants];
      this.displayModal = false;

      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Consultant Updated', life: 3000 });
      this.consultantService.getDocumentConsultants().then(consultants => {
        this.consultants = consultants;
        this.loading = false;

      });
    }, err => {
      this.serverErrors = err ;

    });

  }

  sendEmail()
  {
this.senmails=true;

    this.consultantService.emailsent(this.sendEmailForm).subscribe(
      response => {

        if(response.success==true)
        {
          this.messageService.add({ severity: 'success', summary: '', detail: response.sent });
          this.sendEmailForm.reset();
          this.sendmaildialog=false;
          this.senmails =false;
        }else{
          this.messageService.add({severity:'warn', summary:'', detail:response.sent});
          this.senmails =false;
        }



      },
      error =>{
        this.messageService.add({severity:'warn', summary:'', detail:error });
        this.serverErrors = error
        this.senmails =false;
      }
    );
  }


  get resume() { return this.sendEmailForm.get('resume'); }
  get otherDocument() { return this.sendEmailForm.get('otherDocument'); }
  ngOnInit(): void {

    if(localStorage.getItem('roles')=='adminhunters' ||  localStorage.getItem('roles')=='admin')
    {
      this.isHeadhunterAdmin =true;
    }
    this.consultantsstatus = [

      { label: "Interested", value: 'Interested' },
      { label: "not interested", value: "not interested" },
      { label: "Not responding", value: "Not responding" },
      { label: "need to discuss", value: "need to discuss" },
      { label: "Employer lift the call", value: "Employer lift the call" },
      { label: "Waiting for documents", value: "Waiting for documents" },
      { label: "Interview Scheduled", value: "Interview Scheduled" },
      { label: "Submited Client", value: "Submited Client" },
      { label: "Submited Prime Vendor", value: "Submited Prime Vendor" },
      { label: "Placed", value: "Placed" }
    ];


    this.isAuthnoticated = this.store.select('authState');

    if (localStorage.getItem('roles') == 'admin' || localStorage.getItem('roles') == 'adminhunters') {
      this.isHeadAdmin = true;
    }
    this.registerVendor = new FormGroup({
      'note': new FormControl(''),
      'portal_status': new FormControl(''),
      'priority': new FormControl(''),
      'consultant_email': new FormControl(''),

    });
    this.sendEmailForm = new FormGroup({
      'values': new FormControl(null, [Validators.required]),
      'subjectValue': new FormControl(null, [Validators.required]),
      'message': new FormControl(null, [Validators.required]),
      'otherDocument': new FormControl(''),
      'resume': new FormControl(''),
    });

    this.consultantService.getDocumentConsultants().then(consultants => {
      this.consultants = consultants;
      this.loading = false;

    });
    this.consultantService.getTechnologies().then(technologies => {
      //this.technologies.push({ technology_id:0,name:'Choose Technology',created_at:'' });
      this.technologies = technologies;

    });
    this.consultantService.getOnlyTechnologies().then(technologies => {
      //this.technologies.push({ technology_id:0,name:'Choose Technology',created_at:'' });
      this.technologiesforflter = technologies;

    });
    this.consultantService.getVendors().then(vendors => {
      this.vendors = vendors;
      this.loading = false;

    });
    this.items = [
      {
        label: 'Send Email',
        icon: 'pi pi-fw pi-send',
        command: (event: any) => {
          this.sendEmailForm.addControl('state', new FormControl(this.selectedConsultantDetails.consultant_id));
          this.sendEmailForm.patchValue({
            state: this.selectedConsultantDetails.consultant_id
          });
         let profile:any =JSON.parse(localStorage.getItem('userProfile'));
         this.sendmaildialog=true;
          this.subjectValue ="BenchInfo - "+this.selectedConsultantDetails.technologies.name+" "+this.selectedConsultantDetails.city +", "+this.selectedConsultantDetails.state+" (Remote during COVID)";
          this.message = '<div><p>Hi, </p><br><p>It Was Nice Talking To You, I Confirm The Rate $'+this.selectedConsultantDetails.rate+'/Hr On C2C  For Our Consultant <strong>'+this.capitalizeFirstLetter(this.selectedConsultantDetails.first_name)+'</strong></p></div><br>';
          this.message +='<p><strong>Full legal Name : '+this.capitalizeFirstLetter(this.selectedConsultantDetails.first_name)+' '+this.capitalizeFirstLetter(this.selectedConsultantDetails.last_name)+'</strong></p><br>';
          this.message +='<p><strong>Phone : '+this.selectedConsultantDetails.consultant_mobile_number+'</strong></p><br>';
          this.message +='<p><strong>Email : '+this.selectedConsultantDetails.consultant_email+'</strong></p><br>';
          if(this.selectedConsultantDetails.linkedInUrl)
          this.message +='<p><strong>LinkediN : '+this.selectedConsultantDetails.linkedInUrl+'</strong></p><br>';
          if(this.selectedConsultantDetails.skypeId)
          this.message +='<p><strong>Skype : '+this.selectedConsultantDetails.skypeId+'</strong></p><br>';
          this.message +='<p><strong>Current Location : '+this.selectedConsultantDetails.city+' '+this.selectedConsultantDetails.state+'</strong></p><br>';
          if(this.selectedConsultantDetails.ssn)
          this.message +='<p><strong>Last 4 of SSN  : '+this.selectedConsultantDetails.ssn+'</strong></p><br>';
          if(this.selectedConsultantDetails.availability)
          this.message +='<p><strong>Availability for Interview : '+this.selectedConsultantDetails.availability+'</strong></p><br><br>';
          this.message +='<br><br><h2 style="font-family:&quot;Cambria&quot;,serif;color:#1f497d"><strong>E-Mail Us The Best Way To Reach Me</strong></h2>';
          this.message +='<br><p style="font-family:&quot;Cambria&quot;,serif;color:#1f497d">'+profile.name+'</p>';
          this.message +='<br><p>WebmobileZ, Inc</p>';
          this.message +='<br><p>Mobile +1 (339) 218-8483 |  Cell +91 8121943539</p>';
         this.message +='<br><p>'+profile.email+'  | www.WebmobileZ.com</p>';

        }
      },
      {
        separator: true
      },

    ];

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
    this.statuses = [
      { label: "Choose Status", value: '' },
      { label: "Interested", value: 'Interested' },
      { label: "not interested", value: "not interested" },
      { label: "Not responding", value: "Not responding" },
      { label: "need to discuss", value: "need to discuss" },
      { label: "Employer lift the call", value: "Employer lift the call" },
      { label: "Waiting for documents", value: "Waiting for documents" }
    ];



  }
   capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  ChangeVendor($event, refence) {

    this.consultantService.editVenodr($event.value).subscribe(
      (response) => {
        this.contacts = response.contacts

      },
      (error) => console.log(error)
    );

  }
  ChangeContactsInner(value) {
    this.vcname = value.originalEvent.target.textContent;

    this.values = [this.vcname];

  }

  clear(table: Table) {
    table.clear();
  }

  //create Consultant
  openNew() {
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

    if (this.consultant.consultant_id) {
      this.consultantService.updateUser(this.consultantForm, this.consultant.consultant_id).subscribe(data => {
        this.successResult = data;

        this.consultants[this.findIndexById(data.consultant.consultant_id)] = data.consultant;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Consultant Updated', life: 3000 });
      }, err => {
        this.serverErrors = err.error;
      });
      // this.consultants[this.findIndexById(this.consultant.consultant_id)] = this.consultant;


    }
    else {


      this.consultantService.updateConsultant(this.consultantForm).subscribe(data => {
        this.consultantForm.reset();
        this.successResult = data;
        this.consultants.push(data.consultant);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Consultant Created', life: 3000 });
        //  this.consultantForm.reset();

      }, err => {
        this.serverErrors = err.error;
      });
      // this.consultant.consultant_id = this.createId();


    }

    this.consultants = [...this.consultants];
    this.consultantDialog = false;
    this.consultant = {};

  }
  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.consultants.length; i++) {
      if (this.consultants[i].consultant_id === id) {
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
  editProduct(consultantObj: Consultant) {
    this.consultantForm.patchValue({ ...consultantObj });
    this.consultant = { ...consultantObj };
    this.consultantDialog = true;
  }
  deleteProduct(consultantObj: Consultant) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + consultantObj.first_name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.consultants = this.consultants.filter(val => val.consultant_id !== consultantObj.consultant_id);
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


  onRowExpand(event) {
    const consultantId: number = event.data.consultant_id;


    this.consultantService.getConsultantSubmissions(consultantId).subscribe(consultantSubmissions => {
      event.data.submissions = consultantSubmissions.submissions;
    }, error => {
      event.data.submissions = [];
    });
  }
  showModalDialog1(value: any) {

    this.displayModal1 = true;
    this.valuenote = value
  }
  showModalDialog(data) {
    this.displayModal = true;
    this.consulatnt_id = data.consultant_id;
    this.registerVendor.patchValue({
      priority: data.priority,
      portal_status: data.portal_status,
      note: data.note,
      consultant_email: data.consultant_email,
    });

  }
  calculateDiff(dateSent){
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
  }
}
