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

@NgModule({
    declarations:[
        HomeComponent,
        ApplyComponent,
        PagesComponent,
        DashboardComponent,
        MapComponent,
        GeocodingComponent,
        MapPointFormComponent,
        ResultsListComponent
    ],
    imports:[
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