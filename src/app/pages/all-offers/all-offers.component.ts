import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Offer} from "../offer.interface";
import {NgForOf} from "@angular/common";
import {environment} from "../../../environments";

@Component({
  selector: 'app-all-offers',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './all-offers.component.html',
  styleUrl: './all-offers.component.scss'
})
export class AllOffersComponent implements OnInit{
  offers: Offer[] = [];
  // url: string = 'http://ec2-18-159-37-230.eu-central-1.compute.amazonaws.com:8000';
  // url = 'http://localhost:8080';
  url = environment.apiUrl
  isOfferVisible: boolean = false;

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
