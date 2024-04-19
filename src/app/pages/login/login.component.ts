import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

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
  constructor(private http: HttpClient, private router: Router) {}

  loginObj: any = {
    username: "someUser",
    password: "somePassword"
  };

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json');



  onLogin() {
    this.http.post('http://localhost:8080/token', this.loginObj, { headers: this.headers }).subscribe(
      (response: any) => {
        if ('token' in response) {
          localStorage.setItem('token', response.token);
          console.log('token:', response.token);

          this.headers = this.headers.set('Authorization', 'Bearer ' + response.token);

          this.http.post('http://localhost:8080/login', this.loginObj, { headers: this.headers }).subscribe(
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

    this.http.post('http://localhost:8080/register', this.loginObj, { headers: this.headers }).subscribe(
      (response) => {

        console.log('Udane rejestracji:', response);
      },
      (error) => {

        console.error('Błąd rejestracji:', error);
      }
    );
  }
}
