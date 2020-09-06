import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor(public http: HttpClient) { 
    
  }

  
/* SCORE */

scoreDirSend(payload) {

  let clientid = localStorage.getItem('clientid');
  let url = environment.apis_url + '/V1.0/fineract-protected/datatables/Direccion/' + clientid;
  let api_keys = environment.gravitee_api_keys;
  let headers = environment.headers_apis;
  headers['X-Gravitee-Api-Key'] = api_keys['fineract'];
  return this.http.post(url, payload, { headers: headers }).map((res: any) => {
    return res;
  }).catch(err => {
    return err;
  });

}

scoreRepSend(payload) {

  let clientid = localStorage.getItem('clientid');
  let url = environment.apis_url + '/V1.0/fineract-protected/datatables/Reputacion/' + clientid;
  let api_keys = environment.gravitee_api_keys;
  let headers = environment.headers_apis;
  headers['X-Gravitee-Api-Key'] = api_keys['fineract'];
  return this.http.post(url, payload, { headers: headers }).map((res: any) => {
    return res;
  }).catch(err => {
    return err;
  });

}

scorePerfMerc(payload) {

  let clientid = localStorage.getItem('clientid');
  let url = environment.apis_url + '/V1.0/fineract-protected/datatables/perfil_de_mercado/' + clientid ;
  let api_keys = environment.gravitee_api_keys;
  let headers = environment.headers_apis;
  headers['X-Gravitee-Api-Key'] = api_keys['fineract'];
  return this.http.post(url, payload, { headers: headers }).map((res: any) => {
    return res;
  }).catch(err => {
    return err;
  });

}

scorePerfNeg(payload) {

  let clientid = localStorage.getItem('clientid');
  let url = environment.apis_url + '/V1.0/fineract-protected/datatables/perfil_del_negocio/' + clientid;
  let api_keys = environment.gravitee_api_keys;
  let headers = environment.headers_apis;
  headers['X-Gravitee-Api-Key'] = api_keys['fineract'];
  return this.http.post(url, payload, { headers: headers }).map((res: any) => {
    return res;
  }).catch(err => {
    return err;
  });

}

/* SOCIOECONOMICOS */

queremosConocerte(payload) {

  let clientid = localStorage.getItem('clientid');
  let url = environment.apis_url + '/V1.0/fineract-protected/datatables/queremos_conocerte/' + clientid;
  let api_keys = environment.gravitee_api_keys;
  let headers = environment.headers_apis;
  headers['X-Gravitee-Api-Key'] = api_keys['fineract'];
  return this.http.post(url, payload, { headers: headers }).map((res: any) => {
    return res;
  }).catch(err => {
    return err;
  });

}

queremosConocerNegocio(payload) {

  let clientid = localStorage.getItem('clientid');
  let url = environment.apis_url + '/V1.0/fineract-protected/datatables/analisis_de_negocio/' + clientid;
  let api_keys = environment.gravitee_api_keys;
  let headers = environment.headers_apis;
  headers['X-Gravitee-Api-Key'] = api_keys['fineract'];
  return this.http.post(url, payload, { headers: headers }).map((res: any) => {
    return res;
  }).catch(err => {
    return err;
  });

}

/* CAPACIDAD DE PAGO */


capacidadPago(payload) {

  let url = environment.apis_url + '/V1.0/banbi/creditosimple/registro';
  let headers = environment.headers_apis;
  let api_keys = environment.gravitee_api_keys;
  headers['X-Gravitee-Api-Key'] = api_keys['registro'];
 


  return this.http.post(url, payload, { headers }).pipe(
    map((res: any) => {
     // //console.log(res)
      return true;
    }),
    catchError(err => {
      // //console.log(err)
      return throwError(err);
    })
  );

}

}
