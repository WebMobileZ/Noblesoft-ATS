import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserRestService } from '../user-rest.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  updateUser: FormGroup;
  serverErrors = [];
  @Input() data:any;
  jrrecruiters: any[];
  jrritecruiters: any[];
  constructor(private route: ActivatedRoute, private userRest: UserRestService, private router: Router) { }

  ngOnInit() {
     let id = this.route.snapshot.params.id;
     this.userRest.editUser(id).subscribe(
      (response) => {
       // let assign= response.user.user_assign_jr;
        this.updateUser.patchValue({
          'name': response.user.name,
          'email':response.user.email,
          'role' :response.user.role,
          'assigns':response.assigns,
          'user_status':response.user.user_status,
          'performance':response.user.performance,
          'isResume':response.user.isResume,
        })
      },
      (error) => console.log(error)
    );




      this.userRest.getUsers().subscribe(
        (response) => {
          // console.log(this.s tates = response.submissions);
          this.jrrecruiters = response.user.filter(val => val.role == 'jr-bench-sales');
          this.jrritecruiters = response.user.filter(val => val.role == 'recruiter');
          // console.log( this.clients =  response1.clients);
        },
        (error) => { console.log(error) }
      );
      this.updateUser = new FormGroup({
        'name': new FormControl(null, [Validators.required, Validators.minLength(5)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null),
        'role': new FormControl(null,[Validators.required]),
        'assigns': new FormControl([]),
        'performance': new FormControl([]),
        'isResume' : new FormControl(false),
        'user_status': new FormControl(null),
      });
  }

  get name() { return this.updateUser.get('name'); }
  get email() { return this.updateUser.get('email'); }
   get password() { return this.updateUser.get('password'); }
   get assigns() { return this.updateUser.get('assigns'); }
   get role() { return this.updateUser.get('role'); }
   get user_status() { return this.updateUser.get('user_status'); }
   get performance() { return this.updateUser.get('performance'); }
  updateUserDetails(){
    let id = this.route.snapshot.params.id;
    this.userRest.updateUser(this.updateUser,id).subscribe(
      (response) => {

        this.router.navigate(['users/list'])
      },
      error =>{
        this.serverErrors = error;
      },
      () => console.log('completed')
    );
  }
}
