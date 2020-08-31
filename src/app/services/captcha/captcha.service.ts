

import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  constructor(public http: HttpClient) { }

  review(token) {

    let url = environment.apis_url + '/V1.0/google/recaptcha';
    let api_keys = environment.gravitee_api_keys;
    let headers = environment.headers_apis;
   // headers['X-Gravitee-Api-Key'] = api_keys['firma'];

    const object = JSON.stringify(token);

    
    return this.http.post(url, token,{headers}).pipe(
      map(res => {
        console.log("se envia",res)
        return true;
      }),
      catchError(err => {
        // //console.log(err)
        console.log("se envia err",err)
        return throwError(err);
      })
    );


/*     return this.http.post(url, object, { headers }).pipe(
      map((res: any) => {
        console.log("login",res)
        return true;
      }),
      catchError(err => {
        console.log("error",err)
        return throwError(err);
      })
    ); */

/*     return this.http.post(url, object, { headers }).map((res: any) => {
      console.log("creado", res)

      return true;
    }).catch(err => {
      console.log("err", err)
      return err;
    }); */


  }

}
