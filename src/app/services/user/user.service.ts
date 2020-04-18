import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { User } from '../../models/user.model';
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { 
    console.log("user service is run");
  }

  createUser(user:User){
    console.log("create user");
    let url = URL_SERVICES + '/create';
    
    return this.http.post(url,user);
  }

  createUserL(user:User){
    console.log("create user");
    console.log("Esto es lo que enviare a donde lo tenga que enviar",user);
    
    return {as: user};
  }

}
