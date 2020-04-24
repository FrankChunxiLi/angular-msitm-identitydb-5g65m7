import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SProd } from '../models/SProd';
import { ConnectingToDatabaseService } from "../services/connecting-to-database.service";
import { AlertService} from "../services/alert.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({
  selector: "app-s-crud",
  templateUrl: "./s-crud.component.html",
  styleUrls: ["./s-crud.component.css"],
  providers: [ ConnectingToDatabaseService, AlertService ]
})
export class SCrudComponent implements OnInit {
  SProdForm: FormGroup;
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
    this.SProdForm = this.formBuilder.group({
            Product_Name: ['', Validators.required],
            Short_Description: ['', Validators.required],
            Long_Description: ['', Validators.required],
            SKU: ['', [Validators.required, Validators.minLength(6)]],Tax_Category: ['', Validators.required],
            Gift_Wrappable: ['', Validators.required],
            Image_URL: ['', Validators.required]
        });
  }
  get f() { return this.SProdForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    this.loading = true;

    this._dbService.putData('http://localhost:3000/api/SoftwareProduct',this.SProdForm.value)
    .pipe(first())
      .subscribe(
          data => {
              this.alertService.success('Registration successful', true);
              this.router.navigate(['/products1'])
              
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
