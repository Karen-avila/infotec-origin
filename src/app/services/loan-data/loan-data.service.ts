import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

import {Subject} from 'rxjs/Subject';

import { environment } from '../../../environments/environment';

import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class LoanDataService {
  
  
  execChange: Subject<any> = new Subject<any>();
  /*  */
  nombre: Subject<any> = new Subject<any>();
  monto: Subject<any> = new Subject<any>();
  totalPagar: Subject<any> = new Subject<any>();
  noPago: Subject<any> = new Subject<any>();
  fechaLimite: Subject<any> = new Subject<any>();
  saldoInicial: Subject<any> = new Subject<any>();
  pagoCapital: Subject<any> = new Subject<any>();
  interesesPeriodo: Subject<any> = new Subject<any>();
  ivaInteres: Subject<any> = new Subject<any>();
  saldoInsoluto: Subject<any> = new Subject<any>();
  montoPago: Subject<any> = new Subject<any>();
  /*  */

  /*  */
  firma: Subject<any> = new Subject<any>();
  /*  */


  constructor(public http: HttpClient) { 

  }

    /**
     * Use to change user name 
     * @data type: string
     */

  getLoanData() {
    /* DESARROLLO */
   /*  let loanid = '90246';   
    let url = environment.mifos_url + '/fineract-provider/api/v1/loans/' + loanid + '/?associations=all&exclude=guarantors,futureSchedule';
    let headers = environment.provisional_header;
    return this.http.get<any>(url, { headers: headers }); */


    /* PREPROD */

      //let loanid = localStorage.getItem('loanid');
      let loanid = '180106';
      let url = environment.apis_url + '/V1.0/fineract-protected/loans/' + loanid + '/?associations=all&exclude=guarantors,futureSchedule';
      let api_keys = environment.gravitee_api_keys;
      let headers = environment.headers_apis;
      headers['X-Gravitee-Api-Key'] = api_keys['fineract'];
  
      /* return this.http.get<any>(url, { headers: headers }); */
      this.http.get<any>(url, { headers: headers }).subscribe(res=>{
        console.log("amortizacion",res);
        this.nombre.next(res);
      },err=>{

      })
  }

  /* sendContract(payload){
    const formData: FormData = new FormData();

    for (const key in payload) {
      formData.append(key, payload[key]);    
    }

    let url = environment.apis_url + '/V1.0/banbi/creditosimple/firmadocumentos';
    let headers = environment.headers_apis;
    let api_keys = environment.gravitee_api_keys;
    headers['X-Gravitee-Api-Key'] = api_keys['sign']; //falta api de firma

   
    return this.http.post(url, formData, { headers }).map((res: any) => {
      // ////console.log("creado", res)
      swal("¡Felicidades!", "Documentos Firmados correctamente.", "success");

      return true;
    }).catch(err => {
      swal('Existio un error' + err.status);
      return err;
    });


  } */

  sendContract(){
    this.firma.next("123qwe123wqesafsgt5gggyhd");
  }


}

/* repaymentSchedule */
/* https://apis-pre.bancodelbienestar.com.mx/V1.0/fineract-protected/loans/180106?associations=all&exclude=guarantors,futureSchedule */