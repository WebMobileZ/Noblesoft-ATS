import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from '../../user/user.component';
import { PermissionGuard } from '../../core/guards/permission.guard';
import { UsersList } from '../../core/models/permissions';
const routes: Routes = [
  // { path: 'list', component: UserListComponent, outlet: 'users' },
  {
    path: '',
    component: UserIndexComponent,
    children: [
      {
        path: 'create', component: UserCreateComponent, canActivate: [PermissionGuard],
        data: {
          permission: UsersList.AllUser
        }
      },
      {
        path: 'edit/:id', component: UserEditComponent, canActivate: [PermissionGuard],
        data: {
          permission: UsersList.AllUser
        }
      },
      {
        path: 'delete', component: UserIndexComponent, canActivate: [PermissionGuard],
        data: {
          permission: UsersList.AllUser
        }
      },
      {
        path: 'list', component: UserListComponent, canActivate: [PermissionGuard],
        data: {
          permission: UsersList.AllUser
        }
      },
      {
        path: 'profile', component: UserComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
