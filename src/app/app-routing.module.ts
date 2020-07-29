import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login/login.component'
import { RegisterComponent } from './login/activation/register.component'
import { ForgotComponent } from './login/forgot/forgot.component'

const routes: Routes = [
                        {path: 'login', component: LoginComponent},
                        {path: 'activacion', component: RegisterComponent},
                        {path: 'forgot', component: ForgotComponent},

                        //{path: '**', redirectTo: '' }
                        ];
                        

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
