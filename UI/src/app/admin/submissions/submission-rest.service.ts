import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from "../../../environments/environment";
import { HttpParams } from "@angular/common/http";
import { Consultant, Technology, HotList,Client,Contact,Submission,Job,PrimeVendor, Partner } from '../../customer';
@Injectable({
  providedIn: 'root'
})
export class SubmissionRestService {
  users: Array<{ id: number, name: string, email: string }> = [];
  constructor(private http: HttpClient) { }

  getConsultants(page: any): Observable<any> {
    const pagenumber: any = page.first / 20;
    let str: any;
    let actorList = page.filters;

    let params = new HttpParams();

    params = params.append('page', pagenumber);
    if (Object.keys(actorList).length) {
      if (actorList['consultant.consultatName'])
        params = params.append('consultatName', actorList['consultant.consultatName']['value']);
      for (let id in actorList) {

        params = params.append(id, actorList[id]['value']);
      }
    }
    const opts = { params: params };
    return this.http.get(`${environment.api}/api/submissions`, opts);

  }


  getMySubmissions(page: any): Observable<any> {
    const pagenumber: any = page.first / 20;
    let str: any;
    let actorList = page.filters;

    let params = new HttpParams();

    params = params.append('page', pagenumber);
    if (Object.keys(actorList).length) {

      if (actorList['consultant.consultatName'])
        params = params.append('consultatName', actorList['consultant.consultatName']['value']);
      for (let id in actorList) {

        params = params.append(id, actorList[id]['value']);
      }
    }
    const opts = { params: params };
    return this.http.get(`${environment.api}/api/getMySubmissions`, opts);

  }
  storeUser(form): Observable<any> {
    return this.http.post(`${environment.api}/api/submissions`, form.value);
  }

  storeClient(form): Observable<any> {
    return this.http.post(`${environment.api}/api/clients`, form.value);
  }
  updateSubmission(form, id): Observable<any> {
    return this.http.put(`${environment.api}/api/submissions/` + id, form.value);
  }
  storeVendor(form): Observable<any> {
    return this.http.post(`${environment.api}/api/vendorlist`, form.value);
  }
  storeContact(form): Observable<any> {
    return this.http.post(`${environment.api}/api/contactslist`, form.value);
  }


  getConsultantsList(): Observable<any> {
    return this.http.get(`${environment.api}/api/getConsultantsList`);
  }
  getConsultantsOnly(): Observable<any> {
    return this.http.get(`${environment.api}/api/getConsultantsOnly`);
  }

  editVenodr(id): Observable<any> {
    return this.http.get(`${environment.api}/api/contacts/` + id);
  }
  editConsultant(id): Observable<any> {
    return this.http.get(`${environment.api}/api/consultants/` + id);
  }



  SubmissionsFilter(page: any,consultantname,status,userid):any {


    const pagenumber: any = page.first / page.rows;
console.log(consultantname)
    let params = new HttpParams();

    params = params.append('page', pagenumber + 1);

      if (consultantname)
    params = params.append('consultantid', consultantname);
    if (status)
    params = params.append('status', status);
    if (userid)
    params = params.append('userId', userid);
    let actorList = page.filters;

    if (Object.keys(actorList).length) {


      for (let id in actorList) {

        params = params.append(id, actorList[id][0]['value']);
      }
    }
    const opts = { params: params };

    return this.http.get<any>(`${environment.api}/api/submissions`, opts)
      .toPromise()
      .then(res => <Submission[]>res.submissions)
      .then(data => { return data; });
  }

  getContactDetails(index): Observable<any> {

    return this.http.post(`${environment.api}/api/contactsDetails`, index);
  }
  getBenchUsers(): Observable<any> {
    return this.http.get(`${environment.api}/api/getBenchUsers`);
  }

}
