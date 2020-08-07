import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(public http: HttpClient) { }

/* SCORE */

  scoreDirSend(data) {
/*     let url = environment.mifos_url + '/fineract-provider/api/v1/self/authentication';
    let headers = environment.headers_mifos;
    let api_keys = environment.gravitee_api_keys;
    headers['X-Gravitee-Api-Key'] = api_keys['fineract'];
    //console.log(user);
    const object = JSON.stringify(user);

    // //console.log("Esto es lo que enviare a donde lo tenga que enviar", object);

    return this.http.post(url, object, { headers }).pipe(
      map((res: any) => {
        console.log("login",res)
        swal("¡Felicidades!", "Inicio de sesión exitoso.", "success");
        localStorage.setItem('clientid', res.clientId);
        localStorage.setItem('token', res.authenticated);
        return true;
      }),
      catchError(err => {
        if (err.status == 0) {
          swal('Existio un error al procesar tu solicitud intentalo más tarde');
        } else if (err.status == 401) {
          swal('Verifica que tu usuario/contraseña sean correctos');
        }
        this.prosessing = false;
        return throwError(err);
      })
    ); */
  }


}
