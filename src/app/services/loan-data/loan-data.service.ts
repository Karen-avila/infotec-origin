import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

import {Subject} from 'rxjs/Subject';

import { environment } from '../../../environments/environment';



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

  sendContract(payload){
    console.log("el payload",payload)
    const formData: FormData = new FormData();

    for (const key in payload) {
      formData.append(key, payload[key]);    
    }

    let url = environment.apis_url + '/V1.0/banbi/firma';
    let headers = environment.headers_apis;
    let api_keys = environment.gravitee_api_keys;
    const httpHeaders = new HttpHeaders({ 'X-Gravitee-Api-Key': api_keys['firma'] });
    
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: httpHeaders
    });

   

   return this.http.request(req);


  }

  /* sendContract(){
    this.firma.next("123qwe123wqesafsgt5gggyhd");
  } */


}

/* repaymentSchedule */
/* https://apis-pre.bancodelbienestar.com.mx/V1.0/fineract-protected/loans/180106?associations=all&exclude=guarantors,futureSchedule */