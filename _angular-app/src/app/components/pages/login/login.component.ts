import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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

  showMessageError = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
       
  }

  submit() {
    this.authService.login(this.credentials)
      .subscribe(data => {
        const token = data.token; 
        window.localStorage.setItem('token', token);
        this.router.navigate(['products/list']);               
      }, () => this.showMessageError = true);
    return false;
  }

}
