import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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

  constructor(public http:HttpClient, private router: Router) { 
    this.getStorage();
  }

  createUser(user:User){
    console.log("Service create user");
    //let url = URL_SERVICES + '/create';
    let url = URL_SERVICES + '/user';
    console.log("Esto es lo que enviare a donde lo tenga que enviar",user);
      
    return this.http.post(url,user).map((res:any)=>{
      console.log("creado",res)
      swal("¡Felicidades!", "felicidades", "success");
      
    return true;
  }).catch(err=>{
    console.log(err.status);
    return Observable.throw(err);
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
    let url = URL_SERVICES + '/login';

    return this.http.post(url,user).map((res:any)=>{
        localStorage.setItem('id',res.id);
        localStorage.setItem('email',res.email);
        localStorage.setItem('token',res.token);
        localStorage.setItem('step','1');
        this.token = res.token;
        this.email = res.email;
        this.id = res.id;
        swal("¡Felicidades!", "Inicio de sesión exitoso.", "success");
        //this.router.navigate(["dashboard",{id:this.step}]); ///revisar donde quedara
        this.router.navigate(["dashboard"]);
      return true;
    })  
  }

  localStep(){
    return this.http.get("http://localhost:3002/step");
  }

  

}
