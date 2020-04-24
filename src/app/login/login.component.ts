import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConnectingToDatabaseService } from '../services/connecting-to-database.service';
import { User } from '../models/User';
import { products } from '../products';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService} from "../services/alert.service";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
  providers: [ ConnectingToDatabaseService ]
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  pager = {};
  product;
  color;
  loading = false;
  submitted = false;
  returnUrl: string;
  user:string;
  username:string;
  password:string;
  flag:number = 0;
     
List_one: Array<any> =[];
  public Users: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private _dbService: ConnectingToDatabaseService,
    private _http: HttpClient,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public getUser(page?: string) {
    this._dbService.getUser()
      .subscribe(
        (response: any) => {
          this.Users = response.json();
        },
        (error: Error) => {
          throw error;
        }
      )
  }

  ngOnInit() {
   
    this.getUser()
    this.loginForm = this.formBuilder.group({
            UserName: ['', Validators.required],
            Password: ['', Validators.required]

        });
       
  }

  onSubmit() {
      this.submitted = true;
     
      this.username = this.loginForm.value.UserName
      this.password = this.loginForm.value.Password


  for (this.user in this.Users) {
     
  if( this.username == this.Users[this.user]['UserName'] && this.password == this.Users[this.user]['Password'] && this.Users[this.user]['UserRole']=='admin')
  {
  this.flag = 1
    this.router.navigate(['/products/admin']);
    console.log("Logged in Successfully ");
  break;
  }
  else if (this.username == this.Users[this.user]['UserName'] && this.password == this.Users[this.user]['Password'] && this.Users[this.user]['UserRole']=='user'
  )
  {
  this.flag = 1
    this.router.navigate(['/products']);
    console.log("Logged in Successfully ");
  break;
  }

    
    }
  if ( this.flag == 0)
  {
    window.alert("Login Unsuccessful")
    this.router.navigate(['/login']);
    console.log("Unsuccessful")
  }

  }
}

