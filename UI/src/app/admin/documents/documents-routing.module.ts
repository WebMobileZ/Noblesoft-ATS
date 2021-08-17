import { Routes } from '@angular/router';
import { DocumentListComponent } from './document-list/documents-list.component';
import { PermissionGuard } from '../../core/guards/permission.guard';
import { DocumentsList } from '../../core/models/permissions';
export const documentsRoutes: Routes = [
  {
    path: '',
    canActivate: [PermissionGuard],
    data: {
      permission: DocumentsList.Documents
    },
    component: DocumentListComponent
  },

  {
    path: 'list',
    canActivate: [PermissionGuard],
    data: {
      permission: DocumentsList.Documents
    },
    component: DocumentListComponent
  }
];

