import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Consultant, Technology, HotList,Client,Contact,Submission,Job } from '../customer';
@Injectable({
  providedIn: 'root'
})
export class DashboarService {
  constructor(private http: HttpClient) { }
  // getUsers():Observable<any>{
  //   return this.http.get('http://localhost/php%20practice/adminDash/public/api/users');
  // }

  getUserDetails():Observable<any>{
    return this.http.get(`${environment.api}/api/profile`);
  }
  getUsers(): Observable<any> {
    return this.http.get(`${environment.api}/api/user-list`);
  }
  getUserLogsDetailsWithPagination(url: any):Observable<any>{
    return this.http.get(url);
  }

  logOutUser(user_id):Observable<any>{
    return this.http.post(`${environment.api}/api/logout`,{'user_id':user_id});
  }

  // updateProfile(profile, headers):Observable<any>{
  //     return this.http.post('http://localhost/php%20practice/adminDash/public/api/profile', profile, {
  //     headers: headers});
  // }

  updateProfile(profile):Observable<any>{
    return this.http.post(`${environment.api}/api/profile`, profile);
  }

  getTargets():Observable<any>{
    return this.http.get(`${environment.api}/api/getTargets`);
  }
  getJobs(params) {
    return this.http.get<any>(`${environment.api}/api/jobreports?value=`+params)
      .toPromise()
      .then(res => <any[]>res.jobs)
      .then(data => { return data; });
  }

  /* get Head hunter Reports */
  getSubmitConsultants(params,param1) {
    return this.http.get<any>(`${environment.api}/api/getSubmitConsultants?value=`+params+'&consulatnt='+param1)
      .toPromise()
      .then(res => <Consultant[]>res.aplicants)
      .then(data => { return data; });
  }
  getInterviewsConsultants(params,param1) {
    return this.http.get<any>(`${environment.api}/api/getInterviewsConsultants?value=`+params+'&consulatnt='+param1)
      .toPromise()
      .then(res => <Consultant[]>res.aplicants)
      .then(data => { return data; });
  }
    getMyHotlistConsultants():Observable<any>{
      return this.http.get(`${environment.api}/api/getMyHotlistConsultants`);
    }
 /* end get Head hunter Reports */
  getApplicantReports() {
    return this.http.get<any>(`${environment.api}/api/getApplicantReports`)
      .toPromise()
      .then(res => <Consultant[]>res.getaplicants)
      .then(data => { return data; });
  }
  getBenchtalentSubmissionReport() {
    return this.http.get<any>(`${environment.api}/api/getBenchtalentSubmissionReport`)
      .toPromise()
      .then(res => <Consultant[]>res.reports)
      .then(data => { return data; });
  }
  getTotalSubmissionsbyuser(params,param1):Observable<any>{
    return this.http.get(`${environment.api}/api/getTotalSubmissionsbyuser?date=`+params+'&value='+param1);
  }
  getActiveJobReportsforAdmin(params,param1):Observable<any>{
    return this.http.get(`${environment.api}/api/getActiveJobReportsforAdmin?date=`+params+'&value='+param1);
  }
  activeBenchTalents(params,param1):Observable<any>{
    return this.http.get(`${environment.api}/api/activeBenchTalents?date=`+params+'&value='+param1);
  }
  activeBenchSales(params,param1):Observable<any>{
    return this.http.get(`${environment.api}/api/activeBenchSales?date=`+params+'&value='+param1);
  }

  getPlacedCandidates():Observable<any>{
    return this.http.get(`${environment.api}/api/getPlacedCandidates`);
  }
  getBenchsalesInterviewreports(params,param1):Observable<any>{
    return this.http.get(`${environment.api}/api/getBenchsalesInterviewreports?date=`+params+'&value='+param1);
  }

  getInterviewreports(param1):Observable<any> {
    return this.http.get<any>(`${environment.api}/api/getInterviewreports?value=`+param1);
  }
}
