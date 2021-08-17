import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardInterviewsComponent } from './dashboard-interviews/dasboard-interviews.component';
import { DashboardHeadHuntersComponent } from './dashboard-headhunters/dashboard-headhunters.component';
import { DashboardBenchsalesComponent } from './dashboard-benchsales/dashboard-benchsales.component';
import { DashboardPlacedCandidatesComponent } from './dashboard-placed-candidates/dashboard-placed-candidates.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { RouterModule } from '@angular/router';
import { dashBoardRoutes } from './dashboard-routing.module';
import { consultantsRoutes } from  './consultants/consultants-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonsModule, InputUtilitiesModule, InputsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { FooterComponent } from './layouts/common/footer/footer.component';
import { SidebarComponent } from './layouts/common/sidebar/sidebar.component';
import { NavbarComponent } from './layouts/common/navbar/navbar.component';
import {ChartModule} from 'primeng/chart';
import {CardModule} from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import {TabViewModule} from 'primeng/tabview';
import {DropdownModule} from 'primeng/dropdown';
import {DataViewModule} from 'primeng/dataview';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {BadgeModule} from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import {DialogModule} from 'primeng/dialog';
@NgModule({
  declarations: [DashboardComponent, NavbarComponent,DashboardBenchsalesComponent, DashboardPlacedCandidatesComponent,SidebarComponent,DashboardInterviewsComponent,DashboardHeadHuntersComponent, FooterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,CardModule,ChipModule,TabViewModule,DropdownModule,TableModule,
    RouterModule.forChild(dashBoardRoutes),
    ButtonModule,RippleModule,TagModule,
    ButtonsModule,
    InputUtilitiesModule,DialogModule,
    InputsModule,BadgeModule,
    FormsModule,ChartModule,
    MDBBootstrapModule.forRoot()

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardModule { }
