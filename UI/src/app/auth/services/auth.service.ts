import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<any>;
    public user: Observable<any>;
  constructor(private http: HttpClient) {

    this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
  }
  public get userValue(): any {
    return this.userSubject.value;
}
  getUser(form): Observable<any>{

    return this.http.post(`${environment.api}/register`,form.value);
  }

  getLogin(form): Observable<any>{
    localStorage.removeItem('user');
    this.userSubject.next(null);
    return this.http.post(`${environment.api}/api/login`,form.value).pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes

      this.userSubject.next(user);
      return user;
  }));
  }
  logOutUser(user_id):Observable<any>{
    localStorage.removeItem('user');
    this.userSubject.next(null);
    return this.http.post(`${environment.api}/api/logout`,{'user_id':user_id});
  }
}
