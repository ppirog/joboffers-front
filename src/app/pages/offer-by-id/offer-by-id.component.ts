import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Offer} from "../offer.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router, RouterOutlet} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {catchError, finalize, tap, throwError} from "rxjs";
import {FormsModule} from "@angular/forms";
import {environment} from "../../../environments";
@Component({
  selector: 'app-offer-by-id',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterOutlet,
    FormsModule
  ],
  templateUrl: './offer-by-id.component.html',
  styleUrl: './offer-by-id.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferByIdComponent {
  // url: string = 'http://ec2-18-159-37-230.eu-central-1.compute.amazonaws.com:8000';
  url = environment.apiUrl;

  offerId: string = '';
  offer: Offer | null = null ;
  loading: boolean = false;
  error: string | null = null;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private cdr:ChangeDetectorRef,
  ) {
  }
  findOfferClick() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.cookieService.get('token'));
    this.loading = true;
    this.error = null;

    this.http.get<any>(`${this.url}/offers/${this.offerId}`, { headers })
      .pipe(
      tap(response => {
        this.offer = response;
        console.log(response)
      }),
      catchError(error => {
        this.error = error.error.message;
        return throwError(error);
      }),
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
    ).subscribe();

  }
}
