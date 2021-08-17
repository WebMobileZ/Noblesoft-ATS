import { Component, OnInit } from '@angular/core';
import { DashboarService } from '../dashboar.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/store/app.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Consultant, Job } from 'src/app/customer';
import { UsersList, DocumentsList } from '../../core/models/permissions';
import { UserProfileService } from '../../services/user-profile-service';
interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profileData: FormGroup;
  profilePic: any;
  token = localStorage.getItem('token');
  userDetails: any;
  successResult: any;
  serverErrors: any;
  data: any;
  data1: any;
  potal: any;
  options: any;
  products: any[];
  jobs: Job[];
  applicants: Consultant[];
  benchJobapplicants:any;
  hunterconsultants: Consultant[];
  benchtalents: Consultant[];
  consultants: UsersList[];
  allApplicants: Consultant[];
  loading: boolean;
  myDate = new Date();
  dailysubmissions: number;
  qualitysubmissions: number;
  activebench: number;
  submissions: number;
  myinterviews: number;
  placed: number;
  cities: City[];
  interviewDropDown: any[];
  role: string;
  selectManager: any;
  selectBenchTalent: any;
  selectBenchSales:any;
  activeBenchTalents:any[] = [];
  activeBenchSales:any[] = [];
  activeJobswithUsers: any[] = [];

  assignUsers:any[] = [];
  selectedAssignusers: any;

  totalsubmissionsbyuser: any;
  selectedCity: City;
  selectedBenchsaleActivity:any;
  getMyhotlistConsultants:any[]=[];
  pendinghotlist:any[]=[];
  benchsalesInterviews:any[]=[];
  selectInterviewBenchTalent:any;
