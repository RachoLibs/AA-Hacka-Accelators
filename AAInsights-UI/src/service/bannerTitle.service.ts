import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class bannerTitleService {
    pageDetail = new BehaviorSubject('Initial Title');

  setTitle(title: string) {
    this.pageDetail.next(title);
  }
}
