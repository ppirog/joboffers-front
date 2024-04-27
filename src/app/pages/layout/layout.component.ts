import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import { JwtHelperService } from '@auth0/angular-jwt';
import {NgIf} from "@angular/common";

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
    RouterOutlet,
    NgIf
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{
  offers: Offer[] = [];
  userRole: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
  }
  HomeClick(){
  }

  ngOnInit(): void {
    this.readUserRole();
  }
  readUserRole() {

    let token = sessionStorage['token'];
    const helper = new JwtHelperService();
    const decoded= helper.decodeToken(token);
    console.log(decoded);
    if (decoded && decoded.role) {
      this.userRole = decoded.role;
      console.log('Role:', this.userRole);
    }

  }
  LogoutClick() {
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }
}
