
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../../../auth/store/auth.reducers';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/app.reducers';
import { Customer, Representative, Consultant, Technology, User, Job } from "../../../customer";
import { CustomerService } from "../../../customer.service";
import { Table } from 'primeng/table';
import { ConsultantDetail } from '../../../product';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { SelectItem } from 'primeng/api';

import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-consultant-list',
  templateUrl: './consultant-list.component.html',
  styleUrls: ['./consultant-list.component.scss'], providers: [ConfirmationService, MessageService]
})

export class ConsultantListComponent implements OnInit {

  consultanttypes: SelectItem[];

  selectedCity: any;
  title = 'Webmobilez';
  isAuthnoticated: Observable<State>;
  consultantForm: FormGroup;
  customers: Consultant[];
  technologyDialog: boolean;
  technologiesForm: FormGroup;
  consultants: Consultant[];
  representatives: Representative[];
  technologies: any[];
  technologyFilters:any = 0;
  taxtypes: any[];
  technologiesforflter: Technology[];
  User: User[];
  jobs: Job[];
  statuses: any[];
  visaTypes: any[];
  experiencesstatus: any[] = [];
  states: any[];
  hotlistfilter: any[];
  usersTypes: any[];
  consultantsstatus: any[];
  submissiontypes: any[];
  priority: any[];
  resources: any[];
  loading: boolean = false;
  imageFile: { link: string, file: any, name: string };
  activityValues: number[] = [0, 100];

