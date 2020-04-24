import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConnectingToDatabaseService } from "../services/connecting-to-database.service";
import { AlertService } from "../services/alert.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: [ "./register.component.css" ],
  providers: [ ConnectingToDatabaseService, AlertService ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  color;

  constructor(
  private _dbService: ConnectingToDatabaseService,
  private formBuilder: FormBuilder,
  private route: ActivatedRoute,
  private router: Router,
  private alertService: AlertService) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
            UserName: ['', Validators.required],
            UserRole: ['', Validators.required],
            FirstName: ['', Validators.required],
            LastName: ['', Validators.required],
            Email: ['', Validators.required],
            Password: ['', Validators.required]
        });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    // if (this.HProdForm.invalid) {
    //         window.alert('This Form is invalid!');
    //     }
    this.loading = true;

    this._dbService.putUserData('http://localhost:3000/api/Users',this.registerForm.value)
    .pipe(first())
      .subscribe(
          data => {
              this.alertService.success('Registration successful', true);
              this.router.navigate(['/alluser'])
              
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
              this.router.navigate([''])
          });
  }

  changeColorOne() {
    this.color = !this.color;
    if (this.color) {
      return "#ffffff";
    } else {
      return "#f6f6f6";
    }
  }
}