import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ConsentDetails } from 'src/models/ConsentDetails';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

    cd:ConsentDetails=new ConsentDetails();
    messageSource = new BehaviorSubject(null);
    currentMessage = this.messageSource.asObservable();
  
    constructor() { }
  
    changeMessage(consentDetails: ConsentDetails) {
      this.messageSource.next(consentDetails)
      this.cd=consentDetails;
      console.log(this.currentMessage)
    }
  
    
    getConsentDetails(): Observable<string> {
        console.log(this.currentMessage)
        return this.messageSource.asObservable();
    }
}