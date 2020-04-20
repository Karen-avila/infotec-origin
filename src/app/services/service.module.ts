import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, LoginGuardGuard } from './service.index';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations:[

    ],
    imports:[
        CommonModule,
        HttpClientModule
    ],
    providers:[ 
        UserService,
        LoginGuardGuard
    ]
})

export class ServiceModule {}