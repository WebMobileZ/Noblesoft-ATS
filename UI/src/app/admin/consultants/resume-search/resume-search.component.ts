
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../../../auth/store/auth.reducers';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/app.reducers';
import { Customer, Representative, Consultant, Technology, User, HotList } from "../../../customer";
import { CustomerService } from "../../../customer.service";
import { Table } from 'primeng/table';
import { ConsultantDetail } from '../../../product';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { LazyLoadEvent } from 'primeng/api';
@Component({
  selector: 'app-resume-search',
  templateUrl: './resume-search.component.html',
  styleUrls: ['./resume-search.component.scss']
})
export class ResumeSearchComponent implements OnInit {
  title = 'Webmobilez';
  isAuthnoticated: Observable<State>;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private store: Store<AuthState>, private consultantService: CustomerService) {

  }
  //hotlists: Consultant[];
  hotlists: any[];
  //selectedProducts: HotList[];
  selectedProducts: any[];
  technologieslist: Technology[];
  loading: boolean = true;
  cols: any[];
  techs: any[];
  visatypes: any[];
  exportColumns: any[];
  representatives: any[];
  filterkeyword: any;
  selectedCountry: any;
  countries: any[];
  filteredCountries: any[];
  selectedCountries: any[];
  selectedCountryAdvanced: any[];
  filteredGroups: any[];
  values: string[];
  valueswithTechnologies: string[];
  results: any[];
  consultantDialog: boolean;
  checked: boolean = false;

  viewer = 'google';
  selectedType = 'docx';
  visaTypes: any[];
  taxtypes: any[];
  selectedChecks: any[];
  experiencesstatus: any[];
  selectedCities: string[] = [];

  selectedExp: string[] = [];
  selectTax: string[] = [];
  techfilter: any;
  displayModal1: boolean;
  valuenote: any;
  lastLazyEvent:any;
  totalRecords: number;
  // doc = 'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.docx';
  // doc = 'https://files.fm/down.php?i=axwasezb&n=SSaD.docx';
  doc = '';

  loadData(event) {
    this.lastLazyEvent = event;
    this.loading = true;
    //event.first = First row offset
    //event.rows = Number of rows per page
    setTimeout(() => {
      this.consultantService.getResumeConsultants(event,this.values, this.techfilter,this.selectedCities,this.selectedExp['value'],this.selectTax).subscribe(
        (response) => {
          this.hotlists = response.hotlist.data;
         this.totalRecords = response.hotlist.total;
          this.loading = false;
        },
        (error) => { }
      );


    }, 1000);

}


  openDocNew(doc: any) {
    this.doc = 'https://apiv2.webmobilez.com/storage/app/uploads/resume/' + doc;
    this.consultantDialog = true;

  }

  onChange() {
  //  const latestCity = this.selectedCities[this.selectedCities.length - 1];
  //  this.selectedCities.length = 0;
   // this.selectedCities.push(latestCity);
   this.loading = true;
   this.consultantService.getHotlistConsultantswithkeyword(this.values, this.techfilter,this.selectedCities,this.selectedExp['value'],this.selectTax).subscribe(
    (response) => {
      this.hotlists = response.hotlist.data;
     this.totalRecords = response.hotlist.total;
      this.loading = false;
    },
    (error) => { }
  );

  }
  onChangeexp(event) {
   // const latestexp = this.selectedExp[this.selectedExp.length - 1];
    //this.selectedExp.length = 0;
    //this.selectedExp.push(latestexp);
    this.loading = true;
//console.log(this.selectedExp['value'])
    this.consultantService.getHotlistConsultantswithkeyword(this.values, this.techfilter,this.selectedCities,this.selectedExp['value'],this.selectTax).subscribe(
      (response) => {
        this.hotlists = response.hotlist.data;
       this.totalRecords = response.hotlist.total;
        this.loading = false;
      },
      (error) => { }
    );
  //

  //  this.selectedExp.length = 0;
   // this.selectedExp.push(latestexp);
  }
  onChangeTax() {
    this.loading = true;

    this.consultantService.getHotlistConsultantswithkeyword(this.values, this.techfilter,this.selectedCities,this.selectedExp['value'],this.selectTax).subscribe(
      (response) => {
        this.hotlists = response.hotlist.data;
       this.totalRecords = response.hotlist.total;
        this.loading = false;
      },
      (error) => { }
    );
   // const latestexp = this.selectTax[this.selectTax.length - 1];

   // this.selectTax.length = 0;
   // this.selectTax.push(latestexp);

  }
  ngOnInit() {
    this.loading = true;
   /* this.consultantService.getHotlistConsultants().then(data => {
      this.hotlists = data;
      this.loading = false;
    }); */
    // this.consultantService.getExportConsultants().then(data => this.selectedProducts = data);

    this.taxtypes = [
      { name: "W2", value: 'W2' },
      { name: "C2C", value: "C2C" }];
    this.visaTypes = [

      { name: "H4 EAD", value: "H4 EAD" },
      { name: "H1B-Transfer", value: "H1B-Transfer" },
      { name: "CPT", value: "CPT" },
      { name: "OPT", value: "OPT" },
      { name: "H1-B", value: "H1-B" },
      { name: "GC-EAD", value: "GC-EAD" },
      { name: "Green Card", value: "Green Card" },
      { name: "US Citizen", value: "US Citizen" }

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

    /*   this.consultantService.getOnlyTechnologies().then(technologies => {
         //this.technologies.push({ technology_id:0,name:'Choose Technology',created_at:'' });
         this.technologieslist=technologies;

         this.loading = false;
       }); */

    this.countries = [
      { "name": "Afghanistan", "code": "AF" },
      { "name": "Åland Islands", "code": "AX" },
      { "name": "Albania", "code": "AL" },
      { "name": "Algeria", "code": "DZ" },
      { "name": "American Samoa", "code": "AS" },
      { "name": "Andorra", "code": "AD" },
      { "name": "Angola", "code": "AO" },
      { "name": "Anguilla", "code": "AI" }
    ];



    this.consultantService.getTechnologies().then(technologies => {
      //this.technologies.push({ technology_id:0,name:'Choose Technology',created_at:'' });
      this.results = technologies;

    });

  }
  filterCountry(event) {

    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.results.length; i++) {
      let country = this.results[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
      this.loading = true;


    }

    this.filteredCountries = filtered;

  }
  /*searchConsultant(event: any) {

    if (event.target.value.length >= 3) {
      this.loading = true;


      this.consultantService.getHotlistConsultantswithkeyword(this.selectedCountries, '').then(data => {
        this.hotlists = data;
        this.messageService.clear();
        if (data.length) {
          ///this.messageService.add({ severity: 'info', summary: 'Documents Fecthed Successfully ', detail: 'Fecthed Records' });
        } else {
          // this.messageService.add({ severity: 'info', summary: 'Documents Fecthed Successfully ', detail: 'No Fecthed Records' });
        }
        this.loading = false;
      });
    } else {
      if (event.target.value.length <= 0) {
        this.consultantService.getHotlistConsultants().then(data => {

          this.hotlists = data;
          this.filterkeyword = '';
          this.loading = false;
        });
      } else {
        this.messageService.clear();
        //   this.messageService.add({ severity: 'error', summary: 'Keyword Must atleat 3 Characters', detail: 'Sorry' });
      }

    }

  } */
  searchConsultantChipsIds($event) {


    var ids = this.valueswithTechnologies.map(function (contact: any) {
      return contact.technology_id;
    });
    this.loading = true;

    this.consultantService.getHotlistConsultantswithkeyword(ids, this.techfilter,this.selectedCities,this.selectedExp['value'],this.selectTax).subscribe(
      (response) => {
        this.hotlists = response.hotlist.data;
       this.totalRecords = response.hotlist.total;
        this.loading = false;
      },
      (error) => { }
    );



  }
  searchConsultantChips($event) {

    this.loading = true;

    this.consultantService.getHotlistConsultantswithkeyword(this.values, this.techfilter,this.selectedCities,this.selectedExp['value'],this.selectTax).subscribe(
      (response) => {
        this.hotlists = response.hotlist.data;
       this.totalRecords = response.hotlist.total;
        this.loading = false;
      },
      (error) => { }
    );

  }

  calculateDiff(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }
  showModalDialog1(value: any) {

    this.displayModal1 = true;
    this.valuenote = value
  }

  clear() {

  this.loading = true;
  this.values =[];
  this.techfilter =[];
  this.selectedCities = [];
  this.selectedExp = [];
  this.selectTax = [];
    this.consultantService.getHotlistConsultantswithkeyword(this.values, this.techfilter,this.selectedCities,this.selectedExp,this.selectTax).subscribe(
      (response) => {
        this.hotlists = response.hotlist.data;
       this.totalRecords = response.hotlist.total;
        this.loading = false;
      },
      (error) => { }
    );

  }
}
