import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { User } from '../../models/user.model';
import { UserLog } from '../../models/user-log.model';
import { UserActivate } from '../../models/user-activate.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import swal from 'sweetalert';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import jsSHA from "jssha";
import { ForgotPassword } from 'src/app/models/forgot-password.module';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { StorageService } from '../storage/storage.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userdo={
    nombre:"nombre",
    apellido:"apellido"
  }

  token: string;
  email: string;
  id: string;
  values: any;

  prosessing: Boolean = false;

  constructor(public storageService:StorageService, public http: HttpClient, private router: Router) {
    this.getStorage();
  }

  

  createHash(text: any): string {
    const shaObj = new jsSHA("SHA-256", "TEXT", { encoding: "UTF8" });
    shaObj.update(text);
    return shaObj.getHash("HEX");
  }

  createUser(user: User) {
    // ////console.log("Service create user");
    const object = JSON.stringify(user);

    let url = environment.apis_url + '/V1.0/banbi/creditosimple/registro';
    let headers = environment.headers_apis;
    let api_keys = environment.gravitee_api_keys;
    headers['X-Gravitee-Api-Key'] = api_keys['registro'];
   


    return this.http.post(url, object, { headers }).pipe(
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

  activate(user: UserActivate) {
    // ////console.log("Service activate user");

    let url = environment.apis_url + '/V1.0/banbi/creditosimple/registro';
    let headers = environment.headers_apis;
    let api_keys = environment.gravitee_api_keys;
    headers['X-Gravitee-Api-Key'] = api_keys['registro'];
    const object = JSON.stringify(user);

    return this.http.post(url, object, { headers }).pipe(
      map((res: any) => {
        swal("??Felicidades!", "Felicidades usuario activado correctamente.", "success");
        return true;
      }),
      catchError(err => {
        return throwError(err);
      })
    );


  }

  sendPersonalData(data) {
    // ////console.log("Service create user");
    let url = environment.apis_url + '/V1.0/banbi/creditosimple/registro';
    let headers = environment.headers_apis;
    let api_keys = environment.gravitee_api_keys;
    headers['X-Gravitee-Api-Key'] = api_keys['registro'];

    const object = JSON.stringify(data);
    return this.http.post(url, object, { headers }).map((res: any) => {
      // ////console.log("creado", res)
      swal("??Felicidades!", "Informaci??n guardada correctamente.", "success");

      return true;
    }).catch(err => {
      swal('Existio un error' + err.status);
      this.prosessing = false;
      ////console.log(err.status);
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
    this.id = '';
    localStorage.clear();
    this.router.navigate(["home"]);
  }


  login(user: UserLog) {
    let url = environment.mifos_url + '/fineract-provider/api/v1/self/authentication';
    let headers = environment.headers_mifos;
    let api_keys = environment.gravitee_api_keys;
    headers['X-Gravitee-Api-Key'] = api_keys['fineract'];
    console.log(user);
    const object = JSON.stringify(user);

    // ////console.log("Esto es lo que enviare a donde lo tenga que enviar", object);

    return this.http.post(url, object, { headers }).pipe(
      map((res: any) => {
        console.log("login",res)
        swal("??Felicidades!", "Inicio de sesi??n exitoso.", "success");
        localStorage.setItem('clientid', res.clientId);
        localStorage.setItem('userid', res.userId);
        localStorage.setItem('token', res.authenticated);
        localStorage.setItem('authkey', res.base64EncodedAuthenticationKey);
        localStorage.setItem('email', res.email);
        this.storageService.setJsonValue('userrr', this.userdo);
        console.log("acaaaaaa",this.storageService.getJsonValue('userrr'));
        return true;
      }),
      catchError(err => {
        if (err.status == 0) {
          swal('Existio un error al procesar tu solicitud intentalo m??s tarde');
        } else if (err.status == 401) {
          swal('Verifica que tu usuario/contrase??a sean correctos');
        }
        this.prosessing = false;
        return throwError(err);
      })
    );
  }

  forgot(data) {
    let url = environment.mifos_url + '/fineract-provider/api/v1/self/password/request';
    let headers = environment.headers_mifos;
    let api_keys = environment.gravitee_api_keys;
    headers['X-Gravitee-Api-Key'] = api_keys['fineract'];
    
    const object = JSON.stringify(data);

    

    return this.http.post(url, object, { headers }).pipe(
      map((res: any) => {
       
        //swal("Solicitud recibida", "Envio de Recuperaci??n de Contrase??a.", "success");

        return true;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  newPass(data) {
    let url = environment.mifos_url + '/fineract-provider/api/v1/self/password/renew';
    let headers = environment.headers_mifos;
    let api_keys = environment.gravitee_api_keys;
    headers['X-Gravitee-Api-Key'] = api_keys['fineract'];
    
    const object = JSON.stringify(data);

    

    return this.http.post(url, object, { headers }).pipe(
      map((res: any) => {
       
        //swal("Solicitud recibida", "Envio de Recuperaci??n de Contrase??a.", "success");

        return true;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }


  sendDocuments(name: any, file: File) {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('name', name);
    console.log("Document Service");
    let clientid = localStorage.getItem('clientid');
    let url = environment.apis_url + '/V1.0/fineract-protected/clients/' + clientid + '/documents';
    let api_keys = environment.gravitee_api_keys;

    const httpHeaders = new HttpHeaders({ 'X-Gravitee-Api-Key': api_keys['fineract'] });
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: httpHeaders
    });

    return this.http.request(req);
  }

  sendIdentification(data) {
    // ////console.log("Document Service");
    let clientid = localStorage.getItem('clientid');
    let url = environment.apis_url + '/V1.0/fineract-protected/clients/' + clientid + '/identifiers';
    let api_keys = environment.gravitee_api_keys;
    let headers = environment.headers_apis;
    headers['X-Gravitee-Api-Key'] = api_keys['fineract'];

    const object = JSON.stringify(data);

    //const object = JSON.stringify(userDocs);
    return this.http.post(url, object, { headers: headers }).map((res: any) => {
      // ////console.log("Enviados", res)
      return res;
    }).catch(err => {
      if (err.status == '0') {
        ////console.log('Existio un error al procesar tu identificaci??n, intentalo m??s tarde');
      }
      this.prosessing = false;
      ////console.log(err);
      return err;
    });
  }
  
  getDataCode(codeName: String) {
    this.prosessing = false;
    let url = environment.apis_url + '/V1.0/fineract-protected/codes/' + codeName + '/options';
    let api_keys = environment.gravitee_api_keys;
    let headers = environment.headers_apis;
    headers['X-Gravitee-Api-Key'] = api_keys['fineract'];

    return this.http.get<any>(url, { headers: headers });
  }

  postDataTable(data) {
    let clientid = localStorage.getItem('clientid');
    /* const object = JSON.stringify(data); */
    let url = environment.apis_url + '/V1.0/fineract-protected/datatables/Direccion/' + clientid;
    let api_keys = environment.gravitee_api_keys;
    let headers = environment.headers_apis;
    headers['X-Gravitee-Api-Key'] = api_keys['fineract'];

    return this.http.post(url, data, { headers: headers });
  }

  validateFileExtension(fileName: String) {
    var _validFileExtensions = [".jpg", ".jpeg", ".pdf", ".png", ".cer", ".key"];
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

  sendPersonalReferences(data) {
    let clientid = localStorage.getItem('clientid');/* fineract-provider/api/v1/clients/%7BidCliente%7D/familymembers */
    let url = environment.apis_url + '/V1.0/fineract-protected/clients/' + clientid + '/familymembers';
    let api_keys = environment.gravitee_api_keys;
    let headers = environment.headers_apis;
    headers['X-Gravitee-Api-Key'] = api_keys['fineract'];

    const object = JSON.stringify(data);

    //const object = JSON.stringify(userDocs);
    return this.http.post(url, object, { headers: headers }).map((res: any) => {
      return res;
    }).catch(err => {
      if (err.status == '0') {
        swal('Existio un error al procesar tus referencias personales, intentalo m??s tarde');
      }
      this.prosessing = false;
      ////console.log(err);
      return err;
    });
  }

  validateCurp(curp) {
    const object = JSON.stringify(curp);
    let url = environment.apis_url + '/V1.0/curp/consulta';
    let headers = environment.headers_apis;
    let api_keys = environment.gravitee_api_keys;
    headers['X-Gravitee-Api-Key'] = api_keys['curp'];

    /* return this.http.post(url,object, { headers: headers }); */

    return this.http.post(url,object, { headers: headers }).pipe(
      map((res: any) => {
        ////console.log(res)
        swal("Validaci??n de curp", "??Curp Valida!", "success");
      }),
      catchError(err => {
        return throwError(err);
      })
    );

  }

/*   sendContract(payload){
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
      swal("??Felicidades!", "Documentos Firmados correctamente.", "success");

      return true;
    }).catch(err => {
      swal('Existio un error' + err.status);
      return err;
    });


  } */

}