  consultant: Consultant;
  submitted: boolean;
  consultantDialog: boolean;
  msgs: Message[] = [];
  position: string;
  successResult: any;
  serverErrors: any;
  submissionfilter: any = 1;
  submissionfilterHotlist: any;
  employeeFilter: any = 0;
  submissionfilterstatus: any;
  changeUserFilter:any;
  isHeadhunter: boolean = false;
  isHeadhunterAdmin: boolean = false;
  consultantButton: string;
  documentsup: boolean = true;
  isRecruiter: boolean = false;
  employees: any[] = [];
  allemployees: any[] = [];
  selectTaxType: any = 'W2';
  resumeDialog: boolean = false;
  doc: any;
  hotliststatuslist:any[] =[];
  hotliststatus:any ="A";
hideFields:boolean;
  checked2: boolean = true;
  num2: any='';
  constructor(private confirmation: ConfirmationService, private messageService: MessageService, private confirmationService: ConfirmationService, private store: Store<AuthState>, private consultantService: CustomerService) {
   
    this.consultanttypes = [
      {label: 'Submission', value: 'A'},
      {label: 'InActive', value: 'I'},
   
  ];

  }
  openDocNew(doc: any) {
    this.doc = 'https://apiv2.webmobilez.com/storage/app/uploads/resume/' + doc;

    this.resumeDialog = true;

  }
  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }
  get tax_type() { return this.consultantForm.get('tax_type'); }
  get first_name() { return this.consultantForm.get('first_name'); }
  get last_name() { return this.consultantForm.get('last_name'); }
  get consultant_email() { return this.consultantForm.get('consultant_email'); }
  get visaType() { return this.consultantForm.get('visaType'); }
  get consultant_mobile_number() { return this.consultantForm.get('consultant_mobile_number'); }
  get technology_id() { return this.consultantForm.get('technology_id'); }
  get rate() { return this.consultantForm.get('rate'); }
  get expected_rate() { return this.consultantForm.get('expected_rate'); }
  get city() { return this.consultantForm.get('city'); }
  get state() { return this.consultantForm.get('state'); }
  get willingLocation() { return this.consultantForm.get('willingLocation'); }
  get documentsCollected() { return this.consultantForm.get('documentsCollected'); }
  get resource() { return this.consultantForm.get('resource'); }
  get ssn() { return this.consultantForm.get('ssn'); }
  get bestContactNumber() { return this.consultantForm.get('bestContactNumber'); }
  get linkedInUrl() { return this.consultantForm.get('linkedInUrl'); }
  get skypeId() { return this.consultantForm.get('skypeId'); }
  get comments() { return this.consultantForm.get('comments'); }
  get note() { return this.consultantForm.get('note'); }
  get consultant_status() { return this.consultantForm.get('consultant_status'); }
  get experience() { return this.consultantForm.get('experience'); }
  get availability() { return this.consultantForm.get('availability'); }
  get resume() { return this.consultantForm.get('resume'); }
  get otherDocument() { return this.consultantForm.get('otherDocument'); }
  get workAuthorization() { return this.consultantForm.get('workAuthorization'); }
  get vendor_company_name() { return this.consultantForm.get('vendor_company_name'); }
  get company_email() { return this.consultantForm.get('company_email'); }
  get company_mobile_number() { return this.consultantForm.get('company_mobile_number'); }
  get schedule_date() { return this.formatDate(this.consultantForm.get('schedule_date')); }
  get keywords() { return this.consultantForm.get('keywords'); }
  get consultant_type() { return this.consultantForm.get('consultant_type'); }
  ConvertToInt(val) {
    return parseFloat(val);
  }
  onchangeRate($event)
  {
  if($event)
  {
    if(this.num2)
    {
      let calValue =(100/this.ConvertToInt(this.num2)*this.ConvertToInt($event));
      this.consultantForm.patchValue({
        expected_rate: calValue
      });    
    }else{
      this.consultantForm.patchValue({
        expected_rate: 0
      });    
    }
  }
  
  }
  onchangepercentytpe($event)
  {
    if($event)
    {
   if(this.consultantForm.get('rate').value)
   {
     let calValue =(100/this.ConvertToInt($event)*this.ConvertToInt(this.consultantForm.get('rate').value));
    this.consultantForm.patchValue({
      expected_rate: calValue
    });    
   }else{
    this.consultantForm.patchValue({
      expected_rate: 0
    });   
  }
  }else{
    this.consultantForm.patchValue({
      expected_rate: 0
    });   
  } 
  
  }
  changeUserType($event) {

    if ($event.value == 1) {
      this.employees = this.allemployees.filter(val => (val.role == 'head-hunters'|| val.role == 'adminhunters' ));
    } else if ($event.value == 2) {
      this.employees = this.allemployees.filter(val => val.role == 'recruiter');
    } else {
      this.employees = this.allemployees;
    }


  }
  ngOnInit(): void {

    this.selectedCity =  'A';
    this.isAuthnoticated = this.store.select('authState');

    this.taxtypes = [
      { label: "W2", value: 'W2' },
      { label: "C2C", value: "C2C" }];

      this.hotliststatuslist =[
        { label: "Hot List", value: 'A' },
        { label: "Exclude Hot List", value: "D" },
      ];

    if (localStorage.getItem('roles') == 'head-hunters') {
      this.isHeadhunter = true;

      this.consultantsstatus = [

        { label: "Interested", value: 'Interested' },
        { label: "not interested", value: "not interested" },
        { label: "Not responding", value: "Not responding" },
        { label: "need to discuss", value: "need to discuss" },
        { label: "Employer lift the call", value: "Employer lift the call" },
        { label: "Waiting for documents", value: "Waiting for documents" },

        { label: "Placed", value: "Placed" },
     
      ];
      this.statuses = [
        { label: "Choose Status", value: '' },
        { label: "Interested", value: 'Interested' },
        { label: "not interested", value: "not interested" },
        { label: "Not responding", value: "Not responding" },
        { label: "need to discuss", value: "need to discuss" },
        { label: "Employer lift the call", value: "Employer lift the call" },
        { label: "Waiting for documents", value: "Waiting for documents" },

        { label: "Placed", value: "Placed" },

      ];
    }
    if (localStorage.getItem('roles') == 'adminhunters' || localStorage.getItem('roles') == 'admin') {
      this.isHeadhunterAdmin = true;
      this.consultantsstatus = [

        { label: "Interested", value: 'Interested' },
        { label: "not interested", value: "not interested" },
        { label: "Not responding", value: "Not responding" },
        { label: "need to discuss", value: "need to discuss" },
        { label: "Employer lift the call", value: "Employer lift the call" },
        { label: "Waiting for documents", value: "Waiting for documents" },
        { label: "Interview Scheduled", value: "Interview Scheduled" },
        { label: "Placed", value: "Placed" }
      ];
      this.statuses = [
        { label: "Choose Status", value: '' },
        { label: "Interested", value: 'Interested' },
        { label: "not interested", value: "not interested" },
        { label: "Not responding", value: "Not responding" },
        { label: "need to discuss", value: "need to discuss" },
        { label: "Employer lift the call", value: "Employer lift the call" },
        { label: "Waiting for documents", value: "Waiting for documents" },
        { label: "Interview Scheduled", value: "Interview Scheduled" },
        { label: "Placed", value: "Placed" },

      ];
    }
    if (localStorage.getItem('roles') == 'recruiter' || localStorage.getItem('roles') == 'accountmanager' || localStorage.getItem('roles') == 'bdm') {
      this.isRecruiter = true;
      this.consultantsstatus = [

        { label: "Interested", value: 'Interested' }, ,
        { label: "Interview Scheduled", value: "Interview Scheduled" },
        { label: "Submited Client", value: "Submited Client" },
        { label: "Submited Prime Vendor", value: "Submited Prime Vendor" },
        { label: "Placed", value: "Placed" }
      ];
      this.statuses = [
        { label: "Choose Status", value: '' },

        { label: "Interview Scheduled", value: "Interview Scheduled" },
        { label: "Submited Client", value: "Submited Client" },
        { label: "Submited Prime Vendor", value: "Submited Prime Vendor" },
        { label: "Placed", value: "Placed" },

      ];

    }
    this.consultantForm = new FormGroup({
      'job_id': new FormControl(null),
      'consultant_type': new FormControl(''),
      'tax_type': new FormControl('W2'),
      'company_email': new FormControl(null, [Validators.email]),
      'company_mobile_number': new FormControl(null),
      'first_name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'last_name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'consultant_email': new FormControl(null, [Validators.required, Validators.email]),
      'consultant_mobile_number': new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'technology_id': new FormControl("", [Validators.required]),
      'rate': new FormControl(null, [Validators.required]),
      'expected_rate' :new FormControl(null),
      'visaType': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'state': new FormControl(null, [Validators.required]),
      'willingLocation': new FormControl(null),
      'documentsCollected': new FormControl(null),
      'resource': new FormControl(null),
      'ssn': new FormControl(null, [Validators.required]),
      'bestContactNumber': new FormControl(null),
      'linkedInUrl': new FormControl(null),
      'skypeId': new FormControl(null),
      'comments': new FormControl(null),
      'note': new FormControl(null),
      'consultant_status': new FormControl(null, [Validators.required]),
      'experience': new FormControl(null, [Validators.required]),
      'availability': new FormControl(null),
      'priority': new FormControl(null),
      'resume': new FormControl(null,[Validators.required]),
      'otherDocument': new FormControl(null),
      'schedule_date': new FormControl(new Date()),
      'workAuthorization': new FormControl(null),
      'vendor_company_name': new FormControl(null),
      'keywords': new FormControl(null)

    })
    this.loading = true;
    this.consultantService.getCustomersLarge().then(consultants => {
      this.consultants = consultants;
      this.loading = false;

    });
    this.consultantService.getUserAssignJobs().then(jobs => {
      this.jobs = jobs;

    });
    this.consultantService.getHeadhunterUsers().then(users => {
      this.allemployees = users;
      this.employees = users;

    });
    this.consultantService.getTechnologies().then(technologies => {
      //this.technologies.push({ technology_id:0,name:'Choose Technology',created_at:'' });
      this.technologies = technologies;

    });
    this.consultantService.getOnlyTechnologies().then(technologies => {
      //this.technologies.push({ technology_id:0,name:'Choose Technology',created_at:'' });
      this.technologiesforflter = technologies;

    });
    this.usersTypes = [
      { name: "Head Hunters", id: "1" },
      { name: "Recruiters", id: "2" },
    ];
    this.hotlistfilter = [
      { name: "Exclude Hotlist", value: "Exclude Hotlist" },
      { name: "Only Hotlist", value: "Only Hotlist" },
    ];

    if ( localStorage.getItem('roles') == 'admin') {
    this.submissiontypes = [
      { name: "All Submissions", value: 1 },

    ];
  }else{
    this.submissiontypes = [
      { name: "All Submissions", value: 1 },
      { name: "My Submissions", value: 2 },
    ];
  }
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
  /*  this.experiencesstatus = [
      { name: "1 - 5 Years", value: '5' },
      { name: "5 - 10 Years", value: '10' },
      { name: "10 - 15 Years", value: '15' },
      { name: "15 - 20 Years", value: '20' },
      { name: "20 - 25 Years", value: '25' },
    ]; */
    this.experiencesstatus = [
      { name: "1", value: '1' },
      { name: "2", value: '2' },
      { name: "3", value: '3' },
      { name: "4", value: '4' },
      { name: "5", value: '5' },
      { name: "6", value: '6' },
      { name: "7", value: '7' },
      { name: "8", value: '8' },
      { name: "9", value: '9' },
      { name: "10", value: '10' },
      { name: "11", value: '11' },
      { name: "12", value: '12' },
      { name: "13", value: '13' },
      { name: "14", value: '14' },
      { name: "15", value: '15' },
      { name: "16", value: '16' },
      { name: "17", value: '17' },
      { name: "18", value: '18' },
      { name: "19", value: '19' },
      { name: "20", value: '20' },
      { name: "21", value: '21' },
      { name: "22", value: '22' },
      { name: "24", value: '24' },
      { name: "25", value: '25' },
      { name: "26", value: '26' },
      { name: "27", value: '27' },
      { name: "28", value: '28' },
      { name: "29", value: '29' },
      { name: "30", value: '30' },

    ];
    this.states = [
      { name: "Choose State", value: '' },
      { name: "Alabama", value: "Alabama" },
      { name: 'Alaska', value: 'Alaska' },
      { name: 'Arizona', value: 'Arizona' },
      { name: 'Arkansas', value: 'Arkansas' },
      { name: 'California', value: 'California' },
      { name: 'Colorado', value: 'Colorado' },
      { name: 'Connecticut', value: 'Connecticut' },
      { name: 'Delaware', value: "Delaware" },
      { name: 'District of Columbia', value: "District of Columbia" },
      { name: 'Florida', value: "Florida" },
      { name: 'Georgia', value: "Georgia" },
      { name: 'Hawaii', value: "Hawaii" },
      { name: 'Idaho', value: "Idaho" },
      { name: 'Illinois', value: "Illinois" },
      { name: 'Indiana', value: "Indiana" },
      { name: 'Iowa', value: "Iowa" },
      { name: 'Kansas', value: "Kansas" },
      { name: 'Kentucky', value: "Kentucky" },
      { name: 'Louisiana', value: "Louisiana" },
      { name: 'Maine', value: "Maine" },
      { name: 'Maryland', value: "Maryland" },
      { name: 'Michigan', value: "Michigan" },
      { name: 'Minnesota', value: "Minnesota" },
      { name: 'Mississippi', value: "Mississippi" },
      { name: 'Missouri', value: "Missouri" },
      { name: 'Montana', value: "Montana" },
      { name: 'Nebraska', value: "Nebraska" },
      { name: 'Nevada', value: "Nevada" },
      { name: 'New Hampshire', value: "New Hampshire" },
      { name: 'New Jersey', value: "New Jersey" },
      { name: 'New Mexico', value: "New Mexico" },
      { name: 'New York', value: "New York" },
      { name: 'North Carolina', value: "North Carolina" },
      { name: 'North Dakota', value: "North Dakota" },
      { name: 'Ohio', value: "Ohio" },
      { name: 'Oklahoma', value: "Oklahoma" },
      { name: 'Oregon', value: "Oregon" },
      { name: 'Pennsylvania', value: "Pennsylvania" },
      { name: 'Puerto Rico', value: "Puerto Rico" },
      { name: 'Rhode Island', value: "Rhode Island" },
      { name: 'South Carolina', value: "South Carolina" },
      { name: 'South Dakota', value: "South Dakota" },
      { name: 'Tennessee', value: "Tennessee" },
      { name: 'Texas', value: "Texas" },
      { name: 'Utah', value: "Utah" },
      { name: 'Vermont', value: "Vermont" },
      { name: 'Virginia', value: "Virginia" },
      { name: 'Washington', value: "Washington" },
      { name: 'West Virginia', value: "West Virginia" },
      { name: 'Wisconsin', value: "Wisconsin" },
      { name: 'Wyoming', value: "Wyoming" },
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

    this.technologiesForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
    })
  }
  get name() { return this.technologiesForm.get('name'); }

  clear(table: Table) {
    table.clear();
    this.submissionfilter = "My Submissions";
    this.submissionfilterstatus = '';
    this.employeeFilter = '';
    this.changeUserFilter =null;
    this.technologyFilters=0;
    this.hotliststatus ="A";
    this.employees = this.allemployees;
    this.searchConsultant(0);
  }
  openTechnology() {
    this.technologiesForm.reset();

    this.technologyDialog = true;
  }
  updateTechnologyDetails() {
    let techid = '';
    this.consultantService.storeTechnology(this.technologiesForm).subscribe(data => {
      this.technologiesForm.reset();
      this.technologies.push({ label: data.technology.name, technology_id: data.technology.technology_id, name: data.technology.name, value: data.technology.technology_id });

      this.consultantForm.patchValue({
        technology_id: data.technology.technology_id,
        // formControlName2: myValue2 (can be omitted)
      });
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Technology Created', life: 3000 });


    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.name[0], life: 3000 });
    });

    /*this.consultantService.getTechnologies().then(technologies => {
      //this.technologies.push({ technology_id:0,name:'Choose Technology',created_at:'' });
      this.technologies = technologies;

    }); */
    this.technologyDialog = false;


  }
  //create Consultant
  openNew() {
    this.consultantButton = "Add Consultant";
    this.consultantForm.reset();
    this.consultant = {};
    this.submitted = false;
    this.consultantDialog = true;
    this.serverErrors = {};
  }
  searchConsultant(event) {

    this.loading = true;
    if ( localStorage.getItem('roles') != 'admin') {
    if(this.submissionfilter ==2)
    {
      this.employeeFilter = '';
    }
    if (this.employeeFilter) {
      this.submissionfilter = 1;
    }

  }
    this.consultantService.getConsultantListFilters(this.submissionfilter, this.submissionfilterstatus, '', this.employeeFilter,this.technologyFilters,this.hotliststatus).then(consultants => {
      this.consultants = consultants;
      this.consultants = [...this.consultants];
      this.loading = false;

    });

  }

  onChangeType(event)
  {
    
   if(event=='I')
   {
this.hideFields =true;

this.consultantForm.get('consultant_mobile_number').clearValidators();
this.consultantForm.get('consultant_mobile_number').updateValueAndValidity();
this.consultantForm.get('rate').clearValidators();
this.consultantForm.get('rate').updateValueAndValidity()
this.consultantForm.get('visaType').clearValidators();
this.consultantForm.get('visaType').updateValueAndValidity()
this.consultantForm.get('city').clearValidators();
this.consultantForm.get('city').updateValueAndValidity()
this.consultantForm.get('state').clearValidators();
this.consultantForm.get('state').updateValueAndValidity()

this.consultantForm.get('ssn').clearValidators();
this.consultantForm.get('ssn').updateValueAndValidity()
this.consultantForm.get('consultant_status').clearValidators();
this.consultantForm.get('consultant_status').updateValueAndValidity()
this.consultantForm.get('experience').clearValidators();
this.consultantForm.get('experience').updateValueAndValidity()

this.consultantForm.updateValueAndValidity()


   }else{

   
    this.hideFields =false;
    //setValidators([Validators.required, Validators.maxLength(10), Validators.minLength(5)])
    this.consultantForm.get('consultant_mobile_number').setValidators([Validators.required]);
    this.consultantForm.get('consultant_mobile_number').updateValueAndValidity();
    this.consultantForm.get('rate').setValidators([Validators.required]);
    this.consultantForm.get('rate').updateValueAndValidity()
    this.consultantForm.get('visaType').setValidators([Validators.required]);
    this.consultantForm.get('visaType').updateValueAndValidity()
    this.consultantForm.get('city').setValidators([Validators.required]);
    this.consultantForm.get('city').updateValueAndValidity()
    this.consultantForm.get('state').setValidators([Validators.required]);
    this.consultantForm.get('state').updateValueAndValidity()
    
    this.consultantForm.get('ssn').setValidators( [Validators.required]);
    this.consultantForm.get('ssn').updateValueAndValidity()
    this.consultantForm.get('consultant_status').setValidators([Validators.required]);
    this.consultantForm.get('consultant_status').updateValueAndValidity()
    this.consultantForm.get('experience').setValidators([Validators.required]);
    this.consultantForm.get('experience').updateValueAndValidity()

    this.consultantForm.updateValueAndValidity()

   }
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
        this.consultantForm.reset();
        this.consultants = [...this.consultants];
        this.consultantDialog = false;
        this.consultant = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Consultant Updated', life: 3000 });
      }, err => {
        this.serverErrors = err;

      });
      // this.consultants[this.findIndexById(this.consultant.consultant_id)] = this.consultant;


    }
    else {


      this.consultantService.updateConsultant(this.consultantForm).subscribe(data => {
        this.consultantDialog = false;
        this.consultantForm.reset();
        this.successResult = data;
        this.consultants.unshift(data.consultant);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Consultant Created', life: 3000 });

        this.consultants = [...this.consultants];

        this.consultant = {};
      }, err => {
        this.serverErrors = err;

      });
      // this.consultant.consultant_id = this.createId();


    }



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
    this.num2 ='';
    this.consultantButton = "Update Consultant";
    this.serverErrors = {};
    this.selectTaxType = consultantObj.tax_type;
    this.selectedCity =  consultantObj.consultant_type;
    this.onChangeType(consultantObj.consultant_type);
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
  imagesPreviewResume(event) {
    this.loading = true;
    this.documentsup = false;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (_event: any) => {
        this.imageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name
        };
      };
      reader.readAsDataURL(event.target.files[0]);
      const formData = new FormData();
      formData.append("resume", event.target.files[0]);

      this.consultantService.storeDocument(formData).subscribe(
        (response) => {
          this.loading = false;
          this.documentsup = true;
          this.consultantForm.patchValue({
            resume: response.path,
            // formControlName2: myValue2 (can be omitted)
          });
        },
        (error) => {
          console.log(error)
          this.loading = false;
        }
      );
    }
  }
  imagesPreviewOtherDoc(event) {
    this.loading = true;
    this.documentsup = false;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (_event: any) => {
        this.imageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name
        };
      };
      reader.readAsDataURL(event.target.files[0]);
      const formData = new FormData();
      formData.append("otherDocument", event.target.files[0]);

      this.consultantService.storeDocument(formData).subscribe(
        (response) => {
          this.loading = false;
          this.documentsup = true;
          this.consultantForm.patchValue({
            otherDocument: response.path,
            // formControlName2: myValue2 (can be omitted)
          });
        },
        (error) => { console.log(error); this.loading = false; }
      );
    }
  }
  imagesPreviewWorkAuth(event) {
    this.loading = true;
    this.documentsup = false;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (_event: any) => {
        this.imageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name
        };
      };
      reader.readAsDataURL(event.target.files[0]);
      const formData = new FormData();
      formData.append("workAuthorization", event.target.files[0]);

      this.consultantService.storeDocument(formData).subscribe(
        (response) => {
          this.loading = false;
          this.documentsup = true;
          this.consultantForm.patchValue({
            workAuthorization: response.path,
            // formControlName2: myValue2 (can be omitted)
          });
        },
        (error) => { console.log(error); this.loading = false; }
      );
    }
  }


  confirmHunterStatus(event: Event, status, id: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure to Submit to Admin',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const formData = new FormData();
        formData.append("consultant_id", id);
        formData.append("user_status", status);

        this.consultantService.statusChangeConsultant(formData).subscribe(
          (response) => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Aproved' });
            this.consultants = response.consultants;
          },
          (error) => { console.log(error) }
        );


      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Rejected' });
      }
    });
  }

  confirm(event: Event, status, id: any) {
    let stats = 'Aprove';
    if (status == 'A') {
      stats = 'Aprove';
    }
    if (status == 'D') {
      stats = 'Remove';
    }
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure to ' + stats + '  Hotlist',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const formData = new FormData();
        formData.append("consultant_id", id);
        formData.append("admin_status", status);

        this.consultantService.statusChangeConsultant(formData).subscribe(
          (response) => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Aproved' });
            this.submissionfilter = 1;
            this.consultants = response.consultants;
          },
          (error) => { console.log(error) }
        );


      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Rejected' });
      }
    });
  }


  getColor(status: string, adminStatus: string) {
    if (status == 'not interested') {
      return "rgb(248, 215, 218)"
    }
    if (adminStatus == "A") {
      return "#d4edda"
    }

    if (adminStatus == "D") {
      if (localStorage.getItem('roles') == 'adminhunters' || localStorage.getItem('roles') == 'admin')
        return "#fff3cd"
    }

  }

}
