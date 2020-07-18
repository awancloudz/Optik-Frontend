import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-home',
  templateUrl: './home-notfound.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeNotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
