import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { User } from '../../models/user.model';
import { URL_SERVICES } from '../../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token:string;
  email:string;
  id:string; 
  values:any;

  constructor(public http:HttpClient, private router: Router) { 
    this.getStorage();
  }


  
  createUser(user:User){
    console.log("Service create user");
    /*   */ //infotec
    let url =  '/registros'; //infotec
    //let url = URL_SERVICES + '/user'; //local
    const object = JSON.stringify(user);
    /* const body = {"email":"gustavo.espindola@fintecheando.mx",
                    "password":"passworD1",
                    "rePassword":"passworD1"} */
     

    console.log("Esto es lo que enviare a donde lo tenga que enviar",object);

    const headers = new HttpHeaders({'X-Gravitee-Api-Key':'20b1d990-c522-44dc-85bd-ef16d364abc4',
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

  createUserL(user:User) {
    console.log("create user");
    console.log("Esto es lo que enviare a donde lo tenga que enviar",user);
    
    return {as: user};
  }

  getStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
    }else{
      this.token = '';
    }
  }

  isLogged(){
    return (this.token.length > 5) ? true : false;
  }

  logout(){
      this.token = '';
      this.email = '';
      this.id = '';
      localStorage.clear();
      this.router.navigate(["home"]);
  }

  login(user:User){
    //console.log("Service login");
    //localStorage.setItem('step','2');
    let url = URL_SERVICES + '/login';

    return this.http.post(url,user).map((res:any)=>{
        //localStorage.setItem('id',res.id);
        localStorage.setItem('email',res.email);
        //localStorage.setItem('token',res.token);
        //localStorage.setItem('step','1');
        //this.token = res.token;
        this.email = res.email;
        //this.id = res.id;
        //swal("¡Felicidades!", "Inicio de sesión exitoso.", "success");
        //this.router.navigate(["dashboard",{id:this.step}]); ///revisar donde quedara
        this.router.navigate(["register"]);
      return true;
    })  
  }

  localStep(){
    return this.http.get("http://localhost:3002/step");
  }

  

}
