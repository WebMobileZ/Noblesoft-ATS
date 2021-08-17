
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../../../auth/store/auth.reducers';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/app.reducers';
import { Customer, Representative, Consultant, Client, User,PrimeVendor } from "../../../customer";
import { CustomerService } from "../../../customer.service";
import { Table } from 'primeng/table';
import { ConsultantDetail } from '../../../product';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';

import { VendorService } from '../../../services/vendor.service';
import { ClientService } from '../../../services/client.service';
import { VendorViewModelwithType } from 'src/app/models/vendor/vendorforrecruit';
import { VendorContact } from 'src/app/models/vendor/vendor-contact';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-vendors-list',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  title = 'Webmobilez';
  isAuthnoticated: Observable<State>;
  clientsForm: FormGroup;
  companyForm:FormGroup;
  primevendors: PrimeVendor[];
  primevendor : PrimeVendor;
  statuses: any[];
  loading: boolean = true;
  submitted: boolean;
  technologyDialog: boolean;
  companydetailsDialog:boolean;
  msgs: Message[] = [];
  position: string;
  successResult: any;
  serverErrors: any;
  created_Client:string;
  requirement:any[] = [];
  userList:any[] = [];
  exportColumns: any[];
  cols: any[];
  selectedProducts: any[];
  constructor(private vendorService: VendorService,
    private clientService: ClientService,private messageService: MessageService, private confirmationService: ConfirmationService, private store: Store<AuthState>, private consultantService: CustomerService) {

  }

  get name() { return this.clientsForm.get('name'); }
  get vendorType() { return this.companyForm.get('vendorType'); }
  get vendorCompanyName() { return this.companyForm.get('vendorCompanyName'); }
  get contactName() { return this.companyForm.get('contactName'); }
  get contactMobile() { return this.companyForm.get('contactMobile'); }
  get contactEmail() { return this.companyForm.get('contactEmail'); }
  get ext() { return this.companyForm.get('ext'); }
  get linkedin_url() { return this.companyForm.get('linkedin_url'); }
  get numberofemployees() { return this.companyForm.get('numberofemployees'); }

  ngOnInit(): void {

    this.isAuthnoticated = this.store.select('authState');
    this.requirement = [
      { label: "Prime Vendor", value: "Prime Vendor" },
      { label: "Implementation Partner", value: "Implementation Partner" },
      { label: "Vendor", value: "Vendor" },


    ];
    this.clientsForm = new FormGroup({
     'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
     'linkedin_url': new FormControl('', [Validators.required]),
     'numberofemployees': new FormControl('')


    })
    this.companyForm = new FormGroup({
      'vendorType': new FormControl('', [Validators.required]),
      'vendorCompanyName': new FormControl('', [Validators.required]),
      'contactName': new FormControl('', [Validators.required]),
      'contactMobile': new FormControl('', [Validators.required]),
      'contactEmail': new FormControl('', [Validators.required, Validators.email]),
      'ext': new FormControl(''),
      'linkedin_url': new FormControl(''),
      'numberofemployees': new FormControl(''),
    });

this.getVendors();

this.cols = [
  { field: 'name', header: 'Company Name' },
  { field: 'contactName', header: 'Contact Name' },
  { field: 'contactEmail', header: 'Conatct Email' },
  { field: 'created_at', header: 'Created at' },
 
];

this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
this.consultantService.getAllExportVendors().then(data => this.selectedProducts = data);

this.consultantService.getUsers().subscribe(
  (response) => {
    // console.log(this.s tates = response.submissions);
    this.userList = response.users;
    // console.log( this.clients =  response1.clients);
  },
  (error) => { console.log(error) }
);
  }


getVendors()
{
  this.consultantService.getallVendors().then(primevendors => {
    this.primevendors = primevendors;
    this.loading = false;

  });
}
saveAsExcelFile(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}

exportPdf() {
  import("jspdf").then(jsPDF => {
    import("jspdf-autotable").then(x => {
      const doc = new jsPDF.default('p', 'pt');
      doc['autoTable'](this.exportColumns, this.selectedProducts);

      doc.save('webmobilez-prime-vendors.pdf');
    })
  })
}

exportExcel() {
  import("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(this.selectedProducts);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "webmobilez-prime-vendors");
  });
}
  clear(table: Table) {
    table.clear();
  }

  //create Consultant
  openNew() {
    this.created_Client ="Add Prime Vendor";
    this.companyForm.reset();
    this.primevendor = {};
    this.submitted = false;
    this.companydetailsDialog = true;
  }
  registerVendorCompany() {
    const vendorDetails: VendorViewModelwithType = new VendorViewModelwithType(
      this.vendorType.value,
      this.vendorCompanyName.value,
      this.contactName.value,
      this.contactMobile.value,
      this.contactEmail.value,
      this.ext.value,
      this.linkedin_url.value,
      this.numberofemployees.value,
      );
      if (this.companyForm.valid) {
        this.submitted = true;
      } else {
        this.submitted = false;
      }


    this.vendorService.saveVendor(vendorDetails, this.vendorType.value).subscribe((res: any) => {
      // Push new vendor details to vendors list
      this.primevendors.unshift(res.data);
      const { vendor_company_id: vendorId, name: vendorName } = res.data;

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vendor Company Details Added' });

      // Hide modal
      this.companydetailsDialog = false;
     this.primevendors = [...this.primevendors];
   // this.getVendors();
      this.primevendor = {};
    }, error => {
      this.serverErrors = error;
    });





  }
  updateConsultantDetails() {

    if (this.clientsForm.valid) {
      this.submitted = true;
    } else {
      this.submitted = false;
    }

    if (this.primevendor.vendor_company_id) {
      this.consultantService.updateVendor(this.clientsForm, this.primevendor.vendor_company_id).subscribe(data => {
        this.successResult = data;
        this.primevendors[this.findIndexById( data.primevendor.vendor_company_id)] = data.primevendor;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Prime Vendor Updated', life: 3000 });
      }, err => {
        this.serverErrors = err.error;
      });
      // this.consultants[this.findIndexById(this.consultant.consultant_id)] = this.consultant;


    }
    else {


      this.consultantService.storeVendor(this.clientsForm).subscribe(data => {
        this.clientsForm.reset();
        this.successResult = data;
        this.primevendors.unshift(data.primevendor);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Prime Vendor Created', life: 3000 });
        //  this.consultantForm.reset();

      }, err => {
        this.serverErrors = err.error;
      });
      // this.consultant.consultant_id = this.createId();


    }

    this.primevendors = [...this.primevendors];
    this.technologyDialog = false;
    this.primevendor = {};

  }
  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.primevendors.length; i++) {
      if (this.primevendors[i].vendor_company_id === id) {
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
  editProduct(consultantObj: PrimeVendor) {
    this.created_Client ="Update PrimeVendor";
    this.clientsForm.patchValue({ ...consultantObj });

    this.primevendor = { ...consultantObj };

     this.technologyDialog = true;
  }
  deleteProduct(consultantObj: PrimeVendor) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + consultantObj.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.primevendors = this.primevendors.filter(val => val.vendor_company_id !== consultantObj.vendor_company_id);
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
