import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    title: 'Home - Paynex'
  },
  { 
    path: 'merchants', 
    component: MerchantsComponent,
    title: 'Merchant Management - Paynex'
  },
  { 
    path: '404', 
    component: NotFoundComponent,
    title: '404 Not Found - Paynex'
  },
  { 
    path: '**', 
    redirectTo: '/404'
  }
];
