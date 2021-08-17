
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
import { Message } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConsultantListComponent } from '../consultant-list/consultant-list.component';
@Component({
  selector: 'app-hot-list',
  templateUrl: './hot-list.component.html',
  styleUrls: ['./hot-list.component.scss']
})
export class HotListComponent implements OnInit {
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

  ngOnInit() {
    this.consultantService.getHotlistConsultants().then(data => {
      this.hotlists = data;
      this.loading = false;
    });
    this.consultantService.getExportConsultants().then(data => this.selectedProducts = data);
    /*   this.consultantService.getOnlyTechnologies().then(technologies => {
         //this.technologies.push({ technology_id:0,name:'Choose Technology',created_at:'' });
         this.technologieslist=technologies;

         this.loading = false;
       }); */
    this.cols = [
      { field: 'first_name', header: 'Name' },
      { field: 'technology', header: 'Technology' },
      { field: 'experience', header: 'Experience' },
      { field: 'state', header: 'State' },
      { field: 'willingLocation', header: 'Relocate' },
      { field: 'visaType', header: 'VisaType' }
    ];

    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
    this.representatives = [
      { name: "CPT", image: 'amyelsner.png' },
      { name: "Anna Fali", image: 'annafali.png' },
      { name: "Asiya Javayant", image: 'asiyajavayant.png' },
      { name: "Bernardo Dominic", image: 'bernardodominic.png' },
      { name: "Elwin Sharvill", image: 'elwinsharvill.png' },
      { name: "Ioni Bowcher", image: 'ionibowcher.png' },
      { name: "Ivan Magalhaes", image: 'ivanmagalhaes.png' },
      { name: "Onyama Limba", image: 'onyamalimba.png' },
      { name: "Stephen Shaw", image: 'stephenshaw.png' },
      { name: "Xuxue Feng", image: 'xuxuefeng.png' }
    ];
    this.visatypes = [

      { name: "H4 EAD", value: 'H4 EAD' },
      { name: 'H1B-Transfer', value: 'H1B-Transfer' },
      { name: 'CPT', value: 'CPT' },
      { name: 'OPT', value: 'OPT' },
      { name: 'H1-B', value: 'H1-B' },
      { name: 'GC-EAD', value: 'GC-EAD' },
      { name: 'Green Card', value: 'Green Card' },
      { name: 'US Citizen', value: 'US Citizen' },
      { name: 'L2-EAD', value: 'L2-EAD' },
      { name: 'E3', value: 'E3' },
      { name: 'TN', value: 'TN' },
    ]
    this.techs = [

      { label: "AEM(Adobe Experience manger)", value: "AEM(Adobe Experience manger)" },
      { label: 'Android Developer', value: 'Android Developer' },
      { label: 'AS400', value: 'AS400' },
      { label: 'Business Analyst', value: 'Business Analyst' },
      { label: 'Business Intelligence', value: 'Business Intelligence' },
      { label: 'Cobol Developer', value: 'Cobol Developer' },
      { label: 'Cognos Developer', value: 'Cognos Developer' },
      { label: 'Data Analyst', value: 'Data Analyst' },
      { label: 'Database Administrator', value: 'Database Administrator' },
      { label: 'Devops Engineer', value: 'Devops Engineer' },
      { label: 'Dot net Developer', value: 'Dot net Developer' },
      { label: 'ETL Developer', value: "ETL Developer" },
      { label: 'Hadoop', value: "Hadoop" },
      { label: 'Hadoop Developer/Hadoop Admin', value: "Hadoop Developer/Hadoop Admin" },
      { label: 'IOS Developer', value: "IOS Developer" },
      { label: 'Informatica Developer', value: "Informatica Developer" },
      { label: 'Data Warehousing', value: "Data Warehousing" },
      { label: 'Python Developer', value: "Python Developer" },
      { label: 'Big Data Engineer', value: "Big Data Engineer" },
      { label: 'Data Scientist', value: "Data Scientist" },
      { label: 'SAP ABAP', value: "SAP ABAP" },
      { label: 'ETL Informatica Developer', value: "ETL Informatica Developer" },
      { label: 'Oracle Developer', value: "Oracle Developer" },
      { label: 'Oracle DBA', value: "Oracle DBA" },
      { label: 'Java Developer', value: "Java Developer" },
      { label: 'Linux Admin', value: "Linux Admin" },
      { label: 'Mainframe Developer', value: "Mainframe Developer" },
      { label: 'Network Engineer', value: "Network Engineer" },
      { label: 'Oracle fusion developer', value: "Oracle fusion developer" },
      { label: 'Oracle Pl/sql developer', value: "Oracle Pl/sql developer" },
      { label: 'PEGA', value: "PEGA" },
      { label: 'QA Tester/QA Analyst', value: "QA Tester/QA Analyst" },
      { label: 'SAP Hana', value: "SAP Hana" },
      { label: 'Salesforce', value: "Salesforce" },
      { label: 'Salesforce Admin', value: "Salesforce Admin" },
      { label: 'Salesforce Developer', value: "Salesforce Developer" },
      { label: 'Service now developer', value: "Service now developer" },
      { label: 'Project Manager', value: "Project Manager" },
      { label: 'Tableau Developer', value: "Tableau Developer" },
      { label: 'UI Developer / Frontend Developer', value: "UI Developer / Frontend Developer" },
      { label: 'VOIP Engineer', value: "VOIP Engineer" },
      { label: 'others', value: "others" },
    ];
  }

  exportPdf() {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default('p', 'pt');
        doc['autoTable'](this.exportColumns, this.selectedProducts);

        doc.save('webmobilez-hotlist.pdf');
      })
    })
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.selectedProducts);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "webmobilez-hotlist");
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
  clear(table: Table) {
    table.clear();

  }
}
