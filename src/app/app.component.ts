import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appTitle = 'FoolishPuma Sandbox: Angular';

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.appTitle);
  }
}
