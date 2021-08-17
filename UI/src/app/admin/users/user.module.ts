import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRestService } from './user-rest.service';
import { ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';

import { DropdownModule } from 'primeng/dropdown';
import {InplaceModule} from 'primeng/inplace';
import { UserComponent } from '../../user/user.component';
import { PermissionGuard } from '../../core/guards/permission.guard';
import {CardModule} from 'primeng/card';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from "primeng/confirmpopup";
import {RatingModule} from 'primeng/rating';
import {ToggleButtonModule} from 'primeng/togglebutton';
@NgModule({
  declarations: [UserIndexComponent, UserCreateComponent, UserEditComponent,UserListComponent,UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule, TableModule, MultiSelectModule,RatingModule,ToggleButtonModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule,CardModule,ConfirmPopupModule,
    ProgressBarModule, TabMenuModule, TooltipModule, FileUploadModule, DropdownModule, FormsModule,InplaceModule
  ],
  providers: [
    UserRestService,PermissionGuard,ConfirmationService
  ]
})
export class UserModule { }
