import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';
import { RouterModule } from '@angular/router';
import { jobsRoutes } from  './jobs-routing.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonsModule, InputUtilitiesModule, InputsModule, MDBBootstrapModule } from 'angular-bootstrap-md';

import { CustomerService } from '../../customer.service';
import {AccordionModule} from 'primeng/accordion';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {BadgeModule} from 'primeng/badge';
import {InputMaskModule} from 'primeng/inputmask';
import {KeyFilterModule} from 'primeng/keyfilter';
import {DividerModule} from 'primeng/divider';
import {TooltipModule} from 'primeng/tooltip';
import {JobsListComponent} from './jobs-list/jobs-list.component';
import {JobsEditComponent} from './jobs-edit/jobs-edit.component';

import {EditorModule} from 'primeng/editor';
import {SplitterModule} from 'primeng/splitter';
import {PanelModule} from 'primeng/panel';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import {TimelineModule} from 'primeng/timeline';
import {PrimeVendorsComponent} from './prime-vendors/prime-vendors.component';
import {VendorsComponent} from './vendors/vendors.component';
import { StepsModule } from 'primeng/steps';
import {PartnersComponent} from './partners/partners.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

import {ChipsModule} from 'primeng/chips';


@NgModule({

  declarations: [JobsListComponent,JobsEditComponent,PrimeVendorsComponent,VendorsComponent,PartnersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(jobsRoutes),
    ButtonsModule,
    InputUtilitiesModule,NgxDocViewerModule,ChipsModule,
    InputsModule,
    FormsModule,
    AccordionModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    EditorModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    BadgeModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    InputMaskModule,
    KeyFilterModule,
    DividerModule,TooltipModule,SplitterModule,PanelModule,ChipModule,TagModule,TimelineModule,StepsModule,
    MDBBootstrapModule.forRoot()

  ],
  providers: [ MessageService, ConfirmationService,CustomerService,  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],

  exports: [
    RouterModule
  ]
})
export class JobsModule { }
