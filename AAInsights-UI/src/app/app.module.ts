import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiuComponent } from './fiu/fiu.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeLoanComponent } from './homeloan/homeloan.component';
import { AccountAggregatorComponent, DialogContentExampleDialog, DialogContentOTP } from './account-aggregator/account-aggregator.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from 'src/service/dataservice';
import { bannerTitleService } from 'src/service/bannerTitle.service';
import {MatDialogModule} from '@angular/material/dialog';
import { NgOtpInputModule } from 'ng-otp-input';
import { HeaderComponentFIU } from './header-fiu/header.component';
import {MatSortModule} from '@angular/material/sort';



@NgModule({
  declarations: [
    AppComponent,
    FiuComponent,
    HomeLoanComponent,
    AccountAggregatorComponent,
    HeaderComponent,
    DialogContentExampleDialog,
    DialogContentOTP,
    HeaderComponentFIU
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    NgOtpInputModule,
    MatSortModule
    ],
    entryComponents: [
      DialogContentExampleDialog,
      DialogContentOTP
    ],
  providers: [bannerTitleService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
