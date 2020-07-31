import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-fiu',
    templateUrl: './fiu.component.html',
    styleUrls: ['./fiu.component.scss']
})

export class FiuComponent implements OnInit {
    consentDetailForm: FormGroup;
    consentDetailControls: any;
    consentMinDate: Date;
    consentExpiryMinDate: Date;
    operatorArr = ['=', '!=', '>', '<', '>=', '<='];
    dataFilterTypeArr = ['TRANSACTIONTYPE', 'TRANSACTIONAMOUNT'];
    unitArr = ['MONTH', 'YEAR', 'DATE', 'INF'];
    consentModeArr = ['VIEW', 'STORE', 'QUERY', 'STREAM'];
    fetchTypeArr = ['ONETIME', 'PERIODIC'];
    consentTypesArr = ['PROFILE', 'SUMMARY', 'TRANSACTIONS'];
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


    constructor(private fb: FormBuilder) {
        this.consentMinDate = new Date();
    }

    onSubmit() {
        console.log(this.consentDetailForm.value)
    }

    ngOnInit() {
        this.consentDetailForm = this.fb.group({
            'operator': ['', Validators.required],
            'dataFilterType': ['', Validators.required],
            'dataFilterValue': ['', Validators.required],
            'dataLifeUnit': ['', Validators.required],
            'dataLifeValue': ['', Validators.required],
            'fiDataFrom': ['', Validators.required],
            'fiDataTo': ['', Validators.required],
            'frequencyUnit': ['', Validators.required],
            'frequencyValue': ['', Validators.required],
            'purposeText': ['', Validators.required],
            'purposeCode': ['', Validators.required],
            'consentStart': ['', Validators.required],
            'consentExpiry': ['', Validators.required],
            'consentMode': ['', Validators.required],
            'fetchType': ['', Validators.required],
            'consentType': ['', Validators.required],
            'fiType': ['', Validators.required]
        });
        this.consentDetailControls = this.consentDetailForm.controls;
    }
}