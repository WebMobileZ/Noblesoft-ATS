import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,Router, NavigationStart, Event, NavigationEnd } from '@angular/router';
import { FormGroup, FormControlName,Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { VendorService } from '../../services/vendor.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'user-cmp',

    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit{
  serverErrors = [];
  updateUser: FormGroup;
  timeout;
  routerChanged = false;
  success:boolean= false;
  user: Observable<object>;
  constructor(private userService: VendorService,private http: HttpClient,private route: ActivatedRoute,  private router: Router)
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

  async  ngOnInit() {

    this.user = this.userService.loadUser().pipe(
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

    this.userService.updateUser(this.updateUser,id).subscribe(
      (response) => {

        this.success =true;
     //   this.messageService.add({severity:'success', summary:'Your Profile Updated ', detail:'successfull'})
        this.router.navigate(['profile'])
      },
      error =>{
        this.success =false;
        this.serverErrors = error;
      },
      () => console.log('completed')
    );


  }
}
