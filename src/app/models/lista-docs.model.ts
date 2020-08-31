export class ListaDocs{

    constructor(){


        return this.docs();
    }

        docs(){
            let docs:any = [
                {
                    name: "Ver Carátula de Contrato",
                    ref: "#ccontrato"
                },
                {
                    name: "Ver Tabla de Amortización",
                    ref: "#tamortizacion"
                },
                {
                    name: "Ver Pagaré",
                    ref: "#pagare"
                },
                {
                    name: "Ver Aviso de Privacidad Integral",
                    ref: "#aprivintegral"
                },
                {
                    name: "Ver Carta Presentación",
                    ref: "#cpresentacion"
                }, 
                {
                    name: "Ver Solicitud de Contratación",
                    ref: "#solcred"
                },
                {
                    name: "Ver Contrato de Adhesión",
                    ref: "#contratcred"
                }
            ]
            return docs;
        }


  }