import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultant, Technology, HotList, Client, Contact, Submission, Job, PrimeVendor, Partner } from './customer';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from "@angular/common/http";
import { ConsultantListComponent } from './admin/consultants/consultant-list/consultant-list.component';
@Injectable()
export class CustomerService {
  constructor(private http: HttpClient) { }
  loadUser(): Observable<any> {
    return this.http.get(`${environment.api}/user-list/create`).pipe(
    );
  }
  getUsers(): Observable<any> {
    return this.http.get(`${environment.api}/api/getUsers`);
  }
  getCustomersLarge() {
    return this.http.get<any>(`${environment.api}/api/consultants`)
      .toPromise()
      .then(res => <Consultant[]>res.consultants)
      .then(data => { return data; });
  }
  getConsultantListFilters(mysubmission, status, hotlist, userid,techfilter,hotlistfilter) {

    return this.http.get<any>(`${environment.api}/api/consultants?mysubmissions=` + mysubmission + '&status=' + status + '&hotlist=' + hotlist + '&userId=' + userid +'&technology_id='+techfilter+'&admin_status='+hotlistfilter)
      .toPromise()
      .then(res => <Consultant[]>res.consultants)
      .then(data => { return data; });
  }
  getDocumentConsultants() {
    return this.http.get<any>(`${environment.api}/api/documentsconsultants`)
      .toPromise()
      .then(res => <Consultant[]>res.consultants)
      .then(data => { return data; });
  }
  getHotlistConsultants() {
    return this.http.get<any>(`${environment.api}/api/getHotListOnly`)
      .toPromise()
      .then(res => <any[]>res.hotlist)
      .then(data => { return data; });
  }
  getResumeConsultantswithoutkeys() {

    return this.http.get<any>(`${environment.api}/api/getHotListKeyword`)
      .toPromise()
      .then(res => <any[]>res.hotlist)
      .then(data => { return data; });

  }
  getResumeConsultants(page: any, param1, filterbytech,filterbyvisa,filterbyexp,filterbytax): Observable<any> {


    const pagenumber: any = page.first / page.rows;

    let params = new HttpParams();

    params = params.append('page', pagenumber + 1);
    if (param1)
      params = params.append('param', param1.join(', '));
      if (filterbytech)
    params = params.append('technology', filterbytech);
    if (filterbyvisa)
    params = params.append('visaType', filterbyvisa);
    if (filterbyexp)
    params = params.append('experience', filterbyexp);
    if (filterbytax)
    params = params.append('tax_type', filterbytax);

    const opts = { params: params };
    return this.http.get(`${environment.api}/api/getHotListKeyword`, opts);
    // const pagenumber:any =page.first/20;



    //this.http.get(`${environment.api}/submissions`,  params);
    //  return this.http.get(`${environment.api}/submissions?page=`+pagenumber+'filters'+);
  }
  getHotlistConsultantswithkeyword(param1, filterbytech,filterbyvisa,filterbyexp,filterbytax): Observable<any> {
    //  let params = new HttpParams();
    //params = params.append('param', param1.join(', '));
    //params = params.append('param', filterbytech);
    const pagenumber: any = 1;
    let params = new HttpParams();
    params = params.append('page', pagenumber);
    if (param1)
      params = params.append('param', param1.join(', '));
      if (filterbytech)
    params = params.append('technology', filterbytech);
    if (filterbyvisa)
    params = params.append('visaType', filterbyvisa);
    if (filterbyexp)
    params = params.append('experience', filterbyexp);
    if (filterbytax)
    params = params.append('tax_type', filterbytax);

    return this.http.get(`${environment.api}/api/getHotListKeyword`, { params: params });
    /*  return this.http.get<any>(`${environment.api}/api/getHotListKeyword`, { params: params})
        .toPromise()
        .then(res => <any[]>res.hotlist)
        .then(data => { return data; });*/
  }

  getExportConsultants() {
    return this.http.get<any>(`${environment.api}/api/getExportHotList`)
      .toPromise()
      .then(res => <any[]>res.exportlist)
      .then(data => { return data; });
  }
  getExportPrimeVendors() {
    return this.http.get<any>(`${environment.api}/api/getExportPrimeVendors`)
      .toPromise()
      .then(res => <any[]>res.exportlist)
      .then(data => { return data; });
  }
  getAllExportVendors() {
    return this.http.get<any>(`${environment.api}/api/getAllExportVendors`)
      .toPromise()
      .then(res => <any[]>res.exportlist)
      .then(data => { return data; });
  }
  
  getTechnologies() {
    return this.http.get<any>(`${environment.api}/api/technologies`)
      .toPromise()
      .then(res => <Technology[]>res.technologies)
      .then(data => { return data; });
  }
  getOnlyTechnologies() {
    return this.http.get<any>(`${environment.api}/api/getOnlyTechnologies`)
      .toPromise()
      .then(res => <Technology[]>res.technologies)
      .then(data => { return data; });
  }

  getConsultantsDetails(): Observable<Consultant> {
    return this.http.get<Consultant>(`${environment.api}/api/consultants`);
  }

  updateConsultant(profile): Observable<any> {
    return this.http.post(`${environment.api}/api/consultants`, profile.value);
  }
  updateUser(form, id): Observable<any> {
    return this.http.put(`${environment.api}/api/consultants/` + id, form.value);
  }
  updateTechnology(form, id): Observable<any> {
    return this.http.put(`${environment.api}/api/technologies/` + id, form.value);
  }
  storeTechnology(form): Observable<any> {
    return this.http.post(`${environment.api}/api/technologies`, form.value);
  }


  updateClient(form, id): Observable<any> {
    return this.http.put(`${environment.api}/api/clients/` + id, form.value);
  }

