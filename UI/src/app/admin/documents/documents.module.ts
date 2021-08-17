import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';
import { RouterModule } from '@angular/router';
import { documentsRoutes } from  './documents-routing.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonsModule, InputUtilitiesModule, InputsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { DocumentListComponent } from './document-list/documents-list.component';

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
import { PermissionGuard } from '../../core/guards/permission.guard';
import {EditorModule} from 'primeng/editor';
import {ChipsModule} from 'primeng/chips';
import {CheckboxModule} from 'primeng/checkbox';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
@NgModule({
  declarations: [DocumentListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(documentsRoutes),
    ButtonsModule,
    InputUtilitiesModule,
    InputsModule,
    FormsModule,
    AccordionModule,ChipsModule,CheckboxModule,NgxDocViewerModule,
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
    DividerModule,TooltipModule,EditorModule,
    MDBBootstrapModule.forRoot()

  ],
  providers: [ PermissionGuard,MessageService, ConfirmationService,CustomerService,  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],

  exports: [
    RouterModule
  ]
})
export class DocumentsModule { }