benchsalesFilterbymonth:any;
  selectedConsultant: Consultant;
  interviewjobsschedules:Consultant[] =[];
  displayBasic2: boolean ;


  constructor(private authService: DashboarService,
    private router: Router,
    private store: Store<AuthState>,
    private http: HttpClient
  ) {

    this.cities = [
      { name: 'Today', code: '1' },
      { name: 'Yesterday', code: '2' },
      { name: 'Last Week', code: '3' },
      { name: 'Last Month', code: '4' },

    ];
    this.interviewDropDown = [
      { name: 'Today', code: '1' },
      { name: 'Yesterday', code: '5' },
      { name: 'Tomorrow', code: '2' },
      { name: 'Next Week', code: '3' },
      { name: 'Last Week', code: '4' },
      { name: 'Last Month', code: '6' },
    ];
    this.data1 = {
      labels: ['Java Developer', 'Pythod', 'C++ Developer', 'Hadoop', 'Php Developer'],
      datasets: [
        {
          data: [300, 50, 100, 34, 45],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56", "#36D2EB", "#3642EB"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56", "#36D2EB", "#3642EB",
          ]
        }]
    };
    this.options = {
      title: {
        display: false,
        text: 'My Title',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Java Developer',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Php Developer',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }

  }


  onInterviewsBenchSales($event) {
    this.loading = true;

    this.authService.getBenchsalesInterviewreports($event.value.code,'').subscribe(applicants => {
      this.benchsalesInterviews = applicants.data;
      this.loading = false;

    });


  }
  hidemodal()
  {
    this.displayBasic2 =false;
    localStorage.setItem('dialogbanner','no');
  }
  ngOnInit(): void {
    //reactive form object

    if(localStorage.getItem('dialogbanner')=='yes')
    {
      this.displayBasic2 =true;
    }else{
      this.displayBasic2 =false;
    }
    this.role = localStorage.getItem('roles');

    this.profileData = new FormGroup({
      'image': new FormControl(null, [Validators.required])
    })
    if (this.role == 'admin') {
      this.authService.getActiveJobReportsforAdmin('', '').subscribe(
        response => {

          this.activeJobswithUsers = response.data;
        }, err => {

        });
        this.authService.activeBenchTalents('', '').subscribe(
          response => {

            this.activeBenchTalents = response.data;
          }, err => {

          });
          this.authService.activeBenchSales('', '').subscribe(
            response => {

              this.activeBenchSales = response.data;
            }, err => {

            });
    }
    this.authService.getJobs('').then(jobs => {
      this.jobs = jobs;
      this.loading = false;

    });
    this.authService.getSubmitConsultants(this.role, this.selectedConsultant).then(applicants => {
      this.hunterconsultants = applicants;
      this.loading = false;
    });
    this.authService.getMyHotlistConsultants().subscribe(consultants => {
      this.getMyhotlistConsultants = consultants.data;
      this.pendinghotlist =consultants.pendinghotlist;
      this.loading = false;
    });


    this.authService.getBenchsalesInterviewreports('','').subscribe(applicants => {
      this.benchsalesInterviews = applicants.data;
      this.loading = false;

    });

    this.authService.getBenchtalentSubmissionReport().then(benchtalents => {
      this.benchtalents = benchtalents;
      this.loading = false;

    });
    this.authService.getInterviewsConsultants('', '').then(applicants => {
      this.interviewjobsschedules = applicants;
      this.loading = false;
    });
    this.authService.getUsers().subscribe(
      (response) => { this.consultants = response.user
       this.assignUsers = this.consultants.filter(function(user:any) {

      //    return user.role=='recruiter' || user.role=='head-hunters' || user.role=='adminhunters';
       return user.role=='recruiter';
       });
        this.loading = false; },
      (error) => { console.log(error) }
    );
    this.authService.getTotalSubmissionsbyuser(this.selectedBenchsaleActivity,this.selectedBenchsaleActivity).subscribe(
      response => {
        this.totalsubmissionsbyuser = response.data;
      }, err => {

      });
    this.authService.getTargets().subscribe(
      response => {
        this.dailysubmissions = response.dailysubmissions;
        this.qualitysubmissions = response.qualitysubmissions;
        this.submissions = response.submissions;
        this.myinterviews = response.myinterviews;
        this.activebench = response.activebench;
        this.placed = response.placed;
      }, err => {

      });
    this.authService.getApplicantReports().then(applicants => {
      this.allApplicants = applicants;
      this.loading = false;

    });

    //get user detail
    this.authService.getUserDetails().subscribe(
      response => {

        this.userDetails = response;
      }, err => {

      });
  }
  onStatusChangeBenchSales($event) {
    this.authService.activeBenchSales($event.value.code, this.selectBenchSales).subscribe(
      response => {

        this.activeBenchSales = response.data;
      }, err => {

      });

  }
  onStatusChangeBenchTalent($event) {
    this.authService.activeBenchTalents($event.value.code, this.selectManager).subscribe(
      response => {

        this.activeBenchTalents = response.data;
      }, err => {

      });

  }
  onStatusBencshalesChange($event) {
    this.authService.getTotalSubmissionsbyuser($event.value.code,'').subscribe(
      response => {
        this.totalsubmissionsbyuser = response.data;
      }, err => {

      });


  }
  onStatusChangeManager($event) {
    this.authService.getActiveJobReportsforAdmin($event.value.code, this.selectManager).subscribe(
      response => {

        this.activeJobswithUsers = response.data;
      }, err => {

      });

  }
  onStatusChange($event) {
    this.loading = true;
    this.authService.getSubmitConsultants($event.value.code, this.selectedConsultant).then(applicants => {
      this.hunterconsultants = applicants;
      this.loading = false;
    });

  }

  onGetJobsUser($event) {
    this.loading = true;
    this.authService.getJobs($event.value.code).then(jobs => {
      this.jobs = jobs;
      this.loading = false;

    });

  }
  onChangeUserSubmissions($event){
    this.loading = true;
    this.authService.getJobs($event.value).then(jobs => {
      this.jobs = jobs;
      this.loading = false;

    });

  }
  onInterviewsConsultants($event) {
    this.loading = true;
    this.authService.getInterviewsConsultants($event.value.code, '').then(applicants => {
      this.interviewjobsschedules = applicants;
      this.loading = false;
    });

  }

  get image() { return this.profileData.get('image') }
  calculateDiff(sentOn) {

    let todayDate = new Date();
    let sentOnDate = new Date(sentOn);
    sentOnDate.setDate(sentOnDate.getDate());
    let differenceInTime = todayDate.getTime() - sentOnDate.getTime();
    // To calculate the no. of days between two dates
    let differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  }
  fileEvent(e) {
    if (!this.validateFileExtension(e.target.files[0].name)) {
      alert("Unsupported file formate");
      e.srcElement.value = null;
      return false;
    }
    this.profilePic = e.target.files[0];
  }
  getUser(): void {
    // this.authService.getUsers().subscribe(
    //   response => { console.log(response)},
    //   err => { console.log(err);}
    // )

    // this.authService.getUserDetails().subscribe(
    //   response => {
    //     console.log("Admin",response);
    //     this.userDetails = response;
    //   },err => {
    //     console.log("Admin",err);
    // });
  }

  logout(): void {
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');

    this.authService.logOutUser(user_id).subscribe(
      response => {

        localStorage.clear();
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/login']);
      },
      err => { console.log(err); }
    )
  }

  updateUserProfile() {
    var profileData = new FormData();
    //const headers = new HttpHeaders();

    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');

    profileData.append('image', this.profilePic);

    this.authService.updateProfile(profileData).subscribe(data => {
      this.successResult = data;
      this.profileData.reset();

    }, err => {
      this.serverErrors = err.error;
    });
  }

  nextPage(url: string) {

    this.authService.getUserLogsDetailsWithPagination(url).subscribe(
      response => {
        this.userDetails = response;

      }, err => {

      });
  }

  individualPage(url: string, page: number) {

    this.authService.getUserLogsDetailsWithPagination(url + "?page=" + page).subscribe(
      response => {
        this.userDetails = response;

      }, err => {

      });
  }

  prevPage(url: string) {

    this.authService.getUserLogsDetailsWithPagination(url).subscribe(
      response => {
        this.userDetails = response;

      }, err => {

      });
  }

  validateFileExtension(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg') {
      return true;
    } else {
      return false;
    }
  }

}
