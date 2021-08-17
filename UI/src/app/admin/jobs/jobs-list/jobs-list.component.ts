
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { State } from '../../../auth/store/auth.reducers';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/app.reducers';
import { Customer, Representative, Consultant, Technology, User, Job, Client, PrimeVendor, Partner,ConsultantExtraFileds } from "../../../customer";
import { CustomerService } from "../../../customer.service";
import { Table } from 'primeng/table';
import { ConsultantDetail } from '../../../product';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { RecruitmentList } from '../../../core/models/permissions';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SubmissionRestService } from '../../submissions/submission-rest.service';
import { VendorService } from '../../../services/vendor.service';
import { ClientService } from '../../../services/client.service';
import { VendorViewModel } from 'src/app/models/vendor/vendor';
import { VendorContact } from 'src/app/models/vendor/vendor-contact';

interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})

export class JobsListComponent implements OnInit {

  title = 'Webmobilez';
  isAuthnoticated: Observable<State>;
  jobsForm: FormGroup;
  consultantForm: FormGroup;
  statusconsultantForm: FormGroup;
  jobs: Job[];
  job: Job;
  consultant: Consultant;

  clients: Client[];
  states: any[];
  statuses: any[];
  loading: boolean = true;
  submitted: boolean;
  jobDialog: boolean;
  consultantDialog: boolean;
  consultants: any[];
  msgs: Message[] = [];
  position: string;
  successResult: any;
  serverErrors: any;
  jobStatus: any[];
  jobButton: string;
  visatypes: any[] = [];
  experiences: any[] = [];
  consultantstatuses: any[] = [];
  primevendors: any[];
  partners: any[];
  worktypes: any;
  selectedVisaType: any[] = [];
  requirement: any[] = [];
  rangeDates: Date[];
  defaultValue: any;
  AddJobButton: boolean = false;
  primevendorValue: string;
  registerVendor: FormGroup;
  registerContact: FormGroup;
  registerClient: FormGroup;
  displayModal: boolean;
  displayModal1: boolean;
  displayModalClient: boolean;
  selectedContacts: any;
  vmobile: any;
  vcname: any;
  contacts: any[] = [];
  selectedVendors: any;
  resumeDialog: boolean = false;
  doc: any;
  feedbackmodal: boolean;
  valuefeedback: any;
  taxtypes: any[];
  notename: any;
  consultantsstatus: any[];
  submissiontypes: any[];
  isHeadhunter: boolean = false;
  isHeadhunterAdmin: boolean = false;
  isRecruiter: boolean = false;
  isAdmin:boolean = false;
  technologyDialog: boolean;
  technologies: any[];
  technologiesForm: FormGroup;
  documentsup: boolean = true;
  imageFile: { link: string, file: any, name: string };
  experiencesstatus: any[] = [];
  priority: any[];
  resources: any[];
  ccmodaldialog: boolean;
  consultantstatusDialog: boolean;
  c2c_vendor_company_name: string;
  c2c_company_email: string;
  c2c_company_mobile_number: string;
  c2c_applicantname: string;
  employeeFilter:any =null;
  consultantFilter:any=null;
  filterStatus: any[] = [];
  statusofFilter:any ='Active';
  date7: Date;
  allemployees: any[] = [];
  allConsultants: any[] = [];
  editConsultantStatus(consultantObj: Consultant, jobid) {
    this.feedbackmodal = false;
    this.statusconsultantForm.patchValue({consultant_id:consultantObj.consultant_id });
      this.statusconsultantForm.patchValue({job_find_id:jobid });
     this.statusconsultantForm.patchValue({feedback:consultantObj.feedback });
     this.statusconsultantForm.patchValue({consultant_status:consultantObj.consultant_status });
     if(consultantObj.schedule_date)
     {
      this.statusconsultantForm.patchValue({schedule_date:new Date(consultantObj.schedule_date) });
     }

     this.statusconsultantForm.patchValue({timezone:consultantObj.timezone });
    this.consultantstatusDialog = true;
  }

