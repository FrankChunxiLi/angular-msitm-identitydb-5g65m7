import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HProd } from '../models/HProd';
import { ConnectingToDatabaseService } from "../services/connecting-to-database.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-h-details',
  templateUrl: './h-details.component.html',
  styleUrls: [ './h-details.component.css' ],
  providers: [ ConnectingToDatabaseService ]
})

export class HProdDetailComponent implements OnInit {
  public HProducts: Array<any> = [];
  private sub: any;
  imageForm: FormGroup;
  id: number;
  base64Image: any;
  loading = false;
  submitted = false;
  p:string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private hProdService: ConnectingToDatabaseService,
    private location: Location
    
  ) {}

  public getHProd(id?: string) {
    this.hProdService.getHProd(id)
      .subscribe(
          (response: any) => {
            this.HProducts = response.json();
          },
          (error: Error) => {
            throw error;
          }
        );
  }
  
  public delHProd(id?: string) {
    this.hProdService.delHProd(id)
      .subscribe(
          (response: any) => {
            this.HProducts = response.json();
          },
          (error: Error) => {
            throw error;
          }
        );
  }

  ngOnInit() {
   this.getHProd(this.route.snapshot.params.id);
   this.imageForm = this.formBuilder.group({});
  }

}