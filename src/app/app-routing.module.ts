import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component'
import { HomeComponent } from './pages/home/home.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { LoginComponent } from './login/login/login.component'

const routes: Routes = [
                        {
                          path: '', 
                          component: PagesComponent,
                          children: [
                            {path: 'home', component: HomeComponent},
                            {path: 'apply', component: ApplyComponent},
                            {path: '', redirectTo: '/home', pathMatch: 'full' },
                          ]
                        },
                          {path: 'login', component: LoginComponent},
                        //{path: '**', redirectTo: '' }
                        ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
