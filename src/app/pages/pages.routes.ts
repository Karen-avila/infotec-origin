import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';

import { HomeComponent } from './home/home.component';
import { ApplyComponent } from './apply/apply.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { MapComponent } from './map/map/map.component';


const pagesRoutes: Routes = [
    {
        path: '', 
        component: PagesComponent,
       
        children: [
          {path: 'home', component: HomeComponent},
          {path: 'apply', component: ApplyComponent},
          {path: 'map', component: MapComponent, canActivate: [LoginGuardGuard]},
          {path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuardGuard]},
          {path: '', redirectTo: '/home', pathMatch: 'full' },
        ]
      },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);