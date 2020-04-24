import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListAdminComponent } from './product-list-admin/product-list-admin.component';
import { HardwareListComponent } from './hardware-list/hardware-list.component';
import { HardwareListAdminComponent } from './hardware-list-admin/hardware-list-admin.component';
import { SoftwareListComponent } from './software-list/software-list.component';
import { SoftwareListAdminComponent } from './software-list-admin/software-list-admin.component';
import { HCrudComponent } from './h-crud/h-crud.component';
import { HProdDetailComponent } from './h-details/h-details.component';
import { HProdDetailAdminComponent } from './h-details-admin/h-details-admin.component';
import { SCrudComponent } from './s-crud/s-crud.component';
import { SProdDetailComponent } from './s-details/s-details.component';
import { SProdDetailAdminComponent } from './s-details-admin/s-details-admin.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { ConnectingToDatabaseService } from './services/connecting-to-database.service';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewAllUserComponent } from './viewalluser/viewalluser.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      // { path: '', component: ProductListComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/admin', component: ProductListAdminComponent },
      { path: 'products/0', component: HardwareListComponent },
      { path: 'products/admin/0', component: HardwareListAdminComponent },
      { path: 'products/1', component: SoftwareListComponent },
      { path: 'products/admin/1', component: SoftwareListAdminComponent },
      { path: 'products/2', component: HCrudComponent },
      { path: 'Edit/0', component: HCrudComponent },
      { path: 'hProd/:id', component: HProdDetailComponent },
      { path: 'hProd/admin/:id', component: HProdDetailAdminComponent },
      { path: 'Edit/1', component: SCrudComponent },
      { path: 'sProd/:id', component: SProdDetailComponent },
      { path: 'sProd/admin/:id', component: SProdDetailAdminComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'alluser', component: ViewAllUserComponent }
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductListAdminComponent,
    HardwareListComponent,
    HardwareListAdminComponent,
    SoftwareListComponent,
    SoftwareListAdminComponent,
    HCrudComponent,
    HProdDetailComponent,
    HProdDetailAdminComponent,
    SCrudComponent,
    SProdDetailComponent,
    SProdDetailAdminComponent,
    LoginComponent,
    RegisterComponent,
    ViewAllUserComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/