  private formatDate1(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  showModalDialog() {
    this.displayModal = true;
  }
  showModalDialogClient() {
    this.displayModalClient = true;
  }
  openTechnology() {
    this.technologiesForm.reset();

    this.technologyDialog = true;
  }
  get name() { return this.technologiesForm.get('name'); }

  openDocNew(doc: any) {
    this.doc = 'https://apiv2.webmobilez.com/storage/app/uploads/resume/' + doc;

    this.resumeDialog = true;

  }
  showModalDialogc2c(bench: any) {
    this.c2c_applicantname = bench.first_name + ' ' + bench.last_name;
    this.c2c_vendor_company_name = bench.vendor_company_name;
    this.c2c_company_email = bench.company_email;
    this.c2c_company_mobile_number = bench.company_mobile_number;
    this.ccmodaldialog = true;
  }
  changeParentVendor() {

    this.selectedContacts = '';
  }
  ChangeVendor($event, refence) {
    this.selectedContacts = '';
    this.primevendorValue = (refence.value ? refence.label : '');
    this.vmobile = '';
    this.vcname = '';
    this.contacts = [];
    this.userRest.editVenodr($event.value).subscribe(
      (response) => {
        this.contacts = response.contacts

      },
      (error) => console.log(error)
    );


  }

 getContactVendor($value,contactId) {
    this.selectedContacts = '';

    this.userRest.editVenodr($value).subscribe(
      (response) => {
        this.contacts = response.contacts;
        this.selectedContacts =contactId;
        this.jobsForm.patchValue({ vendorDetailId: contactId });
      },
      (error) => console.log(error)
    );

  }
  registerContactForm() {

    if(this.selectedVendors)
    {

      const vendorCompany: VendorContact = new VendorContact(
        this.vendorcontactName.value,
        this.vendorcontactMobile.value,
        this.vendorcontactEmail.value,
        this.vendorext.value
      );
      this.vendorService.saveVendorContact(this.selectedVendors, vendorCompany).subscribe((response: any) => {
        // Push new company contact detials to vendors contact details list
        const { vendor_company_contact_id: vendorContactId, contactName: vendorContactName } = response.contact;
        this.contacts.push({ label: vendorContactName, value: vendorContactId });

        // Set this vendor contact as selected item
        this.selectedContacts = vendorContactId;

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vendor Contact Details Added' });

        // Hide modal
        this.displayModal1 = false;
      }, error => this.serverErrors = error
      );
    }else{
     alert("Select Vendor Company ")
    }

  }
  registerClientForm() {

  }
  registerVendorCompany() {
    const vendorDetails: VendorViewModel = new VendorViewModel(
      this.vendorCompanyName.value,
      this.contactName.value,
      this.contactMobile.value,
      this.contactEmail.value,
      this.ext.value,
      this.linkedin_url.value,
      this.numberofemployees.value,
      );

    this.vendorService.saveVendor(vendorDetails, this.jobsForm.value.defaultValue).subscribe((res: any) => {
      // Push new vendor details to vendors list
      //    const { vendor_company_id: vendor_company_id1, name: name1 } = res.data;
      if (res.data.vendor_type == 'P') {
        this.primevendors.push({ name: res.data.name, vendor_company_id: res.data.vendor_company_id });
      } else {
        this.partners.push({ name: res.data.name, vendor_company_id: res.data.vendor_company_id });
      }


      // Set this vendor as selected item
      this.selectedVendors = res.data.name;
      this.jobsForm.patchValue({ 'vendor_company_id': res.data.vendor_company_id })
      // Push new company contact detials to vendors contact details list
      const { vendor_company_contact_id: vendorContactId, contactName: vendorContactName } = res.data.contacts[0];
      this.contacts = [];
      this.contacts.push({ label: vendorContactName, value: vendorContactId });

      // Set this vendor contact as selected item
      this.selectedContacts = vendorContactId;

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vendor Company Details Added' });

      // Hide modal
      this.displayModal = false;
    }, error => {
      this.serverErrors = error;
    });
  }
  showModalDialog1() {
    this.registerContact.addControl('cvid', new FormControl('', Validators.required));
    this.displayModal1 = true;
  }
  getValue($event) {

    this.primevendorValue = $event.selectedOption.name;

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
  constructor(private userRest: SubmissionRestService, private vendorService: VendorService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, private store: Store<AuthState>, private consultantService: CustomerService) {

    this.consultantstatuses = [

      { label: "Interview Scheduled", value: "Interview Scheduled" },
      { label: "Submited to Client", value: "Submited Client" },
      { label: "Submited Prime Vendor", value: "Submited Prime Vendor" },
      { label: "Placed", value: "Placed" },
      { label: "Client rejected", value: "Client rejected" },
      { label: "Resume is not shortlisted", value: "Resume is not shortlisted" }

    ]
    this.visatypes = [

      { label: "H4 EAD", value: 'H4 EAD' },
      { label: "H1B-Transfer", value: 'H1B-Transfer' },
      { label: "CPT", value: 'CPT' },
      { label: "OPT", value: 'OPT' },
      { label: "H1-B", value: 'H1-B' },
      { label: "GC-EAD", value: 'GC-EAD' },
      { label: "Green Card", value: 'Green Card' },
      { label: "US Citizen", value: 'US Citizen' },
      { label: "L2-EAD", value: 'L2-EAD' }
    ];

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
    this.filterStatus = [
      { name: "Active", value: 'Active' },
      { name: "InActive", value: "InActive" },

    ];
    this.resources = [
      { name: "Choose Resource", value: '' },
      { name: "LinkedIn", value: 'LinkedIn' },
      { name: "Dice", value: "Dice" },
      { name: "Noukari", value: "Noukari" },
    ];
    this.worktypes = [
      { label: "Remote", value: "Remote" },
      { label: "Client Place", value: "Client Place" },
      { label: "Remote until COVID", value: "Remote until COVID" }

    ];
    this.experiences = [
      { label: "1", value: '1' },
      { label: "2", value: '2' },
      { label: "3", value: '3' },
      { label: "4", value: '4' },
      { label: "5", value: '5' },
      { label: "6", value: '6' },
      { label: "7", value: '7' },
      { label: "8", value: '8' },
      { label: "9", value: '9' },
      { label: "10", value: '10' },
      { label: "11", value: '11' },
      { label: "12", value: '12' },
      { label: "13", value: '13' },
      { label: "14", value: '14' },
      { label: "15", value: '15' },
      { label: "16", value: '16' },
      { label: "17", value: '17' },
      { label: "18", value: '18' },
      { label: "19", value: '19' },
      { label: "20", value: '20' },
      { label: "21", value: '21' },
      { label: "22", value: '22' },
      { label: "24", value: '24' },
      { label: "25", value: '25' },
      { label: "26", value: '26' },
      { label: "27", value: '27' },
      { label: "28", value: '28' },
      { label: "29", value: '29' },
      { label: "30", value: '30' },
    ];
    this.requirement = [
      { label: "Client", value: "Client" },
      { label: "Prime Vendor", value: "Prime Vendor" },
      { label: "Implementation Partner", value: "Implementation Partner" },

    ];
    this.statuses = [
      { label: "Active", value: "Active" },
      { label: "Deactive", value: "Deactive" }
    ];
  }
  get RecruitmentPermissions() {
    return RecruitmentList;
  }
  get job_title() { return this.jobsForm.get('job_title'); }
  get client_id() { return this.jobsForm.get('client_id'); }
  //get city() { return this.jobsForm.get('city'); }
  //get state() { return this.jobsForm.get('state'); }
  get vendorDetailId() { return this.jobsForm.get('vendorDetailId'); }
  get description() { return this.jobsForm.get('description'); }
  //get responsibilities() { return this.jobsForm.get('responsibilities'); }
  // get experience() { return this.jobsForm.get('experience'); }
  get client_bill_rate() { return this.jobsForm.get('client_bill_rate'); }
  get pay_rate() { return this.jobsForm.get('pay_rate'); }
  get w2_rate() {return this.jobsForm.get('w2_rate'); }
  get work_type() { return this.jobsForm.get('work_type'); }
  get visa_type() { return this.jobsForm.get('visa_type'); }
  get rangedates() { return this.jobsForm.get('rangedates'); }
  // get main_requirement() { return this.jobsForm.get('main_requirement'); }
  get assign_id() { return this.jobsForm.get('assign_id'); }
  get vendor_company_id() { return this.jobsForm.get('vendor_company_id'); }



  get clientName() { return this.registerClient.get('clientName'); }


  get vendorCompanyName() { return this.registerVendor.get('vendorCompanyName'); }
  get contactName() { return this.registerVendor.get('contactName'); }
  get contactMobile() { return this.registerVendor.get('contactMobile'); }
  get contactEmail() { return this.registerVendor.get('contactEmail'); }
  get ext() { return this.registerVendor.get('ext'); }
  get linkedin_url() { return this.registerVendor.get('linkedin_url'); }
  get numberofemployees() { return this.registerVendor.get('numberofemployees'); }

  get vendorcontactName() { return this.registerContact.get('vendorcontactName'); }
  get vendorcontactMobile() { return this.registerContact.get('vendorcontactMobile'); }
  get vendorcontactEmail() { return this.registerContact.get('vendorcontactEmail'); }
  get vendorext() { return this.registerContact.get('vendorext'); }

  //get timezone() { return this.registerContact.get('timezone'); }

  get tax_type() { return this.consultantForm.get('tax_type'); }
  get first_name() { return this.consultantForm.get('first_name'); }
  get last_name() { return this.consultantForm.get('last_name'); }
  get consultant_email() { return this.consultantForm.get('consultant_email'); }
  get visaType() { return this.consultantForm.get('visaType'); }
  get consultant_mobile_number() { return this.consultantForm.get('consultant_mobile_number'); }
  get technology_id() { return this.consultantForm.get('technology_id'); }
  get rate() { return this.consultantForm.get('rate'); }

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
  get schedule_date() { return this.consultantForm.get('schedule_date'); }
  get keywords() { return this.consultantForm.get('keywords'); }
  get feedback() { return this.consultantForm.get('feedback'); }
  get expected_rate() { return this.consultantForm.get('expected_rate'); }
  get mandatoryskills() { return this.jobsForm.get('mandatoryskills'); }
  searchConsultantbyUser($event)
  {
    this.loading = true;
    this.consultantFilter =null;
    this.consultantService.getJobswithparam(this.employeeFilter,this.consultantFilter,this.statusofFilter).then(jobs => {
      this.jobs = jobs;
      this.loading = false;

    });
  }
  searchConsultant($event)
  {
    this.loading = true;
    this.consultantService.getJobswithparam(this.employeeFilter,this.consultantFilter,this.statusofFilter).then(jobs => {
      this.jobs = jobs;
      this.loading = false;

    });
  }
  ngOnInit(): void {
    this.defaultValue = 'Client';
    if (localStorage.getItem('roles') == 'adminhunters' || localStorage.getItem('roles') == 'admin') {
      this.isAdmin = true;
    }
    this.consultantService.getTechnologies().then(technologies => {
      //this.technologies.push({ technology_id:0,name:'Choose Technology',created_at:'' });
      this.technologies = technologies;

    });
    this.consultantService.getHeadhunterUsers().then(users => {

      this.allemployees = users.filter(val => val.role == 'recruiter');

    });
    this.consultantService.getJobsConsultants().then(cons => {

      this.allConsultants = cons;

    });

    this.jobStatus = [

      { label: "Active", value: "Active" },
      { label: "InActive", value: "InActive" }

    ];

    if (localStorage.getItem('roles') == 'bdm' || localStorage.getItem('roles') == 'accountmanager' || localStorage.getItem('roles') == 'admin' ) {
      this.AddJobButton = true;
    }
    this.registerContact = new FormGroup({
      'vendorcontactName': new FormControl('', [Validators.required]),
      'vendorcontactMobile': new FormControl('', [Validators.required]),
      'vendorcontactEmail': new FormControl('', [Validators.required, Validators.email]),
      'vendorext': new FormControl('', [Validators.required]),
    });
    this.registerVendor = new FormGroup({
      'vendorCompanyName': new FormControl('', [Validators.required]),
      'contactName': new FormControl('', [Validators.required]),
      'contactMobile': new FormControl('', [Validators.required]),
      'contactEmail': new FormControl('', [Validators.required, Validators.email]),
      'ext': new FormControl('', [Validators.required]),
      'linkedin_url': new FormControl('', [Validators.required]),
      'numberofemployees': new FormControl('', [Validators.required]),
    });
    this.registerClient = new FormGroup({
      'clientName': new FormControl('', [Validators.required]),
    });
    this.technologiesForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
    })
    this.states = [

      { label: "Alabama", value: "Alabama" },
      { label: 'Alaska', value: 'Alaska' },
      { label: 'Arizona', value: 'Arizona' },
      { label: 'Arkansas', value: 'Arkansas' },
      { label: 'California', value: 'California' },
      { label: 'Colorado', value: 'Colorado' },
      { label: 'Connecticut', value: 'Connecticut' },
      { label: 'Delaware', value: "Delaware" },
      { label: 'District of Columbia', value: "District of Columbia" },
      { label: 'Florida', value: "Florida" },
      { label: 'Georgia', value: "Georgia" },
      { label: 'Hawaii', value: "Hawaii" },
      { label: 'Idaho', value: "Idaho" },
      { label: 'Illinois', value: "Illinois" },
      { label: 'Indiana', value: "Indiana" },
      { label: 'Iowa', value: "Iowa" },
      { label: 'Kansas', value: "Kansas" },
      { label: 'Kentucky', value: "Kentucky" },
      { label: 'Louisiana', value: "Louisiana" },
      { label: 'Maine', value: "Maine" },
      { label: 'Maryland', value: "Maryland" },
      { label: 'Michigan', value: "Michigan" },
      { label: 'Minnesota', value: "Minnesota" },
      { label: 'Mississippi', value: "Mississippi" },
      { label: 'Missouri', value: "Missouri" },
      { label: 'Montana', value: "Montana" },
      { label: 'Nebraska', value: "Nebraska" },
      { label: 'Nevada', value: "Nevada" },
      { label: 'New Hampshire', value: "New Hampshire" },
      { label: 'New Jersey', value: "New Jersey" },
      { label: 'New Mexico', value: "New Mexico" },
      { label: 'New York', value: "New York" },
      { label: 'North Carolina', value: "North Carolina" },
      { label: 'North Dakota', value: "North Dakota" },
      { label: 'Ohio', value: "Ohio" },
      { label: 'Oklahoma', value: "Oklahoma" },
      { label: 'Oregon', value: "Oregon" },
      { label: 'Pennsylvania', value: "Pennsylvania" },
      { label: 'Puerto Rico', value: "Puerto Rico" },
      { label: 'Rhode Island', value: "Rhode Island" },
      { label: 'South Carolina', value: "South Carolina" },
      { label: 'South Dakota', value: "South Dakota" },
      { label: 'Tennessee', value: "Tennessee" },
      { label: 'Texas', value: "Texas" },
      { label: 'Utah', value: "Utah" },
      { label: 'Vermont', value: "Vermont" },
      { label: 'Virginia', value: "Virginia" },
      { label: 'Washington', value: "Washington" },
      { label: 'West Virginia', value: "West Virginia" },
      { label: 'Wisconsin', value: "Wisconsin" },
      { label: 'Wyoming', value: "Wyoming" }
    ];

    this.consultantService.getUsers().subscribe(
      (response) => {
        // console.log(this.s tates = response.submissions);
        this.consultants = response.users;
        // console.log( this.clients =  response1.clients);
      },
      (error) => { console.log(error) }
    );

    this.isAuthnoticated = this.store.select('authState');

    this.jobsForm = new FormGroup({
      'job_title': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'client_id': new FormControl(null),
      'city': new FormControl(null,[Validators.required]),
      'state': new FormControl(null,[Validators.required]),
      'description': new FormControl(null),
      'experience': new FormControl(null,[Validators.required]),
      'client_bill_rate': new FormControl(null),
      'pay_rate': new FormControl(null),
      'w2_rate': new FormControl(null),
      'work_type': new FormControl(null),
      'visa_type': new FormControl(null),
      // 'responsibilities': new FormControl(null),
      'defaultValue': new FormControl(null),
      'rangedates': new FormControl(null),
      'vendor_company_id': new FormControl(null),
      'partner_id': new FormControl(null),
      'vendorDetailId': new FormControl(null),

      // 'main_requirement': new FormControl(null),
      'assign_id': new FormControl(null),
      'status': new FormControl(null),
      'mandatoryskills': new FormControl(null, [Validators.required]),

    })
    this.statusconsultantForm =new FormGroup({
      'job_find_id': new FormControl(null),
      'consultant_id': new FormControl(null),
      'schedule_date' :new FormControl(new Date()),
      'timezone' :new FormControl(''),
      'feedback' :new FormControl(''),
      'consultant_status': new FormControl(null),
    })



    this.taxtypes = [
      { label: "W2", value: 'W2' },
      { label: "C2C", value: "C2C" }];
    if (localStorage.getItem('roles') == 'head-hunters') {
      this.isHeadhunter = true;

      this.consultantsstatus = [


        { label: "Interview Scheduled", value: "Interview Scheduled" },
        { label: "Submited to Client", value: "Submited Client" },
        { label: "Submited Prime Vendor", value: "Submited Prime Vendor" },
        { label: "Placed", value: "Placed" },
        { label: "Client rejected", value: "Client rejected" },
        { label: "Resume is not shortlisted", value: "Resume is not shortlisted" }


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


        { label: "Interview Scheduled", value: "Interview Scheduled" },
        { label: "Submited to Client", value: "Submited Client" },
        { label: "Submited Prime Vendor", value: "Submited Prime Vendor" },
        { label: "Placed", value: "Placed" },
        { label: "Client rejected", value: "Client rejected" },
        { label: "Resume is not shortlisted", value: "Resume is not shortlisted" }
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


        { label: "Interview Scheduled", value: "Interview Scheduled" },
        { label: "Submited to Client", value: "Submited Client" },
        { label: "Submited Prime Vendor", value: "Submited Prime Vendor" },
        { label: "Placed", value: "Placed" },
        { label: "Client rejected", value: "Client rejected" },
        { label: "Resume is not shortlisted", value: "Resume is not shortlisted" }
      ];
      this.statuses = [
        { label: "Choose Status", value: '' },

        { label: "Interview Scheduled", value: "Interview Scheduled" },
        { label: "Submited to Client", value: "Submited Client" },
        { label: "Submited Prime Vendor", value: "Submited Prime Vendor" },
        { label: "Placed", value: "Placed" },
        { label: "Client rejected", value: "Client rejected" },
        { label: "Resume is not shortlisted", value: "Resume is not shortlisted" }

      ];

    }

    this.consultantForm = new FormGroup({
      'job_id': new FormControl(null),
      'tax_type': new FormControl('C2C'),
      'company_email': new FormControl(null, [Validators.email]),
      'company_mobile_number': new FormControl(null),
      'first_name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'last_name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'consultant_email': new FormControl(null, [Validators.required, Validators.email]),
      'consultant_mobile_number': new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'technology_id': new FormControl("", [Validators.required]),
      'rate': new FormControl(null, [Validators.required]),
      'expected_rate': new FormControl(null),
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
      'resume': new FormControl(null, [Validators.required]),
      'otherDocument': new FormControl(null),
      'schedule_date': new FormControl(new Date()),
      'workAuthorization': new FormControl(null),
      'vendor_company_name': new FormControl(null),
      'keywords': new FormControl(null),
      'feedback': new FormControl(null)

    })
    this.loading = true;
    this.consultantService.getJobs().then(jobs => {
      this.jobs = jobs;
      this.loading = false;

    });
    this.consultantService.getPrimeVendors().then(primevendors => {
      this.primevendors = primevendors;
      this.loading = false;

    });
    this.consultantService.getPartners().then(partners => {
      this.partners = partners;
      this.loading = false;

    });
    this.consultantService.getClients().then(clients => {
      this.clients = clients;
      this.loading = false;

    });

  }


