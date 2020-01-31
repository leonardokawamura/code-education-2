import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = 'admin@user.com';

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.email = 'qualquer coisa';
    }, 3000)    
  }

}
