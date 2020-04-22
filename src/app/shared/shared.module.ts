import { NgModule } from "@angular/core";
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PdfComponent } from './pdf/pdf.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

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
    ],
    imports:[
        PdfViewerModule
    ]
})

export class SharedModule{}