import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotfoundComponent } from './errors/notfound/notfound.component';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './admin/dashboard.module';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DashboardGaurdGuard } from './admin/dashboard-gaurd.guard';
import { ProfileComponent } from './admin/profile/profile.component';
import { PerformanceComponent } from './admin/performance/performance.component';
import { CalculatorPageComponent } from './admin/calculatorpage/calculatorpage.component';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard',  canActivate: [DashboardGaurdGuard], pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardGaurdGuard],
    children:[
      {
        path:'',
        loadChildren: () => import('./admin/dashboard.module').then(m => m.DashboardModule),
      }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [DashboardGaurdGuard],

  },
  {
    path: 'performance',
    component: PerformanceComponent,
    canActivate: [DashboardGaurdGuard],

  },
  {
    path: 'calculator',
    component: CalculatorPageComponent,
    canActivate: [DashboardGaurdGuard],

  },

  {
    path: 'consultants', canActivate: [DashboardGaurdGuard],
    loadChildren: () => import('./admin/consultants/consultants.module').then(m => m.ConsultantsModule),
  },
  {
    path: 'documents', canActivate: [DashboardGaurdGuard],

    loadChildren: () => import('./admin/documents/documents.module').then(m => m.DocumentsModule),
  },
  {
    path: 'submissions', canActivate: [DashboardGaurdGuard],

    loadChildren: () => import('./admin/submissions/submission.module').then(m => m.SubmissionModule),
  },
  {
    path: 'jobs', canActivate: [DashboardGaurdGuard],

    loadChildren: () => import('./admin/jobs/jobs.module').then(m => m.JobsModule),
  },
  {
    path: 'users', canActivate: [DashboardGaurdGuard],

    loadChildren: () => import('./admin/users/user.module').then(m => m.UserModule),
  },

];

@NgModule({
imports: [
  RouterModule.forRoot(routes,{
    useHash: true
  }),
  AuthModule,
  DashboardModule
],

exports: [RouterModule,AuthModule,DashboardModule]
})
export class AppRoutingModule { }
