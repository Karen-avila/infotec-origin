import { NgModule } from "@angular/core";
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PdfComponent } from './pdf/pdf.component';

@NgModule({
    declarations:[
        HeaderComponent,
        FooterComponent,
        PdfComponent
    ],
    exports:[
        HeaderComponent,
        FooterComponent,
        PdfComponent    
    ]
})

export class SharedModule{}