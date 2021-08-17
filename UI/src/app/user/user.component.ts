import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,Router, NavigationStart, Event, NavigationEnd } from '@angular/router';
import { FormGroup, FormControlName,Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {Message,MessageService} from 'primeng/api';
import { CustomerService } from '../customer.service';
import { tap } from 'rxjs/operators';
@Component({
    selector: 'user-cmp',
    providers: [MessageService,CustomerService],
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
  serverErrors = [];
  updateUser: FormGroup;
  timeout;
  routerChanged = false;
  user: Observable<object>;
  constructor(private CustomerService: CustomerService,private messageService: MessageService,private http: HttpClient,private route: ActivatedRoute,  private router: Router)
  {
    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {
        // Show loading indicator
        this.routerChanged = false;
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.timeout = setTimeout(() => {
          clearTimeout(this.timeout);
          this.routerChanged = true;
        }, 1000);
      }
    });

  }

    ngOnInit() {

    this.user = this.CustomerService.loadUser().pipe(
      tap(user => this.updateUser.patchValue(user))
    );


      this.updateUser = new FormGroup({
        'name': new FormControl(null, [Validators.required, Validators.minLength(5)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'id': new FormControl(null,[Validators.required]),
        'password': new FormControl(null),
        'out_look_pass': new FormControl(null),

      });
  }

  get name() { return this.updateUser.get('name'); }
  get email() { return this.updateUser.get('email'); }
   get password() { return this.updateUser.get('password'); }
   get id() { return this.updateUser.get('id'); }
   get out_look_pass() { return this.updateUser.get('out_look_pass'); }
  updateUserDetails(){
    let id = this.updateUser.get('id').value;
    this.http.put('${environment.api}/api/user-list/' + id, this.updateUser.value).subscribe(
      (response) => {

        this.messageService.add({severity:'success', summary:'Your Profile Updated ', detail:'successfull'})
        this.router.navigate(['profile'])
      },
      (error) => console.log(),
      () => console.log('completed')
    );
  }
}
