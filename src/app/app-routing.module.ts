import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login/login.component'

const routes: Routes = [
                        {path: 'login', component: LoginComponent}
                        //{path: '**', redirectTo: '' }
                        ];
                        

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
