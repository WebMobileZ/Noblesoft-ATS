import { Routes } from '@angular/router';

import {JobsListComponent} from './jobs-list/jobs-list.component';
import {JobsEditComponent} from './jobs-edit/jobs-edit.component';
import {PrimeVendorsComponent} from './prime-vendors/prime-vendors.component';
import {PartnersComponent} from './partners/partners.component';
import {VendorsComponent} from './vendors/vendors.component';
export const jobsRoutes: Routes = [
  {
    path: '',
    component:JobsListComponent
  },

  {
    path: 'list',
    component: JobsListComponent
  },
  {
    path: 'view/:id',
    component: JobsEditComponent
  },

  {
    path: 'primevendors',
    component: PrimeVendorsComponent
  },
  {
    path: 'vendors',
    component: VendorsComponent
  },
  {
    path: 'partners',
    component: PartnersComponent
  }


];

