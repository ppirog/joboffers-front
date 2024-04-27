import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {CookieService} from 'ngx-cookie-service';
import {NgIf} from "@angular/common";
import {environment} from "../../../environments";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [

    FormsModule,
    HttpClientModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  constructor(private http: HttpClient,
              private router: Router,
              private cookieService: CookieService
  ) {
  }

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
  ;

  loginObj: any = {
    username: "someUser",
    password: "somePassword"
  };
  registerObj: any = {
    username: "someUser",
    password: "somePassword"
  };
  // url = 'http://ec2-18-159-37-230.eu-central-1.compute.amazonaws.com:8000';
  url = environment.apiUrl;
  bladText: string = 'BŁĘDNE DANE';
  blad: boolean = false;


  onLogin() {

    this.http.post(this.url + '/token', this.loginObj, {headers: this.headers}).subscribe(
      (response: any) => {
        if ('token' in response && response.token) {
          // this.cookieService.set('token', response.token);
          sessionStorage.setItem('token', response.token)
          console.log('Token:', response.token);

          alert('Zalogowano pomyślnie!');
          this.router.navigate(['/dashboard']);
          // this.headers = this.headers.set('Authorization', 'Bearer ' + this.cookieService.get('token'));
          //
          // this.http.post(this.url+'/login', this.loginObj, { headers: this.headers }).subscribe(
          //   (loginResponse) => {
          //     console.log('Udane logowanie:', loginResponse);
          //     this.router.navigate(['/dashboard']);
          //   },
          //   (loginError) => {
          //     console.error('Błąd logowania:', loginError);
          //   }
          // );
        } else {
          console.error('Błąd token:', response);
        }
      },
      (tokenError) => {
        console.error('Błąd login:', tokenError);
        this.blad = true;
      }
    );
  }


  onRegister() {

    this.http.post(this.url + '/register', this.registerObj, {headers: this.headers}).subscribe(
      (response) => {

        console.log('Udane rejestracji:', response);
      },
      (error) => {

        console.error('Błąd rejestracji:', error);
      }
    );
  }
}
