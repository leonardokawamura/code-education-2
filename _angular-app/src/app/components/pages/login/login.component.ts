import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    "email" : "admin@user.com",
    "password" : "secret"
  };  

  constructor(private http: HttpClient, private router: Router) { 

  }

  ngOnInit() {
       
  }

  submit() {
    this.http.post<any>('http://localhost/projects/code-education/public/api/login', this.credentials)
      .subscribe((data) => {
        this.router.navigate(['categories/list']);
        const token = data.token;
        /*this.http.get('http://localhost/projects/code-education/public/api/categories', {
          headers: {
            'Authorization' : 'Bearer ' + token
          }
        })
          .subscribe(data => console.log(data));*/
      });
    return false;
  }

}
