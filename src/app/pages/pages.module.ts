import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ApplyComponent } from './apply/apply.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { ServiceModule } from '../services/service.module';
import { Ng5SliderModule } from 'ng5-slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './map/map/map.component';
import { GeocodingComponent } from './map/geocoding/geocoding.component';
import { MapPointFormComponent } from './map/map-point-form/map-point-form.component';
import { ResultsListComponent } from './map/results-list/results-list.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { PickAddressComponent } from './pick-address/pick-address.component';
import { LegalComponent } from './legal/legal.component';
import { AvisodeprivacidadComponent } from './avisodeprivacidad/avisodeprivacidad.component';
import { CcontratoComponent } from './ccontrato/ccontrato.component';
import { AmortizacionComponent } from './amortizacion/amortizacion.component';
import { PagareComponent } from './pagare/pagare.component';
import { CregistroComponent } from './cregistro/cregistro.component';
import { AutorizacionComponent } from './autorizacion/autorizacion.component';
import { EstatusComponent } from './estatus/estatus.component';
import { AvisodeprivacidadintegralComponent } from './avisodeprivacidadintegral/avisodeprivacidadintegral.component';
import { CreditodirectoComponent } from './creditodirecto/creditodirecto.component';

@NgModule({
    declarations:[
        HomeComponent,
        ApplyComponent,
        PagesComponent,
        DashboardComponent,
        MapComponent,
        GeocodingComponent,
        MapPointFormComponent,
        ResultsListComponent,
        PickAddressComponent,
        LegalComponent,
        AvisodeprivacidadComponent,
        AmortizacionComponent,
        CcontratoComponent,
        PagareComponent,
        CregistroComponent,
        AutorizacionComponent,
        EstatusComponent,
        AvisodeprivacidadintegralComponent,
        CreditodirectoComponent
    ],
    imports:[
        GooglePlaceModule,
        AgmCoreModule.forRoot({
          // please get your own API key here:
          // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
          apiKey: 'AIzaSyCseZ0trHuyvuZlNh6TXxz1-6OJhXfXaww'
        }),
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng5SliderModule,
        BrowserAnimationsModule,
        PAGES_ROUTES,
        FormsModule,
        RecaptchaModule,
        ServiceModule,
        LeafletModule
    ],
    exports:[
        HomeComponent,
        ApplyComponent,
        PagesComponent,
        SharedModule
    ]
})

export class PagesModule {}