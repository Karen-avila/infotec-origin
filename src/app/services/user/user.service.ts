import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { User } from '../../models/user.model';
import { UserLog } from '../../models/user-log.module';
import { UserActivate } from '../../models/user-activate.module';



import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import swal from 'sweetalert';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  token:string;
  email:string;
  id:string;
  values:any;

  preProd = '6c7180e6-4855-413a-ba3d-0f8c75b97490';
  desarrollo = 'b04b09eb-2176-4925-873c-dd4f8fae9985';

  constructor(public http:HttpClient, private router: Router) {
    this.getStorage();
  }



  createUser(user:User){
    console.log("Service create user");
    /* let url = URL_SERVICES + '/registro'; */
    let url = '/registros'
    const object = JSON.stringify(user);

    console.log("Esto es lo que enviare a donde lo tenga que enviar",object);

    const headers = new HttpHeaders({'X-Gravitee-Api-Key':this.preProd,
    'Content-Type': 'application/json'})


/*
    return this.http.post(url,object,{headers}).map((res:any)=>{
      console.log("creado",res)
      swal("¡Felicidades!", "felicidades", "success");

    return true;
  }).catch(err=>{
    console.log(err.status);
    return Observable.throw(err);
  }); */

  return this.http.post(url,object,{headers}).map(response => {
    console.log(response);
    return response;
}, err => {
    throw err;
});

  }

  activate(user:UserActivate){
    console.log("Service activate user");
    
    let url = '/registros';
    /* let url = URL_SERVICES + '/registro'; */
    const object = JSON.stringify(user);


    console.log("Esto es lo que enviare a donde lo tenga que enviar",object);

    const headers = new HttpHeaders({'X-Gravitee-Api-Key':this.preProd,
    'Content-Type': 'application/json'})


/*
    return this.http.post(url,object,{headers}).map((res:any)=>{
      console.log("creado",res)
      swal("¡Felicidades!", "felicidades", "success");

    return true;
  }).catch(err=>{
    console.log(err.status);
    return Observable.throw(err);
  }); */

  return this.http.post(url,object,{headers}).map(response => {
    console.log(response);
    return response;
}, err => {
    throw err;
});

  }

  sendPersonalData(data) {
    console.log("Service create user");
    /* let url = URL_SERVICES + '/registro'; */
    let url = '/registros';
    const object = JSON.stringify(data);

    console.log("Esto es lo que enviare a donde lo tenga que enviar", object);

    const headers = new HttpHeaders({
      'X-Gravitee-Api-Key': this.preProd,
      'Content-Type': 'application/json'
    })

    return this.http.post(url, object, { headers }).map(response => {
      console.log(response);
      return response;
    }, err => {
      throw err;
    });

  }



  getStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
    }else{
      this.token = '';
    }
  }

  isLogged() {
    return localStorage.getItem('token');
  }

  logout(){
      this.token = '';
      this.email = '';
      this.id = '';
      localStorage.clear();
      this.router.navigate(["home"]);
  }

  login(user: UserLog) {

    console.log("Login Service");

    let url =  environment.mifos_url + '/fineract-provider/api/v1/self/authentication';;
    let headers = environment.headers_mifos;
    const object = JSON.stringify(user);

    console.log("Esto es lo que enviare a donde lo tenga que enviar", object);

    return this.http.post(url,object,{headers}).map((res:any)=>{
      localStorage.setItem('clientId', res.clientId);
      localStorage.setItem('token', res.authenticated);
      swal("¡Felicidades!", "Inicio de sesión exitoso.", "success");
      console.log(res);
      return true;
    })

  }




  }


 


