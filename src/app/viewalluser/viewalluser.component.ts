import { Component, OnInit,SimpleChanges } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConnectingToDatabaseService } from "../services/connecting-to-database.service";
import { AlertService } from "../services/alert.service";
import { first } from 'rxjs/operators';


@Component({
  selector: "app-viewalluser",
  templateUrl: "./viewalluser.component.html",
  styleUrls: [ "./viewalluser.component.css" ],
  providers: [ ConnectingToDatabaseService, AlertService ]
})
export class ViewAllUserComponent implements OnInit {
  searchText;
  loading = false;
  submitted = false;
  pagenumber = 1;
  public Users: Array<any> = [];
  pager =0;
  color;

  constructor(
  private _dbService: ConnectingToDatabaseService,
  private route: ActivatedRoute,
  private router: Router,
  private alertService: AlertService) {}

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

  public getUserPage(page?: string) {
    this._dbService.getUserPage(page)
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
        this.getUserPage(this.pager.toString());
  };
  
  ngOnChanges(changes : SimpleChanges) {
    this.getUserPage(this.pager.toString());
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