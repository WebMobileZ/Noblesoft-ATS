import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRestService } from '../user-rest.service';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  serverErrors = [];
  registerForm: FormGroup;
  jrrecruiters: any[];
  jrritecruiters: any[];
  constructor(private route: ActivatedRoute, private userRest: UserRestService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'role': new FormControl(null, [Validators.required]),
      'assigns': new FormControl(null),
      'password': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'confirm_password': new FormControl(null, [Validators.required, Validators.minLength(5)])
    });

    this.userRest.getUsers().subscribe(
      (response) => {
        // console.log(this.s tates = response.submissions);
        this.jrrecruiters = response.user.filter(val => val.role == 'jr-bench-sales');
        this.jrritecruiters = response.user.filter(val => val.role == 'recruiter');

        // console.log( this.clients =  response1.clients);
      },
      (error) => { console.log(error) }
    );

  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirm_password() { return this.registerForm.get('confirm_password'); }
  get role() { return this.registerForm.get('role'); }
  get assigns() { return this.registerForm.get('assigns'); }
  registerUser(){

      this.userRest.storeUser(this.registerForm).subscribe(
        response => {

          this.router.navigate(['users/list'])
        },
        error =>{
       
          this.serverErrors = error;
        }
      );
  }


}
