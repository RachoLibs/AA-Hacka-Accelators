import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConsentDetails } from '../../models/ConsentDetails';
import { DataService } from 'src/service/dataservice';
import { AccountAggregatorComponent } from '../account-aggregator/account-aggregator.component';
import { bannerTitleService } from 'src/service/bannerTitle.service';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";


@Component({
    selector: 'app-homeloan',
    templateUrl: './homeloan.component.html',
    styleUrls: ['../common-style.scss', './homeloan.component.scss']
})

export class HomeLoanComponent implements OnInit{


    consentsensitivityurl = "http://34.237.143.171:5002/consentsensitivity";
  consentinsightsurl = "http://34.237.143.171:5002/insightsalert";

    @Output() messageEvent = new EventEmitter<ConsentDetails>();
    loanForm: FormGroup;
    consentDetailControls: any;
    // consentTypesArr = ['BALANCE', 'TRANSACTIONS'];
    unitArr = ['MONTH', 'YEAR', 'DATE', 'INF'];
    consentModeArr = ['VIEW', 'STORE', 'QUERY', 'STREAM'];
    dateRangeArr = ['Last 1 month', 'Last 3 months', 'Last 6 months', 'Other'];


    // constructor(private fb: FormBuilder) {}

    // consentDetailForm: FormGroup;
    // consentDetailControls: any;
    consentMinDate: Date;
    consentExpiryMinDate: Date;
    operatorArr = ['=', '!=', '>', '<', '>=', '<='];
    dataFilterTypeArr = ['TRANSACTIONTYPE', 'TRANSACTIONAMOUNT'];
    // unitArr = ['MONTH', 'YEAR', 'DATE', 'INF'];
    // consentModeArr = ['VIEW', 'STORE', 'QUERY', 'STREAM'];
    fetchTypeArr = ['ONETIME', 'PERIODIC'];
    consentTypesArr = ['PROFILE', 'SUMMARY', 'TRANSACTION'];
    fiTypesArr = ['DEPOSIT', 'TERM-DEPOSIT', 'RECURRING_DEPOSIT', 'SIP', 'CP', 'GOVT_SECURITIES', 'EQUITIES', 'BONDS', 'DEBENTURES', 'MUTUAL_FUNDS', 'ETF', 'IDR', 'CIS', 'AIF', 'INSURANCE_POLICIES', 'NPS', 'INVIT', 'REIT', 'OTHER'];
    purposeCodeArr = [{
        code: '101',
        text: 'Wealth management service'
    }, {
        code: '102',
        text: 'Customer spending patterns, budget or other reportings'
    }, {
        code: '103',
        text: 'Aggregated statement'
    }, {
        code: '104',
        text: 'Explicit consent for monitoring of the accounts'
    }, {
        code: '105',
        text: 'Explicit one-time consent for the accounts'
    }
    ];
    purposeTextInp: string = '';
    purposeArr= ['Home Loan', 'Working Capital Loan'];
    cs:ConsentDetails=new ConsentDetails();
    consentarr=[];
    pageDetail="Know More";
    constructor(private httpClient: HttpClient, private fb: FormBuilder, private dataservice: DataService, private bannerTitleService: bannerTitleService) {
        this.consentMinDate = new Date();
    }

    onSubmit() {
        console.log(this.loanForm.value);
        this.cs=this.sendDataToConsentService(this.loanForm);
        // this.dataservice.changeMessage(this.cs);
        this.consentarr.push(this.cs);
        localStorage.setItem('abc', JSON.stringify(this.consentarr));
    }

    //Default values
    
    

