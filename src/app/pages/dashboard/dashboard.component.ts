import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router, RouterOutlet} from "@angular/router";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {JsonPipe} from "@angular/common";
import {CookieService} from "ngx-cookie-service";
import {Offer} from "../offer.interface";
import {environment} from "../../../environments";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [

    FormsModule,
    HttpClientModule,
    RouterOutlet,
    JsonPipe
  ],
  providers: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  offers: Offer[] = [];
  // url: string = 'http://ec2-18-159-37-230.eu-central-1.compute.amazonaws.com:8000';
  url  = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
  }

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers() {
    let token = sessionStorage['token'];


    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);


    this.http.get<any>(this.url + '/offers' ,{headers}).subscribe(
      (response: any) => {
        console.log('Odpowiedź z serwera:', response);
        this.offers = response.offers;
        console.log(this.offers)
      }, (error) => {
        if (error.status === 401) {
          console.warn('Otrzymano błąd 401, ale kontynuujemy przetwarzanie odpowiedzi.');
        } else {
          console.error('Błąd podczas pobierania ofert:', error);
        }
      }
    );

  }


}
