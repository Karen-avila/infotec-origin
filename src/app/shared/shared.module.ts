import { NgModule } from "@angular/core";
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PdfComponent } from './pdf/pdf.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { QuestionComponent } from './question/question/question.component';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations:[
        HeaderComponent,
        FooterComponent,
        PdfComponent,
        QuestionComponent
    ],
    exports:[
        HeaderComponent,
        FooterComponent,
        PdfComponent,
        QuestionComponent   
    ],
    imports:[
        PdfViewerModule,
        BrowserModule,
        FormsModule, 
        ReactiveFormsModule
    ]
})

export class SharedModule{}