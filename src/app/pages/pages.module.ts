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

import { MapComponent        } from './map/map.component';
import { MapControlComponent } from './map/map-control/map-control.component';

import { INIT_COORDS } from '../tokens';

@NgModule({
    declarations:[
        HomeComponent,
        ApplyComponent,
        PagesComponent,
        DashboardComponent,
        MapComponent,
        MapControlComponent
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
        ServiceModule
    ],
    exports:[
        HomeComponent,
        ApplyComponent,
        PagesComponent,
        SharedModule
    ],
    providers: [{ provide: INIT_COORDS, useValue: {lat: 21.118, long: -101.041} }]
})

export class PagesModule {}