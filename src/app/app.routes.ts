import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {LayoutComponent} from "./pages/layout/layout.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AllOffersComponent} from "./pages/all-offers/all-offers.component";
import {OfferByIdComponent} from "./pages/offer-by-id/offer-by-id.component";
import {AddOfferComponent} from "./pages/add-offer/add-offer.component";

export const routes: Routes = [


    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '', component: LayoutComponent,
      children: [
        {
          path: 'dashboard',
          component: DashboardComponent
        },
        {
          path: 'allOffers',
          component: AllOffersComponent
        },
        {
          path: 'byId',
          component: OfferByIdComponent,

        },
        {
          path: 'addOffer',
          component: AddOfferComponent
        }
      ]
    },

    { path: '**', redirectTo: '/login' }
];
