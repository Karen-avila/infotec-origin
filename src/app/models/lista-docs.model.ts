export class ListaDocs{

    constructor(){


        return this.docs();
    }

        docs(){
            let docs:any = [
                {
                    name: "Ver Caratula de Contrato",
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
                    name: "Ver Autorización para investigación de Crédito",
                    ref: "#autorizo"
                },
                {
                    name: "Ver Solicitud de Contratación",
                    ref: "#solcred"
                },
                {
                    name: "Ver Contrato de Adheción",
                    ref: "#contratcred"
                }
            ]
            return docs;
        }


  }