import { Component, OnInit, SimpleChanges,Input,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectingToDatabaseService } from '../services/connecting-to-database.service';
import { HProd } from '../models/HProd';
import { products } from '../products';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-hardware-list',
  templateUrl: './hardware-list.component.html',
  styleUrls: ['./hardware-list.component.css'],
  providers: [ ConnectingToDatabaseService ]
})

export class HardwareListComponent implements OnInit {


  searchText;
  pager = 0;
  pagenumber = 1; 
  product;
  records: Array<any>;
  isDesc: boolean = false;
  column: string = 'Product_Name';
  color;
  public HProducts: Array<any> = [];

  constructor(
    
  private _dbService: ConnectingToDatabaseService,
  private _http: HttpClient,
  private route: ActivatedRoute) { }

  public getCount() {
    return JSON.parse(JSON.stringify(this.pager))
    console.log(JSON.parse(JSON.stringify(this.pager)))
  }
  public incCount(){
    if(this.pager<1){
      this.pagenumber = 1
    }
    else{
      this.pagenumber = this.pagenumber+1
    }
    this.pager = this.pager+1;
    console.log(this.pager)
    
  }
  public decCount(){
    if(this.pager>1){this.pager = this.pager-1;
    this.pagenumber = this.pagenumber-1;
    console.log(this.pager)}
    else if(this.pager=1){
      this.pager=this.pager-1;
      this.pagenumber=1
      console.log(this.pager)
    }
    
  }

   public pagebutton1(){
    if(this.pager < 1){this.pagenumber = 1;
    console.log(this.pager)}

    if(this.pager == 1) { this.pager = this.pager-1;
      this.pagenumber = 1;
      console.log(this.pager)
    }

    if(this.pager>1){
      this.pager = this.pager-1;
      this.pagenumber = this.pager;
      console.log(this.pager)
    }
  }

  public pagebutton2(){
    if(this.pager <1){
      this.pager=this.pager+1;
      console.log(this.pager)
      
    }
    else{
      this.pager=this.pager;
      console.log(this.pager)
    }
  }

  public pagebutton3(){
    if(this.pager<1){
      this.pager=this.pager+2;
      console.log(this.pager);
      this.pagenumber = 2
    }
    else{
      this.pager=this.pager+1;
      console.log(this.pager)
      this.pagenumber=this.pagenumber+1
    }
  }


  public getData(page?: string) {
    this._dbService.getData(page)
      .subscribe(
        (response: any) => {
          this.HProducts = response.json();
        },
        (error: Error) => {
          throw error;
        }
      )
  }


  ngOnInit() {
    this.getData(this.pager.toString());
    // this.route.queryParams.subscribe(response => this.loadPage('1'));

    //  leave it here for rn, let's try in detail first since you already set up by each specific products in detail page.
    let imageUrl = 'https://images.pexels.com/photos/1713953/pexels-photo-1713953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'

    this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
      console.log(base64data);
      this.base64Image = 'data:image/jpg;base64,' + base64data;
    }); 
  }
  

  
 
  
  ngOnChanges(changes : SimpleChanges) {
    this.getData(this.pager.toString());

  }

  changeColorOne() {
     this.color = !this.color;
     if (this.color) {
       return '#ffffff';
     } else {
      return '#f6f6f6';
     }
  }

  sort(property) {
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.records.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  };

  model: any = {};
  model2: any = {}; 
  myValue;
}

