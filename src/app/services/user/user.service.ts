import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { User } from '../../models/user.model';
import { URL_SERVICES } from '../../config/config';

import 'rxjs/add/operator/map';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token:string;
  email:string;
  id:string;

  constructor(public http:HttpClient, private router: Router) { 
    console.log("user service is run");
  }

  /*isLogged(){
    return (this.token.length > 5 )? true : false;
  }*/

  createUser(user:User){
    console.log("Service create user");
    //let url = URL_SERVICES + '/create';
    let url = URL_SERVICES + '/create';
    console.log("Esto es lo que enviare a donde lo tenga que enviar",user);
      
    return this.http.post(url,user);
  }

  createUserL(user:User) {
    console.log("create user");
    console.log("Esto es lo que enviare a donde lo tenga que enviar",user);
    
    return {as: user};
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
        localStorage.setItem('id',res._id);
        localStorage.setItem('id',res.email);
        localStorage.setItem('token',res.token);
        swal("¡Felicidades!", "Inicio de sesión exitoso.", "success");

      return true;
    })  
  }

  localStep(){
    return this.http.get("http://localhost:3002/step");
  }

  

}