    ngOnInit() {

        this.bannerTitleService.pageDetail.subscribe(updatedTitle => {
            this.pageDetail = updatedTitle;
          });
          console.log(this.pageDetail)
        this.dataservice.currentMessage.subscribe(message => this.cs = message);
        this.loanForm = this.fb.group({
            personName: ['', Validators.required],
            dob: ['', Validators.required],
            panNo: ['', Validators.required],
            amount: ['', Validators.required],
            tenure: ['', Validators.required],
            emi: ['', Validators.required],
            purpose: ['', Validators.required],
            consentType: ['', Validators.required],
            dateRange: ['', Validators.required],
            consentMode: ['', Validators.required],
            frequencyUnit: ['', Validators.required],
            operator: ['', Validators.required],
            dataFilterType: ['', Validators.required],
            dataFilterValue: ['', Validators.required],
            dataLifeUnit: ['', Validators.required],
            dataLifeValue: ['', Validators.required],
            fiDataFrom: ['', Validators.required],
            fiDataTo: ['', Validators.required],
            // 'frequencyUnit': ['', Validators.required],
            frequencyValue: ['', Validators.required],
            purposeText: ['', Validators.required],
            purposeCode: ['', Validators.required],
            consentStart: ['', Validators.required],
            consentExpiry: ['', Validators.required],
            // 'consentMode': ['', Validators.required],
            fetchType: ['', Validators.required],
            // 'consentType': ['', Validators.required],
            fiType: ['', Validators.required]
        });
        this.consentDetailControls = this.loanForm.controls;

        this.loanForm.get('personName').setValue('John Smith');
        this.loanForm.get('dob').setValue(new Date('11/11/1993'));
        this.loanForm.get('panNo').setValue('CZui9075at');
        this.loanForm.get('amount').setValue(7000000);
        this.loanForm.get('tenure').setValue(12);
        this.loanForm.get('emi').setValue(15000);
        this.loanForm.get('purpose').setValue('Home Loan');
        this.loanForm.get('dataLifeUnit').setValue('MONTH');
        this.loanForm.get('dataLifeValue').setValue(2);
        this.loanForm.get('frequencyUnit').setValue('MONTH');
        this.loanForm.get('frequencyValue').setValue(4);
        this.loanForm.get('fiDataFrom').setValue(new Date('3/1/2020'));
        this.loanForm.get('fiDataTo').setValue(new Date('6/1/2020'));
        this.loanForm.get('consentStart').setValue(new Date('8/1/2020'));
        this.loanForm.get('consentExpiry').setValue(new Date('12/1/2020'));
        this.loanForm.get('consentMode').setValue('STORE');
        this.loanForm.get('fetchType').setValue('PERIODIC');
        this.loanForm.get('consentType').setValue(['TRANSACTION']);
        this.loanForm.get('fiType').setValue(['DEPOSIT']);
    }

    public sendDataToConsentService(loanForm: FormGroup): ConsentDetails {

        var cd = new ConsentDetails();
        cd.id=this.makeid(9);
        cd.fiu="AFI";
        cd.consentType=loanForm.value.consentType;
        cd.consentMode=loanForm.value.consentMode;
        var currentdate=new Date();
        cd.date=currentdate;
        cd.fiDataFrom=loanForm.value.fiDataFrom;
        cd.fiDataTo=loanForm.value.fiDataTo;
        cd.frequencyUnit=loanForm.value.frequencyUnit;
        cd.frequencyValue=loanForm.value.frequencyValue;
        cd.purpose=loanForm.value.purpose;
        cd.purposeCode=103;
        cd.fiType=loanForm.value.fiType;
        cd.consentStart=loanForm.value.consentStart
        cd.consentExpiry=loanForm.value.consentExpiry

        // this.dataservice.changeMessage(cd);
        // let aaComponent = new AccountAggregatorComponent();
        // aaComponent.updateConsentList(cd);
        // console.log(cd)
        // this.messageEvent.emit(cd);

    //     var fidatadays = this.diff_days(new Date(cd.fiDataTo), new Date(cd.fiDataFrom));
    //   var fidatamonths = this.diff_months(new Date(cd.fiDataTo),new Date(cd.fiDataFrom));
    //   cd.fiDateMonths=fidatamonths;
    //   var url_sensitivity = this.consentsensitivityurl+'/'+ cd.consentType+'/'+ cd.consentMode +'/'+ fidatadays +'/'+cd.frequencyUnit+'/'+cd.frequencyValue;
    //   var url_insights = this.consentinsightsurl+'/'+ cd.purposeCode+'/'+ cd.purpose +'/'+ cd.fiType +'/'+ fidatamonths;

    //   this.httpClient.get<string>(url_sensitivity).subscribe(
    //     data => {cd.sensitivity = data;
    //       console.log("data response------>"+data)
    //       console.log(cd.id+"-----"+cd.sensitivity)
  
    //     var url_insights = this.consentinsightsurl+'/'+ cd.purposeCode+'/'+ cd.purpose +'/'+ cd.fiType +'/'+ fidatamonths;
    //     console.log("insights url------"+url_insights);
    //     this.httpClient.get<string>(url_insights).subscribe(
    //       data => {
    //       cd.alert = data;
    //         console.log("data response------>"+data)
    //         // this.dataSourceCD.push(cd);
    //         // if (i == arr.length) {
    //         //   // this.dataSourceCD.sort((a, b) => (a.position < b.position ? -1 : 1));
    //         //   this.updateDataList(this.dataSourceCD);
    //         // }
    //         return cd;
    //       },
    //       error => console.error('There was an error!', error)
    //     );
    //     },
    //     error => console.error('There was an error!', error)
    //     )
        return cd;

        // if(cd.sensitivity!=null && cd.alert!=null)
        // return cd;
    
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

    public makeid(length: number) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
     
}