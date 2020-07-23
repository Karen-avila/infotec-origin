import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../models/user.model';
import { UserLog } from '../../models/user-log.module';
import { UserActivate } from '../../models/user-activate.module';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import swal from 'sweetalert';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment'
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

    // console.log("Esto es lo que enviare a donde lo tenga que enviar", object);

    return this.http.post(url, object, { headers }).map((res: any) => {
      // console.log("creado", res)
      swal("¡Felicidades!", "felicidades", "success");

      return true;
    }).catch(err => {
      console.log(err.status);
      return Observable.throw(err);
    });

  }

  activate(user: UserActivate) {
    // console.log("Service activate user");

    let url = environment.apis_url + '/V1.0/banbi/creditosimple/registro';
    let headers = environment.headers_apis;

    const object = JSON.stringify(user);

    // console.log("Esto es lo que enviare a donde lo tenga que enviar", object);

    return this.http.post(url, object, { headers }).map((res: any) => {
      // console.log("creado", res)
      swal("¡Felicidades!", "felicidades", "success");

      return true;
    }).catch(err => {
      // console.log(err.status);
      return Observable.throw(err);
    });

  }

  sendPersonalData(data) {
    // console.log("Service create user");
    let url = environment.apis_url + '/V1.0/banbi/creditosimple/registro';
    let headers = environment.headers_apis;

    const object = JSON.stringify(data);
    return this.http.post(url, object, { headers }).map((res: any) => {
      // console.log("creado", res)
      swal("¡Felicidades!", "Documentos Guardados", "success");

      return true;
    }).catch(err => {
      swal('Existio un error' + err.status);
      this.prosessing = false;
      console.log(err.status);
      return Observable.throw(err);
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
    const object = JSON.stringify(user);

    // console.log("Esto es lo que enviare a donde lo tenga que enviar", object);

    return this.http.post(url, object, { headers }).map((res: any) => {
      // console.log("creado", res)
      swal("¡Felicidades!", "Inicio de sesión exitoso.", "success");
      localStorage.setItem('clientId', res.clientId);
      localStorage.setItem('token', res.authenticated);
      return true;
    }).catch(err => {
      if (err.status == 0) {
        swal('Existio un error al procesar tu solicitud intentalo mas tarde');
      } else if (err.status == 401) {
        swal('Verifica que tu usuario/contraseña sean correctos');
      }
      this.prosessing = false;
      console.log(err);
      return Observable.throw(err);
    });
  }

  sendDocuments(userDocs) {
    // console.log("Document Service");
    let clientId = localStorage.getItem('clientId');
    let url = environment.mifos_url + '/fineract-provider/api/v1/clients/' + clientId + '/documents';
    let headers = environment.headers_mifos;
    //const object = JSON.stringify(userDocs);
    return this.http.post(url, userDocs, { headers: headers }).map((res: any) => {
      // console.log("Enviados", res)
      swal("¡Felicidades!", "Documentos Guardados", "success");
      return true;
    }).catch(err => {
      if (err.status == '0') {
        swal('Existio un error al procesar tu solicitud intentalo mas tarde');
      }
      this.prosessing = false;
      console.log(err);
      return Observable.throw(err);
    });
  }
}
