import {ChangeDetectorRef, Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router, RouterOutlet} from "@angular/router";
import {Offer} from "../offer.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {catchError, finalize, tap, throwError} from "rxjs";
import {environment} from "../../../environments";

@Component({
  selector: 'app-add-offer',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterOutlet,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterOutlet
  ],
  templateUrl: './add-offer.component.html',
  styleUrl: './add-offer.component.scss'
})
export class AddOfferComponent {
  url = environment.apiUrl;

  offer: Offer = {
    id: '',
    url: '',
    jobTitle: '',
    companyName: '',
    salary: ''
  };

  offerResponse: Offer | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  addOfferClick() {
    console.log('Offer object:', this.offer);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.cookieService.get('token'));
    this.loading = true;
    this.error = null;


    this.http.post<any>(`${this.url}/offers`, this.offer, {headers})
      .pipe(
        tap(response => {
          this.offerResponse = response;
          console.log(response)
        }),
        catchError(error => {
          if (error.status === 409) {
            this.error = 'Oferta zostala juz dodana';
          } else if (error.status === 400) {
            this.error = error.errors;
          } else {
            this.error = 'BLAD';
          }
          return throwError(error);
        }),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      ).subscribe();
  }
}
