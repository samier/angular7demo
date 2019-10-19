import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular Demo';
  router: any;
  userName: any;

  constructor(
    private _router: Router
  ) {
    this.router = _router;
  }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
  }

  signout() {
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }
}
