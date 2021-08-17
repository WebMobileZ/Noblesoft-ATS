import { Routes } from '@angular/router';
import { ConsultantListComponent } from './consultant-list/consultant-list.component';

import {TechnologiesListComponent} from './technologies-list/technologies-list.component';
import {HotListComponent} from './hot-list/hot-list.component';
import { PermissionGuard } from '../../core/guards/permission.guard';
import { ConsultantsList } from '../../core/models/permissions';
import {ResumeSearchComponent} from './resume-search/resume-search.component';
export const consultantsRoutes: Routes = [
  {
    path: '',
    component: ConsultantListComponent
  },
  {
    path: 'list',
    component: ConsultantListComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ConsultantsList.consList
    }
  },
  {
    path: 'technologies',
    component: TechnologiesListComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ConsultantsList.TechnologiesList
    }
  },
  {
    path: 'hotlist',
    component: HotListComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ConsultantsList.HotList
    }
  },
  {
    path: 'resume-search',
    component: ResumeSearchComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ConsultantsList.ResumeSearch
    }
  }
];

