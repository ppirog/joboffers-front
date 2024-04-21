import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [

    FormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService ){}

  loginObj: any = {
    username: "someUser",
    password: "somePassword"
  };

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
  // url = 'http://ec2-18-159-37-230.eu-central-1.compute.amazonaws.com:8000';
  url = 'http://localhost:8080';


  onLogin() {

    this.http.post(this.url + '/token', this.loginObj, { headers: this.headers }).subscribe(
      (response: any) => {
        if ('token' in response && response.token) {
          this.cookieService.set('token', response.token);
          console.log('Token:', response.token);

          this.headers = this.headers.set('Authorization', 'Bearer ' + this.cookieService.get('token'));

          this.http.post(this.url+'/login', this.loginObj, { headers: this.headers }).subscribe(
            (loginResponse) => {
              console.log('Udane logowanie:', loginResponse);
              this.router.navigate(['/dashboard']);
            },
            (loginError) => {
              console.error('Błąd logowania:', loginError);
            }
          );
        } else {
          console.error('Błąd token:', response);
        }
      },
      (tokenError) => {
        console.error('Błąd token:', tokenError);
      }
    );
  }




  onRegister() {

    this.http.post(this.url+'/register', this.loginObj, { headers: this.headers }).subscribe(
      (response) => {

        console.log('Udane rejestracji:', response);
      },
      (error) => {

        console.error('Błąd rejestracji:', error);
      }
    );
  }
}
