import { Component, ChangeDetectionStrategy, TemplateRef, OnInit, ViewChild, Output, EventEmitter,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRestService } from '../user-rest.service';
import { Customer, Representative } from '../../../customer';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';

import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-user-list',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('dt', { static: true }) table: Table;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  users: any[] = [];

  loading: boolean = true;
  roleFilterValues:any[]=[];
  roleFilter:any;
  position: string;
  constructor( private confirmationService: ConfirmationService,private fb: FormBuilder,private messageService: MessageService, private route: ActivatedRoute, private userRest: UserRestService,
     private router: Router) { }

  ngOnInit() {
    this.roleFilterValues=[
      { name: "Head Hunters", value: 'head-hunters' },
    { name: "Head Hunters Admin", value: 'adminhunters' },
    { name: "Sales Lead", value: 'sales-lead' },
    { name: "Bench sales Lead", value: 'bench-sales' },
    { name: "Account Manager", value: 'accountmanager' },
    { name: "BDM", value: 'bdm' },
    { name: "IT Recruiter", value: 'recruiter' },
    { name: "Bench sales", value: 'jr-bench-sales' }


 ];
    this.userRest.getUsers().subscribe(
      (response) => { this.users = response.user; this.loading = false; },
      (error) => { console.log(error) }
    );

  }
  searchUsers()
  {
    this.loading = true;
    this.userRest.getUsersFilter(this.roleFilter).subscribe(
      (response) => { this.users = response.user; this.loading = false; },
      (error) => { console.log(error) }
    );
  }
  deleteUser(id: number) {
    if(confirm("Are you sure to delete ")) {
      this.userRest.deleteUser(id).subscribe(
        (response) => console.log(),
        (error) => console.log(error)
      );
    }
  }

  editUser(id: number) {
    this.router.navigate(['users/edit',id]);
  }
  deleteProduct(event: Event,user: any) {

    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure you want to delete ' + user.name + '?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.userRest.deleteUser(user.id).subscribe(
          (response) => { this.messageService.add({ severity: 'success', summary: 'Successful', detail: user.name+' Temporary Deleted', life: 3000 });
        },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Fail', detail: user.name+' Temporary Deleted Fail', life: 3000 });
          }
        );
        this.users = this.users.filter(val => val.id !== user.id);
     //   //this.consultant = {};


      },
      reject: () => {
          this.messageService.add({severity:'error', summary:'Rejected', detail:'Rejected'});
      }
  });


  }
  confirmPosition(position: string) {
    this.position = position;

    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Successful Deleted', detail: 'Successful Deleted User', life: 3000 });
        //  this.msgs = [{severity:'info', summary:'Confirmed', detail:'Holtlisted'}];
      },
      reject: () => {
        //this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      },
      key: "positionDialog"
    });
  }

  getColor (status:string)
{
  if( status=="B")
  {
    //return "#d4edda"
    return "rgb(248, 215, 218)"
  }
}
}
