import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurpService, UserService, LoginGuardGuard, NominatimServiceService } from './service.index';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations:[

    ],
    imports:[
        CommonModule,
        HttpClientModule
    ],
    providers:[
        CurpService,
        UserService,
        NominatimServiceService,
        LoginGuardGuard
    ]
})

export class ServiceModule {}