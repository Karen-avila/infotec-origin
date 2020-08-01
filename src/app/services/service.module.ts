import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurpService, UserService, LoginGuardGuard, NominatimServiceService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { LoanDataService } from './loan-data/loan-data.service';

@NgModule({
    declarations:[

    ],
    imports:[
        CommonModule,
        HttpClientModule
    ],
    providers:[
        LoanDataService,
        CurpService,
        UserService,
        NominatimServiceService,
        LoginGuardGuard
    ]
})

export class ServiceModule {}