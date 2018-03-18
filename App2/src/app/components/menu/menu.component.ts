import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  template: `
    <ul>
    <li><a href="" routerLink='home'>Home</a></li>
    <li><a href="" routerLink='list'>List of Dogs</a></li>
    </ul>
  `,
  styles: []
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
