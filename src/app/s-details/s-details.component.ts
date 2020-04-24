import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SProd } from '../models/SProd';
import { ConnectingToDatabaseService } from "../services/connecting-to-database.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-s-details',
  templateUrl: './s-details.component.html',
  styleUrls: [ './s-details.component.css' ],
  providers: [ ConnectingToDatabaseService ]
})

export class SProdDetailComponent implements OnInit {
  public SProducts: Array<any> = [];
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
    private sProdService: ConnectingToDatabaseService,
    private location: Location
    
  ) {}

  public getSProd(id?: string) {
    this.sProdService.getSProd(id)
      .subscribe(
          (response: any) => {
            this.SProducts = response.json();
          },
          (error: Error) => {
            throw error;
          }
        );
  }

  public delSProd(id?: string) {
    this.sProdService.delSProd(id)
      .subscribe(
          (response: any) => {
            this.SProducts = response.json();
          },
          (error: Error) => {
            throw error;
          }
        );
  }

  ngOnInit() {
   this.getSProd(this.route.snapshot.params.id);
   this.imageForm = this.formBuilder.group({});
  }

}