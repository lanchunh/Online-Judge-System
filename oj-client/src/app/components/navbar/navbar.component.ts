import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'OCJS';
  username = 'Lanchun';
  profile: any;
  constructor(@Inject('auth') public auth) { }

  ngOnInit() {
  }

  login(): void {
    this.auth.login();
  }

  logout(): void {
    this.auth.logout();
  }
}
