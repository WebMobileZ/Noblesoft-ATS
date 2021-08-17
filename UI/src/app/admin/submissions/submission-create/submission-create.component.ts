import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { SelectItemGroup } from 'primeng/api';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SubmissionRestService } from '../submission-rest.service';
import { VendorService } from '../../../services/vendor.service';
import { ClientService } from '../../../services/client.service';
import { VendorViewModel } from 'src/app/models/vendor/vendor';
import { VendorContact } from 'src/app/models/vendor/vendor-contact';

export class Profile {
  constructor(public prId: string, public prName: string) {
  }
}
@Component({
  selector: 'app-submission-create',
  templateUrl: './submission-create.component.html',
  providers: [MessageService],
  styleUrls: ['./submission-create.component.scss']
})
export class SubmissionCreateComponent implements OnInit {

  countries: any[];
  selectedCountry: string;
  cars: SelectItem[];
  states: SelectItem[];
  vendors: SelectItem[];
  contacts: SelectItem[]=[];
  clients: SelectItem[];
  selectedCar: SelectItem;
  selectedStates: SelectItem;
  selectedVendors: number;
  selectedContacts: SelectItem;
  selectedClients: number;
  str: string;
  counter = 0;
  totalNumberOfCars: number;
  formData: FormGroup;
  crate: any;
  cemail: any;
  cmobile: any;
  ctechnology: any;
  vmobile: any;
  vcname: any;
  serverErrors = [];
  imageFile: { link: string, file: any, name: string };
  registerForm: FormGroup;
  registerVendor: FormGroup;
  registerContact: FormGroup;
  registerForm1: FormGroup;
  displayModal: boolean;
  displayModal1: boolean;
  requirement:any[] = [];
  registerClient: FormGroup;
  defaultValue:string;
  displayModalClient: boolean;
  disabled:boolean=true;
  data: any[];
  vtype:any;
  cols: any[];
  primevendorValue:string;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private userRest: SubmissionRestService,
    private router: Router,
    private vendorService: VendorService,
    private clientService: ClientService) { }
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
  ngOnInit() {

    this.cols = [
      { field: 'consultant.name', header: 'Consultant Name', width: '20%', editable: false },
      { field: 'submissionStatus', header: 'Status', width: '20%', editable: false },
      { field: 'contact_list.companies.name', header: 'Company Name', width: '20%', editable: false },
      { field: 'contact_list.contactName', header: 'Contact Name', width: '20%', editable: false },
      { field: 'clients.name', header: 'End Client', width: '20%', editable: false },
      { field: 'actualRate', header: 'Actual Rate', width: '20%', editable: false },
    ];
    this.requirement = [

      { label: "Prime Vendor", value: "Prime Vendor" },
      { label: "Vendor", value: "Vendor" },
   //   { label: "Implementation Partner", value: "Implementation Partner" },

    ];
    this.userRest.getConsultantsList().subscribe(
      (response) => {
        this.states = response.submissions;
        this.vendors = response.vendorslist;
        this.clients = response.clients;
        this.data = response.data;
      },
      (error) => { console.log(error) }
    );
    this.cars = [
      { label: "Choose Technology", value: "" },
      { label: "AEM(Adobe Experience manger)", value: "AEM(Adobe Experience manger)" },
      { label: 'Android Developer', value: 'Android Developer' },
      { label: 'Business Analyst', value: 'Business Analyst' },
      { label: 'Business Intelligence', value: 'Business Intelligence' },
      { label: 'Data Analyst', value: 'Data Analyst' },
      { label: 'Database Administrator', value: 'Database Administrator' },
      { label: 'Devops Engineer', value: 'Devops Engineer' },
      { label: 'Dot net Developer', value: 'Dot net Developer' },
      { label: 'ETL Developer', value: "ETL Developer" },
      { label: 'Hadoop', value: "Hadoop" },
      { label: 'Hadoop Developer/Hadoop Admin', value: "Hadoop Developer/Hadoop Admin" },
      { label: 'IOS Developer', value: "IOS Developer" },
      { label: 'Java Developer', value: "Java Developer" },
      { label: 'Linux Admin', value: "Linux Admin" },
      { label: 'Mainframe Developer', value: "Mainframe Developer" },
      { label: 'Network Engineer', value: "Network Engineer" },
      { label: 'Oracle fusion developer', value: "Oracle fusion developer" },
      { label: 'PEGA', value: "PEGA" },
      { label: 'QA Tester/QA Analyst', value: "QA Tester/QA Analyst" },
      { label: 'SAP Hana', value: "SAP Hana" },
      { label: 'Salesforce', value: "Salesforce" },
      { label: 'Salesforce Admin', value: "Salesforce Admin" },
      { label: 'Salesforce Developer', value: "Salesforce Developer" },
      { label: 'Service now developer', value: "Service now developer" },
      { label: 'Tableau Developer', value: "Tableau Developer" },
      { label: 'UI Developer / Frontend Developer', value: "UI Developer / Frontend Developer" },
      { label: 'VOIP Engineer', value: "VOIP Engineer" },
      { label: 'others', value: "others" },
    ];
    this.totalNumberOfCars = this.cars.length;
    this.str = '';

    this.registerForm = new FormGroup({
      'actualRate': new FormControl('', [Validators.required]),
      'state': new FormControl('', [Validators.required]),
    //  'vendorStatus': new FormControl('', [Validators.required]),
      'vendorComments': new FormControl(''),
      'submissionRate': new FormControl('', [Validators.required]),
      'vid': new FormControl('', [Validators.required]),
      'vendorDetailId': new FormControl('', [Validators.required]),
      'endClientLocation': new FormControl('', [Validators.required]),
      'clientId': new FormControl('', [Validators.required]),
      'scheduleDate': new FormControl((new Date()).toISOString().substring(0,10)),
      'timezone': new FormControl('EST'),
    })

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
      'linkedin_url': new FormControl(''),
      'numberofemployees': new FormControl(''),
    });
    this.registerClient = new FormGroup({
      'clientName': new FormControl('', [Validators.required]),
    });
  }

  showModalDialog() {
    this.displayModal = true;
  }
  showModalDialogClient() {
    this.displayModalClient = true;
  }

  showModalDialog1() {
    this.registerContact.addControl('cvid', new FormControl(this.registerForm.value.vid, Validators.required));
    this.displayModal1 = true;
  }

  OnFocus() {
    if (this.cars.length > this.totalNumberOfCars) {
      this.cars.shift();

    }
  }

  OnBlur() {

  }

  test(event) {
    const charCode = event.keyCode;
    if (event.key === 'Enter') {
      this.selectedCar = this.cars.find(car => {
        return car.label.toLowerCase().includes(this.str.toLowerCase());
      });
      this.cars.unshift(this.selectedCar)
      this.str = '';
    } else if (event.key === 'Backspace') {
      this.str = this.str.replace(/.$/, "");
    } else if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 8) {
      this.str += event.key;
    }

  }

  onChange(event) {
    this.crate = '';
    this.cemail = '';
    this.cmobile = '';
    this.ctechnology = '';

    this.userRest.editConsultant(event.value).subscribe(
      (response) => {
        this.crate = response?.user?.rate;
        this.registerForm.patchValue({
          actualRate: response?.user?.rate,
          // formControlName2: myValue2 (can be omitted)
        });
        this.cemail = response?.user?.consultant_email;
        this.cmobile = response?.user?.consultant_mobile_number;
        this.ctechnology = response?.user?.technologies.name;

      },
      (error) => console.log(error)
    );
  }

  onSelectMethod(event) {
    let d = new Date(Date.parse(event));
    // = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
  }
  ChangeClients(event) {

    //   this.clients=[];
    /* this.userRest.editVenodr(event.value).subscribe(
       (response) => {
         this.contacts =  response.contacts;
       },
       (error) => console.log(error)
     ); */

  }
  ChangeVendor($event,refence) {
    this.primevendorValue =(refence.value?refence.label:'');
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
  ChangeContactsInner(value) {
    this.vmobile = '';
    this.vcname = '';
    const formData = new FormData();
    formData.append("index", value);
    this.userRest.getContactDetails(formData).subscribe(
      (response) => {

        this.vmobile = response.contactDetails.contactMobile
        this.vcname = response.contactDetails.contactName
      },
      (error) => console.log(error)
    );

  }
  ChangeContacts(event) {
    this.vmobile = '';
    this.vcname = '';
    const formData = new FormData();
    formData.append("index", event.value);
    this.userRest.getContactDetails(formData).subscribe(
      (response) => {

        this.vmobile = response.contactDetails.contactMobile
        this.vcname = response.contactDetails.contactName
      },
      (error) => console.log(error)
    );

  }
  vendorsUi(event) {
  }
  statesUi(event) {
    const charCode = event.keyCode;
    if (event.key === 'Enter') {
      this.selectedStates = this.states.find(car => {
        return car.label.toLowerCase().includes(this.str.toLowerCase());
      });
      this.states.unshift(this.selectedStates)
      this.str = '';
    } else if (event.key === 'Backspace') {
      this.str = this.str.replace(/.$/, "");
    } else if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 8) {
      this.str += event.key;
    }

  }
  get clientName() { return this.registerClient.get('clientName'); }
  get actualRate() { return this.registerForm.get('actualRate'); }
 // get vendorStatus() { return this.registerForm.get('vendorStatus'); }
  get vendorComments() { return this.registerForm.get('vendorComments'); }
  get submissionRate() { return this.registerForm.get('submissionRate'); }
  get state() { return this.registerForm.get('state'); }
  get vendorDetailId() { return this.registerForm.get('vendorDetailId'); }
  get vid() { return this.registerForm.get('vid'); }
  get clientId() { return this.registerForm.get('clientId'); }
  get endClientLocation() { return this.registerForm.get('vid'); }
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
  get scheduleDate() { return this.registerForm.get('scheduleDate'); }
  get timezone() { return this.registerContact.get('timezone'); }
  registerClientForm() {
    this.clientService.saveClient(this.clientName.value).subscribe(
      (response: any) => {
        // Push new Client detials to Clients list
        const { client_id: clientId, name: clientName } = response.client;
        this.clients.push({ label: clientName, value: clientId });

        // Set this vendor contact as selected item
        this.selectedClients = clientId;

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Client Added' });

        this.displayModalClient = false;
      },
      error => {
        this.serverErrors = error;
      }
    );
  }
  registerContactForm() {
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
      this.vcname =vendorContactName;
      this.vmobile = response.contact.contactMobile;
      // Set this vendor contact as selected item
      this.selectedContacts = vendorContactId;

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vendor Contact Details Added' });
      this.registerContact.reset();
      // Hide modal
      this.displayModal1 = false;
    }, error => this.serverErrors = error
    );
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

    this.vendorService.saveVendor(vendorDetails,this.vtype).subscribe((res: any) => {
      // Push new vendor details to vendors list
      const { vendor_company_id: vendorId, name: vendorName } = res.data;
      this.vendors.push({ label: vendorName, value: vendorId });

      // Set this vendor as selected item
      this.selectedVendors = vendorId;
      this.primevendorValue = vendorName;
      // Push new company contact detials to vendors contact details list
      const { vendor_company_contact_id: vendorContactId, contactName: vendorContactName } = res.data.contacts[0];
      this.contacts = [];
      this.contacts.push({ label: vendorContactName, value: vendorContactId });
      this.vcname =vendorContactName;
      this.vmobile = res.data.contacts[0].contactMobile
      // Set this vendor contact as selected item
      this.selectedContacts = vendorContactId;

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vendor Company Details Added' });
      this.registerVendor.reset();
      // Hide modal
      this.displayModal = false;
    }, error => {
      this.serverErrors = error
    });
  }
  registerUser() {


    //formData.append('myImageToSend', this.imageFile.file);


    this.userRest.storeUser(this.registerForm).subscribe(
      response => {
        this.registerForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Submission Completed' });
        this.data = response.data;

        this.crate = '';
        this.cemail = '';
        this.cmobile = '';
        this.ctechnology = '';
        this.vmobile = '';
        this.vcname = '';
        // this.router.navigate(['benchsales/list'])
      },
      error => {
        this.serverErrors = error
      }
    );
  }

}
