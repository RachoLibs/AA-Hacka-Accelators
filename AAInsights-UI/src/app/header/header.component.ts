import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  scrollToElement(element): void {
    document.getElementById(element).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});;
  }

  ngOnInit() {
  }

}
