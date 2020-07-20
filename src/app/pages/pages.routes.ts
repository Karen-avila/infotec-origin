import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';

import { HomeComponent } from './home/home.component';
import { ApplyComponent } from './apply/apply.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { MapComponent } from './map/map/map.component';
import { AvisodeprivacidadComponent } from './avisodeprivacidad/avisodeprivacidad.component';
import { LegalComponent } from './legal/legal.component';


const pagesRoutes: Routes = [
    {
        path: '', 
        component: PagesComponent,
       
        children: [
          {path: 'home', component: HomeComponent},
          {path: 'apply', component: ApplyComponent},
          {path: 'map', component: MapComponent},
          /* {path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuardGuard]}, */
          {path: 'dashboard', component: DashboardComponent},
          {path: 'avisodeprivacidad', component: AvisodeprivacidadComponent},
          {path: 'legal', component: LegalComponent},
          {path: '', redirectTo: '/home', pathMatch: 'full' },
        ]
      },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);