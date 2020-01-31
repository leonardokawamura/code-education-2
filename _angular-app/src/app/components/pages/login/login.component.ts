import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    "email" : "",
    "password" : ""
  };  

  constructor(private http: HttpClient) { 

  }

  ngOnInit() {
       
  }

  submit() {
    this.http.post('http://localhost:8000/api/login');
    return false;
  }

}
