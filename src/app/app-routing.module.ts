import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login/login.component'
import { PdfComponent } from './pdf/pdf/pdf.component';

const routes: Routes = [
                        {path: 'login', component: LoginComponent},
                        {path: 'pdf', component: PdfComponent},
                        //{path: '**', redirectTo: '' }
                        ];
                        

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