  getClients() {
    return this.http.get<any>(`${environment.api}/api/clients`)
      .toPromise()
      .then(res => <Client[]>res.clients)
      .then(data => { return data; });
  }
  storeClient(form): Observable<any> {
    return this.http.post(`${environment.api}/api/clients`, form.value);
  }

  updateCompany(form, id): Observable<any> {
    return this.http.put(`${environment.api}/api/companies/` + id, form.value);
  }
  getCompanies() {
    return this.http.get<any>(`${environment.api}/api/companies`)
      .toPromise()
      .then(res => <Client[]>res.companies)
      .then(data => { return data; });
  }
  storeCompany(form): Observable<any> {
    return this.http.post(`${environment.api}/api/companies`, form.value);
  }

  updateContact(form, id): Observable<any> {
    return this.http.put(`${environment.api}/api/contacts/` + id, form.value);
  }
  getContacts() {
    return this.http.get<any>(`${environment.api}/api/contacts`)
      .toPromise()
      .then(res => <Contact[]>res.contacts)
      .then(data => { return data; });
  }
  storeContact(form): Observable<any> {
    return this.http.post(`${environment.api}/api/contacts`, form.value);
  }
  getSubmissions() {
    return this.http.get<any>(`${environment.api}/api/submissions`)
      .toPromise()
      .then(res => <Submission[]>res.submissions.data)
      .then(data => { return data; });
  }
  updateSubmission(form, id): Observable<any> {
    return this.http.put(`${environment.api}/api/submissions/` + id, form.value);
  }
  getJobswithparam(userId,consultantId,status) {
    return this.http.get<any>(`${environment.api}/api/jobs?userId=`+userId+`&consultant_id=`+consultantId+`&status=`+status)
      .toPromise()
      .then(res => <Job[]>res.jobs)
      .then(data => { return data; });
  }
  getJobs() {
    return this.http.get<any>(`${environment.api}/api/jobs`)
      .toPromise()
      .then(res => <Job[]>res.jobs)
      .then(data => { return data; });
  }
  updateJob(form, id): Observable<any> {
    return this.http.put(`${environment.api}/api/jobs/` + id, form.value);
  }
  storeJob(form): Observable<any> {
    return this.http.post(`${environment.api}/api/jobs`, form.value);
  }
  editJob(id): Observable<any> {
    return this.http.get(`${environment.api}/api/jobs/` + id);
  }
  getUserAssignJobs() {
    return this.http.get<any>(`${environment.api}/api/getUserAssignJobs`)
      .toPromise()
      .then(res => <Job[]>res.jobs)
      .then(data => { return data; });
  }
  getHeadhunterUsers() {
    return this.http.get<any>(`${environment.api}/api/getHeadhunterUsers`)
      .toPromise()
      .then(res => <any[]>res.users)
      .then(data => { return data; });
  }
  getJobsConsultants() {
    return this.http.get<any>(`${environment.api}/api/getJobsConsultants`)
      .toPromise()
      .then(res => <any[]>res.data)
      .then(data => { return data; });
  }
  updatePrimeVendor(form, id): Observable<any> {
    return this.http.put(`${environment.api}/api/prime-vendors/` + id, form.value);
  }
  getPrimeVendors() {
    return this.http.get<any>(`${environment.api}/api/prime-vendors`)
      .toPromise()
      .then(res => <PrimeVendor[]>res.primevendors)
      .then(data => { return data; });
  }
  storePrimeVendor(form): Observable<any> {
    return this.http.post(`${environment.api}/api/prime-vendors`, form.value);
  }

  updateVendor(form, id): Observable<any> {
    return this.http.put(`${environment.api}/api/vendors/` + id, form.value);
  }
  getallVendors() {
    return this.http.get<any>(`${environment.api}/api/vendors`)
      .toPromise()
      .then(res => <PrimeVendor[]>res.primevendors)
      .then(data => { return data; });
  }
  storeVendor(form): Observable<any> {
    return this.http.post(`${environment.api}/api/vendors`, form.value);
  } 

  updatePartner(form, id): Observable<any> {
    return this.http.put(`${environment.api}/api/partners/` + id, form.value);
  }
  getPartners() {
    return this.http.get<any>(`${environment.api}/api/partners`)
      .toPromise()
      .then(res => <Partner[]>res.partners)
      .then(data => { return data; });
  }
  storePartner(form): Observable<any> {
    return this.http.post(`${environment.api}/api/partners`, form.value);
  }

  getVendors() {
    return this.http.get<any>(`${environment.api}/api/companies`)
      .toPromise()
      .then(res => <any[]>res.companies)
      .then(data => { return data; });
  }

  storeDocument(document): Observable<any> {

    return this.http.post(`${environment.api}/api/saveDocument`, document);
  }
  removeFile(document): Observable<any> {

    return this.http.post(`${environment.api}/api/removeDocument`, document);
  }

  updateApplicantStatus(form): Observable<any> {
    return this.http.post(`${environment.api}/api/statusChange`, form.value);
  }

  statusChangeConsultant(index): Observable<any> {

    return this.http.post(`${environment.api}/api/status-consultant-hotlist`, index);
  }


  getConsultantSubmissions(consultantId: number) {
    return this.http.get<any>(`${environment.api}/api/submissions/${consultantId}`);
  }
  updateConsultantStatus(form, id): Observable<any> {
    return this.http.put(`${environment.api}/api/consultants/` + id, form.value);
  }

  emailsent(form): Observable<any> {
    return this.http.post(`${environment.api}/api/emailsent`, form.value);
  }
  editVenodr(id): Observable<any> {
    return this.http.get(`${environment.api}/api/contacts/` + id);
  }

  getContactDetails(index): Observable<any> {

    return this.http.post(`${environment.api}/api/contactsDetails`, index);
  }
}
