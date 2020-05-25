import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { User } from '../../models/user.model';
import { URL_SERVICES } from '../../config/config';

import 'rxjs/add/operator/map';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token:string;

  constructor(public http:HttpClient) { 
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

  login(user:User){
    //console.log("Service login");
    let url = URL_SERVICES + '/login';

    return this.http.post(url,user).map((res:any)=>{
        //localStorage.setItem('id',res.id);
        localStorage.setItem('token',res.token);
        swal("¡Felicidades!", "Inicio de sesión exitoso.", "success");

      return true;
    })  
  }

  localStep(){
    return this.http.get("http://localhost:3002/step");
  }

  

}
