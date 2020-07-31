import { Component, OnInit, Inject , ViewChild} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HeaderComponent } from '../header/header.component';
import { NgModule } from '@angular/core';
import { DataService } from 'src/service/dataservice';
import { ConsentDetails } from 'src/models/ConsentDetails';
import { bannerTitleService } from 'src/service/bannerTitle.service';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { MatDialog, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { timer } from 'rxjs';


@Component({
  selector: 'app-account-aggregator',
  templateUrl: './account-aggregator.component.html',
  styleUrls: ['./account-aggregator.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

// @NgModule({
//   imports: [HeaderComponent],
//   declarations: [HeaderComponent],
// })
export class AccountAggregatorComponent implements OnInit {

  // displayedColumns: string[] = ['position', 'id', 'date', 'sensitivity'];
  displayedColumns = ['position',  'consentpurpose','fiu', 'date', 'sensitivity', 'alert', 'action'];
  
  dataSource= null;
  dataSourceCD:ConsentDetails[] = [];
  cs:ConsentDetails=new ConsentDetails();
 
  consentsensitivityurl = "http://34.237.143.171:5002/consentsensitivity";
  consentinsightsurl = "http://34.237.143.171:5002/insightsalert";

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;

  constructor(private httpClient: HttpClient,public dialog: MatDialog, private dataService: DataService,  private bannerTitleService: bannerTitleService) { }

  ngOnInit() {

    // localStorage.removeItem("abc")

    this.dataSourceCD =[];
    var arr = JSON.parse(localStorage.getItem('abc'));
    console.log(arr);
    // this.dataSourceCD=arr;
    // this.updateDataList(this.dataSourceCD);

    // for (var i = 0 ; i< arr.length ; i++){
    //     let cdtemp = new ConsentDetails();
  
        
    //     cdtemp= arr[i];
        
    //     cdtemp.position=i+1;
    //     cdtemp.action='Pending'

    //     this.dataSourceCD.push(cdtemp);
    //           if (i == arr.length) {
    //             // this.dataSourceCD.sort((a, b) => (a.position < b.position ? -1 : 1));
    //             this.updateDataList(this.dataSourceCD);
    //           }


    // }


    
    for (var i = 0 ; i< arr.length ; i++){

      
      let cdtemp = new ConsentDetails();

      
      cdtemp= arr[i];
      
      cdtemp.position=i+1;
      cdtemp.action='Pending';

      if(cdtemp.purpose==='Working Capital Loan'){
        cdtemp.fiu='SAP';
      }

      var fidatadays = this.diff_days(new Date(cdtemp.fiDataTo), new Date(cdtemp.fiDataFrom));
      // cdtemp.date=new Date(cdtemp.consentStart).toUTCString();
      cdtemp.consentStart= new Date(cdtemp.consentStart).toDateString();
      cdtemp.consentExpiry= new Date(cdtemp.consentExpiry).toDateString();;
      cdtemp.fiDataFrom= new Date(cdtemp.fiDataFrom).toDateString();;
      cdtemp.fiDataTo= new Date(cdtemp.fiDataTo).toDateString();;


      var url_sensitivity = this.consentsensitivityurl+'/'+ cdtemp.consentType+'/'+ cdtemp.consentMode +'/'+ fidatadays +'/'+cdtemp.frequencyUnit+'/'+cdtemp.frequencyValue;
      console.log("sensitivity url------"+url_sensitivity);

      // console.log("insights url------"+url_insights);

      // this.httpClient.get<string>(this.consentinsightsurl)  
      //     .toPromise.apply(res => {
      //       return res.json();
      //     })
      //    .toPromise();


      this.httpClient.get<string>(url_sensitivity).subscribe(
      data => {cdtemp.sensitivity = data;
        console.log("data response------>"+data)
        console.log(cdtemp.id+"-----"+cdtemp.sensitivity)
        var fidatamonths = this.diff_months(new Date(cdtemp.fiDataTo),new Date(cdtemp.fiDataFrom));
        cdtemp.fiDateMonths=fidatamonths;

      var url_insights = this.consentinsightsurl+'/'+ cdtemp.purposeCode+'/'+ cdtemp.purpose +'/'+ cdtemp.fiType +'/'+ fidatamonths;
      console.log("insights url------"+url_insights);
      this.httpClient.get<string>(url_insights).subscribe(
        data => {
        cdtemp.alert = data;
          console.log("data response------>"+data)
          this.dataSourceCD.push(cdtemp);
          if (i == arr.length) {
            // this.dataSourceCD.sort((a, b) => (a.position < b.position ? -1 : 1));
            this.updateDataList(this.dataSourceCD);
          }
          
        },
        error => console.error('There was an error!', error)
      );
      },
      error => console.error('There was an error!', error)
      )

      setTimeout(() => {
        
      }, 2000);

      // await timer(1000).take(1).toPromise();

      // await this.delay(1000);
      

        console.log(cdtemp)
      
    }
    console.log(this.dataSource);

    //this.receiveMessage();
    // this.dataService.currentMessage.subscribe(message => this.cs = message);
    console.log("ng on init called");
    console.log(this.dataService.cd);
    console.log(this.dataService.currentMessage);
    // this.dataSource.push(this.cs);
    // console.log(this.dataSource)
  }

  // public updateConsentList(cd: ConsentDetails){
  //   this.dataSource.push(cd);
  //   console.log(this.dataSource)
  // }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}


  updateDataList(list: ConsentDetails[]){
    
    this.dataSource = new ExampleDataSource(this.dataSourceCD);
  }

  receiveMessage() {
    this.dataService.currentMessage.subscribe(message => this.cs = message);
    console.log(this.cs);
  }

  check(){
    console.log("check called")
    this.dataService.currentMessage.subscribe(message => this.cs = message);
    console.log(this.dataService.getConsentDetails());
    this.bannerTitleService.setTitle('OB Implementation : Client Story');
    console.log(this.cs);
  }

  diff_months(dt2:Date, dt1:Date) : number 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
   diff /= (60 * 60 * 24 * 7 * 4);
  return Math.abs(Math.round(diff));
  
 }

 diff_days(dt2:Date, dt1:Date) : number 
 {

  // To calculate the time difference of two dates 
  var Difference_In_Time = dt2.getTime() - dt1.getTime(); 
        
  // To calculate the no. of days between two dates 
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  return Difference_In_Days;
  
 }

 openDialog(id:string, sensitivity:string, fiu:string, purpose:string, action:string) {
  if(sensitivity==='Low'){
  const dialogRef = this.dialog.open(DialogContentExampleDialog,{
    data: {
      sensitivity: sensitivity,
      fiu: fiu,
      purpose: purpose,
      action: action
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    this.dataSourceCD.find(item => item.id == id).action = 'Approved';
    this.updateDataList(this.dataSourceCD);
    console.log(`Dialog result: ${result}`);
  });
  }
  if(sensitivity==='High' || sensitivity==='Medium'){
    const dialogRef = this.dialog.open(DialogContentOTP,{
      data: {
        sensitivity: sensitivity,
        fiu: fiu,
        purpose: purpose,
        action: action
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.dataSourceCD.find(item => item.id == id).action = 'Approved';
    this.updateDataList(this.dataSourceCD);
      console.log(`Dialog result: ${result}`);
    });
    }
}

rejectConsent(id: string){
  this.dataSourceCD.find(item => item.id == id).action = 'Rejected';
    this.updateDataList(this.dataSourceCD);
    // console.log(`Dialog result: ${result}`);

}

}

export interface Consent {
  id: string;
  position: number;
  date: string;
  sensitivity: string;
  alert:string;
}

const data: Consent[] = [
  { position: 1, id: 'Hydrogen', date: '1.0079', sensitivity: 'Low', alert: '1'},
  { position: 2, id: 'Helium', date: '4.0026', sensitivity: 'Medium', alert: '0'},
  { position: 3, id: 'Lithium', date: '6.941', sensitivity: 'Low', alert: '1'},
  { position: 4, id: 'Beryllium', date: '9.0122', sensitivity: 'High', alert: '1'},
  { position: 5, id: 'Boron', date: '10.811', sensitivity: 'Medium', alert: '0'},

];



 

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {

  constructor(private dataSource: ConsentDetails[]) { 
    super();
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ConsentDetails[]> {
    // var data= this.dataService.getItems();
    const rows = [];
    this.dataSource.forEach(element => rows.push(element, { detailRow: true, element }));
    console.log(rows);
    return of(rows);
  }

  disconnect() { }


}

@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
  styleUrls: ['./account-aggregator.component.scss'],
})
export class DialogContentExampleDialog implements OnInit{

  
  ngOnInit(){
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogContent) {}

  
}

@Component({
  selector: 'dialog-otp',
  templateUrl: 'dialog-otp.html',
  styleUrls: ['./account-aggregator.component.scss'],
})
export class DialogContentOTP {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogContent) {}


  approve=false;

  otp: string;
  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  config = {
    allowNumbersOnly: false,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '30px',
      'height': '30px'
    }
  };
  onOtpChange(otp) {
    this.otp = otp;
  }

  setVal(val) {
    this.ngOtpInput.setValue(val);
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }

}