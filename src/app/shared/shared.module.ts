import { NgModule } from "@angular/core";
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PdfComponent } from './pdf/pdf.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { QuestionComponent } from './question/question/question.component';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalcComponent } from './calc/calc.component';

import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
    declarations:[
        HeaderComponent,
        FooterComponent,
        PdfComponent,
        QuestionComponent,
        CalcComponent
    ],
    exports:[
        HeaderComponent,
        FooterComponent,
        PdfComponent,
        QuestionComponent,
        CalcComponent   
    ],
    imports:[
        Ng5SliderModule,
        PdfViewerModule,
        BrowserModule,
        FormsModule, 
        ReactiveFormsModule
    ]
})

export class SharedModule{}