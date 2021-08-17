import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VendorViewModel } from '../models/vendor/vendor';
import { VendorContact } from '../models/vendor/vendor-contact';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) { }

  loadUser():Observable <any> {
    return this.http.get(`${environment.api}/api/user-list/create`).pipe(
    );
  }

  updateUser(form,id): Observable<any> {
    return this.http.put(`${environment.api}/api/user-list/` + id, form.value);
  }

  saveVendor(vendorDetails: VendorViewModel,type:any) {
    return this.http.post(`${environment.api}/api/vendor-company-contacts`, {
      name: vendorDetails.vendor.name,
      contactName: vendorDetails.contact.name,
      contactMobile: vendorDetails.contact.mobile,
      contactEmail: vendorDetails.contact.email,
      ext: vendorDetails.contact.ext,
      type:type,
      linkedin_url: vendorDetails.vendor.linkedin_url,
      numberofemployees: vendorDetails.vendor.numberofemployees
    });
  }

  saveVendorContact(vendorId: any, vendorContact: VendorContact) {
    return this.http.post(`${environment.api}/api/contacts`, {
      vendor_company_id: vendorId,
      contactName: vendorContact.name,
      contactMobile: vendorContact.mobile,
      contactEmail: vendorContact.email
    });
  }

  getBenchUsers(): Observable<any> {
    return this.http.get(`${environment.api}/api/getBenchUsers`);
  }
}
