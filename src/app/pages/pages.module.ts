import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { Ng5SliderModule } from 'ng5-slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApplyComponent } from './apply/apply.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';

import { PAGES_ROUTES } from './pages.routes';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FormsModule } from '@angular/forms';


@NgModule({
    declarations:[
        HomeComponent,
        ApplyComponent,
        PagesComponent,
        DashboardComponent
    ],
    imports:[
        SharedModule,
        Ng5SliderModule,
        BrowserAnimationsModule,
        PAGES_ROUTES,
        FormsModule 
    ],
    exports:[
        HomeComponent,
        ApplyComponent,
        PagesComponent       
    ]
})

export class PagesModule {}