import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';
import { RouterModule } from '@angular/router';
import { consultantsRoutes } from  './consultants-routing.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonsModule, InputUtilitiesModule, InputsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { ConsultantListComponent } from './consultant-list/consultant-list.component';
import {TechnologiesListComponent} from './technologies-list/technologies-list.component';
import {HotListComponent} from './hot-list/hot-list.component';
import {ResumeSearchComponent} from './resume-search/resume-search.component';
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
import {CardModule} from 'primeng/card';
import { PermissionGuard } from '../../core/guards/permission.guard';
import { VendorSubmissions } from '../../core/models/permissions';
import { ConfirmPopupModule } from "primeng/confirmpopup";
import {EditorModule} from 'primeng/editor';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DataViewModule} from 'primeng/dataview';
import {ChipsModule} from 'primeng/chips';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ChipModule } from 'primeng/chip';
import {CheckboxModule} from 'primeng/checkbox';
import {SelectButtonModule} from 'primeng/selectbutton';
@NgModule({
  declarations: [ConsultantListComponent,TechnologiesListComponent,HotListComponent,ResumeSearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(consultantsRoutes),
    ButtonsModule,
    InputUtilitiesModule,NgxDocViewerModule,ChipModule ,CheckboxModule,SelectButtonModule,
    InputsModule,
    FormsModule,
    AccordionModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,ConfirmPopupModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    AutoCompleteModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    BadgeModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    InputMaskModule,
    KeyFilterModule,EditorModule,
    DividerModule,TooltipModule,CardModule,DataViewModule,ChipsModule,
    MDBBootstrapModule.forRoot()

  ],
  providers: [PermissionGuard, MessageService, ConfirmationService,CustomerService,  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],

  exports: [
    RouterModule
  ]
})
export class ConsultantsModule { }