  viewJob(id: number) {

    this.router.navigate(['jobs/view', id]);

  }

  clear(table: Table) {
    table.clear();
    this.loading = true;
    this.employeeFilter =null;
    this.consultantFilter = null;
    this.consultantService.getJobs().then(jobs => {
      this.jobs = jobs;
      this.loading = false;
    });

  }

  //create Consultant
  openNew() {
    this.feedbackmodal = false;
    this.jobButton = "Add Job";
    this.jobsForm.reset();

    this.job = {};
    this.submitted = false;
    this.jobDialog = true;
  }
  AddCandidate(job_id) {


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
  updateJobDetails() {

    if (this.jobsForm.valid) {
      this.submitted = true;
    } else {
      this.submitted = false;
    }

    if (this.job.job_id) {
      this.consultantService.updateJob(this.jobsForm, this.job.job_id).subscribe(data => {
        this.successResult = data;
        this.jobs[this.findIndexById(data.job.job_id)] = data.job;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Job Updated', life: 3000 });
      }, err => {
        this.serverErrors = err.error;
      });
      // this.consultants[this.findIndexById(this.consultant.consultant_id)] = this.consultant;


    }
    else {


      this.consultantService.storeJob(this.jobsForm).subscribe(data => {
        this.jobsForm.reset();
        this.successResult = data;
        this.jobs.unshift(data.job);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Job Created', life: 3000 });
        //  this.consultantForm.reset();

      }, err => {
        this.serverErrors = err.error;
      });
      // this.consultant.consultant_id = this.createId();


    }

    this.jobs = [...this.jobs];
    this.jobDialog = false;
    this.job = {};

  }
  updateSatusConsultantDetails() {

       this.consultantService.updateApplicantStatus(this.statusconsultantForm).subscribe(data => {
       let jobsdata:any= this.jobs[this.findIndexById(this.statusconsultantForm.value.job_find_id)].benchtalents;
        this.jobs[this.findIndexById(this.statusconsultantForm.value.job_find_id)].benchtalents[this.findIndexByBenchId( data.consultant?.consultant_id,jobsdata)] = data.consultant;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Status Updated', life: 3000 });

      }, err => {
        this.serverErrors = err.error;
      });





    this.consultantstatusDialog = false;


  }

  updateConsultantDetails() {

    if (this.consultantForm.valid) {
      this.submitted = true;
    } else {
      this.submitted = false;
    }

    if (this.consultant?.consultant_id) {
      this.consultantService.updateUser(this.consultantForm, this.consultant.consultant_id).subscribe(data => {
        this.successResult = data;

        let jobsdata: any = this.jobs[this.findIndexById(this.consultantForm.value.job_id)].benchtalents;
        this.jobs[this.findIndexById(this.consultantForm.value.job_id)].benchtalents[this.findIndexByBenchId(data.consultant.consultant_id, jobsdata)] = data.consultant;
        this.consultantForm.reset();
        //  this.consultants = [...this.consultants];
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
        this.successResult = data;
        this.jobs[this.findIndexById(this.consultantForm.value.job_id)].benchtalents.push(data.consultant);
        this.consultantForm.reset();
        // this.consultants.unshift(data.consultant);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Consultant Created', life: 3000 });
        //  this.consultants = [...this.consultants];
        this.consultant = {};
      }, err => {
        this.serverErrors = err;
      });
      // this.consultant.consultant_id = this.createId();


    }



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
  findIndexByBenchId(id: number, jobdata: any): number {
    let index = -1;
    for (let i = 0; i < jobdata.length; i++) {
      if (jobdata[i].consultant_id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i].job_id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  hideDialog() {

    this.feedbackmodal = false;
    this.jobDialog = false;
    this.submitted = false;
  }
  editJob(consultantObj: Job) {

    this.feedbackmodal = false;
    this.jobButton = "Update Job";


    if(consultantObj.vendor_company_id)
    {
      this.selectedVendors =consultantObj.vendor_company_id;

      this.getContactVendor(consultantObj.vendor_company_id,consultantObj.vendorDetailId);
    }

    if(consultantObj.vendorDetailId)
    {
      this.selectedContacts =consultantObj.vendorDetailId;
    }

    if (consultantObj.prime_vendor_id) {
      this.jobsForm.patchValue({ defaultValue: "Prime Vendor" });
    }
    if (consultantObj.partner_id) {
      this.jobsForm.patchValue({ defaultValue: "Implementation Partner" });
    }
    this.jobsForm.patchValue({ ...consultantObj });
    this.jobsForm.patchValue({ visa_type: consultantObj.visatype });

    this.job = { ...consultantObj };

    this.jobDialog = true;
  }

  editApplicant(consultantObj: Consultant, jobid) {
    this.feedbackmodal = false;
    if(consultantObj.schedule_date)
    this.consultantForm.patchValue({schedule_date:new Date(consultantObj.schedule_date) });
    delete consultantObj.schedule_date;
    this.consultantForm.patchValue({ ...consultantObj });
    //  this.consultantForm.patchValue({job_find_id:jobid });
    // this.consultantForm.patchValue({feedback:consultantObj.feedback });
   this.consultant = { ...consultantObj };
    this.consultantDialog = true;
  }
  AddApplicant(jobid) {
    this.feedbackmodal = false;
    this.consultantForm.reset();
    this.consultant ={};

    this.consultantForm.patchValue({ job_id: jobid });
    this.consultantDialog = true;
  }
  deleteProduct(consultantObj: Job) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + consultantObj.job_title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.jobs = this.jobs.filter(val => val.job_id !== consultantObj.job_id);
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

  showModalDialogFeedback(value: any, firstname: string, lastname: string) {
    this.notename = firstname + ' ' + lastname;
    this.feedbackmodal = true;
    this.valuefeedback = value
  }
  changeDilogClose() {
    this.feedbackmodal = false;
  }

  getColor(status: string, adminStatus: string) {
    if (status == 'Client rejected' || status == 'Resume is not shortlisted' ) {
      return "rgb(248, 215, 218)"
    }


  }
}
