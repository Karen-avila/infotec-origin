import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanDataService {

  constructor(public http: HttpClient) { 

  }

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
  
      return this.http.get<any>(url, { headers: headers });
  }

}

/* repaymentSchedule */
/* https://apis-pre.bancodelbienestar.com.mx/V1.0/fineract-protected/loans/180106?associations=all&exclude=guarantors,futureSchedule */