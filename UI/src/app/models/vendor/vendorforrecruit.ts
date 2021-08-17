import { VendorContact } from "./vendor-contact";

export class Vendor {
    constructor(public name: string,public vendorType: string,public linkedin_url: string,public numberofemployees:number) { }
}



export class VendorViewModelwithType {
  vendor: Vendor;
  contact: VendorContact;

  constructor(vendorType: string,name: string, contactName: string, contactMobile: string, contactEmail: string, contactExt: string,linkedin_url:string,numberofemployees:number) {
      this.vendor = new Vendor(name,vendorType,linkedin_url,numberofemployees);
      this.contact = new VendorContact(contactName, contactMobile, contactEmail, contactExt);
  }
}
