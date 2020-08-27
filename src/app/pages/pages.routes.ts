import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';

import { HomeComponent } from './home/home.component';
import { ApplyComponent } from './apply/apply.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { MapComponent } from './map/map/map.component';
import { AvisodeprivacidadComponent } from './avisodeprivacidad/avisodeprivacidad.component';
import { LegalComponent } from './legal/legal.component';
import { CcontratoComponent} from './ccontrato/ccontrato.component';
import { CalcComponent } from '../shared/calc/calc.component';
import { AmortizacionComponent } from './amortizacion/amortizacion.component';
import { PagareComponent } from './pagare/pagare.component';
import { CregistroComponent } from './cregistro/cregistro.component';
import { AutorizacionComponent } from './autorizacion/autorizacion.component';
import { EstatusComponent } from './estatus/estatus.component';
import { AvisodeprivacidadintegralComponent } from './avisodeprivacidadintegral/avisodeprivacidadintegral.component';
import { CreditodirectoComponent } from './creditodirecto/creditodirecto.component';
import { ContratodecreditoComponent } from './contratodecredito/contratodecredito.component';
import { SolicituddecreditoComponent } from './solicituddecredito/solicituddecredito.component';
import { TerminosycondicionesComponent } from './terminosycondiciones/terminosycondiciones.component';
import { NuevosdocsComponent } from './nuevosdocs/nuevosdocs.component';
import { CartapresentacionComponent } from './cartapresentacion/cartapresentacion.component';
const pagesRoutes: Routes = [
    {
        path: '', 
        component: PagesComponent,
       
        children: [
          {path: 'home', component: HomeComponent},
          {path: 'apply', component: ApplyComponent},
          {path: 'map', component: MapComponent},
          {path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuardGuard]},
          /* {path: 'dashboard', component: DashboardComponent}, */
          {path: 'avisodeprivacidad', component: AvisodeprivacidadComponent},
          {path: 'legal', component: LegalComponent},
          {path: 'ccontrato', component: CcontratoComponent},
          {path : 'cregistro', component: CregistroComponent },
          {path: '', redirectTo: '/home', pathMatch: 'full' },
          {path: 'amortizacion', component: AmortizacionComponent},
          {path: 'pagare', component: PagareComponent },
          {path: 'autorizacion', component: AutorizacionComponent },
          {path: 'estatus', component: EstatusComponent},
          {path: 'avisodeprivacidadintegral', component: AvisodeprivacidadintegralComponent},
          {path: 'credito', component: CreditodirectoComponent},
          {path: 'contratodecredito', component: ContratodecreditoComponent },
          {path: 'terminosycondiciones', component: TerminosycondicionesComponent},
          {path: 'calc', component: CalcComponent},
          {path: 'nuevosdocumentos', component: NuevosdocsComponent, canActivate: [LoginGuardGuard]},
          {path: 'cartapresentacion', component: CartapresentacionComponent },
          {path: 'solicituddecredito', component: SolicituddecreditoComponent }
        ]
      },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);