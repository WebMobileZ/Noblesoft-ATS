import { Routes } from '@angular/router';
import { SubmissionListComponent } from './submission-list/submission-list.component';

import { ClientsListComponent } from './clients-list/clients-list.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';

import { SubmissionCreateComponent } from './submission-create/submission-create.component';

import { PermissionGuard } from '../../core/guards/permission.guard';
import { VendorSubmissions,SubmissionList } from '../../core/models/permissions';

export const submissionRoutes: Routes = [
  {
    path: 'list',
    component: SubmissionListComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: SubmissionList.VendorSubmissionList
    }
  },

  {
    path: 'create',
    component: SubmissionCreateComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: SubmissionList.SubmissionCreate
    }
  },

  {
    path: 'clients',
    component: ClientsListComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: VendorSubmissions.ClientList
    }
  },
  {
    path: 'companies',
    component: CompaniesListComponent
  },
  {
    path: 'contacts',
    component: ContactsListComponent
  },
];

