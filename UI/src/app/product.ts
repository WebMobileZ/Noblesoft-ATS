export interface Product {
  id?:string;
  code?:string;
  name?:string;
  lastname?:string;
  description?:string;
  price?:number;
  quantity?:number;
  inventoryStatus?:string;
  category?:string;
  image?:string;
  rating?:number;
}
export interface ConsultantDetail {
  consultant_id?: number;
  first_name?: string;
  last_name?: string;
  name?: string;
  consultant_email?: string;
  consultant_mobile_number?: string;
  technology_id?:number;
  technologies?; Technology:any;
  rate?: number;
  experience?: number;
  visaType?: string;
  city?: string;
  state?: string;
  willingLocation?: string;
  documentsCollected?: string;
  resource?: string;
  ssn?: string;
  bestContactNumber?: string;
  linkedInUrl?: string;
  skypeId?: string;
  availability?: string;
  priority?: string;
  comments?: string;
  note?: string;
  consultant_status?: string;
  admin_status?: string;
  user_status?: string;
  portal_status?: string;
  employeePortalAccess?: string;

  date?: string | Date;
  created_at?: string | Date;
}
