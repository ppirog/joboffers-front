import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

interface Offer {
  id: string;
  url: string;
  jobTitle: string;
  companyName: string;
  salary: string;
}
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{
  offers: Offer[] = [];


  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
  }
  HomeClick(){
  }

  ngOnInit(): void {

  }
  LogoutClick() {
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }
}
