import {ChangeDetectorRef, Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {Offer} from "../offer.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {catchError, finalize, tap, throwError} from "rxjs";
import {FormsModule} from "@angular/forms";
import {environment} from "../../../environments";

@Component({
  selector: 'app-delete-offer',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './delete-offer.component.html',
  styleUrl: './delete-offer.component.scss'
})
export class DeleteOfferComponent {
  url = environment.apiUrl;

  offerId: string = '';
  offer: Offer | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private cdr: ChangeDetectorRef
  ) {
  }

  deleteOfferClick() {
    let token = sessionStorage['token'];

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);
    this.loading = true;
    this.error = null;

    this.http.delete<any>(`${this.url}/offers/${this.offerId}`, {headers})
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
