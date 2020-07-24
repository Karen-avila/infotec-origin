import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

import { User } from '../../models/user.model';
import { UserLog } from '../../models/user-log.module';
import { UserActivate } from '../../models/user-activate.module';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import swal from 'sweetalert';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string;
  email: string;
  id: string;
  values: any;

  prosessing: Boolean = false;

  constructor(public http: HttpClient, private router: Router) {
    this.getStorage();
  }

  createUser(user: User) {
    // console.log("Service create user");
    const object = JSON.stringify(user);

    let url = environment.apis_url + '/V1.0/banbi/creditosimple/registro';
    let headers = environment.headers_apis;
    let api_keys = environment.gravitee_api_keys;
    headers['X-Gravitee-Api-Key'] = api_keys['registro'];

    // console.log("Esto es lo que enviare a donde lo tenga que enviar", object);

    return this.http.post(url, object, { headers }).map((res: any) => {
      // console.log("creado", res)
      swal("¡Felicidades!", "Felicidades usuario creado correctamente.", "success");

      return true;
    }).catch(err => {
      console.log(err.status);
      return err;
    });

  }

  activate(user: UserActivate) {
    // console.log("Service activate user");

    let url = environment.apis_url + '/V1.0/banbi/creditosimple/registro';
    let headers = environment.headers_apis;
    let api_keys = environment.gravitee_api_keys;
    headers['X-Gravitee-Api-Key'] = api_keys['registro'];

    const object = JSON.stringify(user);

    // console.log("Esto es lo que enviare a donde lo tenga que enviar", object);

    return this.http.post(url, object, { headers }).map((res: any) => {
      // console.log("creado", res)
      swal("¡Felicidades!", "Felicidades usuario activado correctamente.", "success");

      return true;
    }).catch(err => {
      // console.log(err.status);
      return err;
    });

  }

  sendPersonalData(data) {
    // console.log("Service create user");
    let url = environment.apis_url + '/V1.0/banbi/creditosimple/registro';
    let headers = environment.headers_apis;
    let api_keys = environment.gravitee_api_keys;
    headers['X-Gravitee-Api-Key'] = api_keys['registro'];

    const object = JSON.stringify(data);
    return this.http.post(url, object, { headers }).map((res: any) => {
      // console.log("creado", res)
      swal("¡Felicidades!", "Información guardada correctamente.", "success");

      return true;
    }).catch(err => {
      swal('Existio un error' + err.status);
      this.prosessing = false;
      console.log(err.status);
      return err;
    });
  }

  getStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  isLogged() {
    return localStorage.getItem('token');
  }

  logout() {
    this.token = '';
    this.email = '';
    this.id = '';
    localStorage.clear();
    this.router.navigate(["home"]);
  }

  login(user: UserLog) {
    let url = environment.mifos_url + '/fineract-provider/api/v1/self/authentication';
    let headers = environment.headers_mifos;
    let api_keys = environment.gravitee_api_keys;
    headers['X-Gravitee-Api-Key'] = api_keys['fineract'];
    const object = JSON.stringify(user);

    // console.log("Esto es lo que enviare a donde lo tenga que enviar", object);

    return this.http.post(url, object, { headers }).map((res: any) => {
      // console.log("creado", res)
      swal("¡Felicidades!", "Inicio de sesión exitoso.", "success");
      localStorage.setItem('clientid', res.clientId);
      localStorage.setItem('token', res.authenticated);
      return true;
    }).catch(err => {
      if (err.status == 0) {
        swal('Existio un error al procesar tu solicitud intentalo más tarde');
      } else if (err.status == 401) {
        swal('Verifica que tu usuario/contraseña sean correctos');
      }
      this.prosessing = false;
      console.log(err);
      return err;
    });
  }

  sendDocuments(name: any, file: File) {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('name', name);
    // console.log("Document Service");
    let clientid = localStorage.getItem('clientid');
    let url = environment.apis_url + '/V1.0/fineract-protected/clients/' + clientid + '/documents';
    let api_keys = environment.gravitee_api_keys;
    /* let headers = environment.headers_apis; */
    /* var headers :Array=[];
    headers['X-Gravitee-Api-Key'] = api_keys['fineract']; */
    /* headers['Content-Type'] = 'multipart/form-data; boundary=---011000010111000001101001';
    delete headers['Content-Type']; */
    const httpHeaders = new HttpHeaders({'X-Gravitee-Api-Key':api_keys['fineract']});
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: httpHeaders
    });

    return this.http.request(req);
  }

  sendIdentification(data) {
    // console.log("Document Service");
    let clientid = localStorage.getItem('clientid');
    let url = environment.apis_url + '/V1.0/fineract-protected/clients/' + clientid + '/identifiers';
    let api_keys = environment.gravitee_api_keys;
    let headers = environment.headers_apis;
    headers['X-Gravitee-Api-Key'] = api_keys['fineract'];

    const object = JSON.stringify(data);

    //const object = JSON.stringify(userDocs);
    return this.http.post(url, object, { headers: headers }).map((res: any) => {
      // console.log("Enviados", res)
      return res;
    }).catch(err => {
      if (err.status == '0') {
        swal('Existio un error al procesar tu solicitud de identificación, intentalo más tarde');
      }
      this.prosessing = false;
      console.log(err);
      return err;
    });
  }

  validateFileExtension(fileName: String) {
    var _validFileExtensions = [".jpg", ".jpeg", ".pdf", ".png"];    
    var isValid = false;
    if (fileName.length > 0) {
        for (var j = 0; j < _validFileExtensions.length; j++) {
            var extension = _validFileExtensions[j];
            if (fileName.substr(fileName.length - extension.length, extension.length).toLowerCase() == extension.toLowerCase()) {
              isValid = true;
              break;
            }
        }
    }
    return isValid;
  }
}
