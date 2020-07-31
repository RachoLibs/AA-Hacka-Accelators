import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-fiu',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponentFIU implements OnInit {

  constructor() { }

  scrollToElement(element): void {
    document.getElementById(element).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});;
  }

  ngOnInit() {
  }

}
