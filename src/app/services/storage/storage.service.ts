import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

const SecureStorage = require('secure-web-storage');
const SECRET_KEY = 'secret_key';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor() { }

  public secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
      key = CryptoJS.SHA256(key, SECRET_KEY);
 
      return key.toString();
    },
    encrypt: function encrypt(data) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);
 
      data = data.toString();
 
      return data;
    },
    decrypt: function decrypt(data) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);
 
      data = data.toString(CryptoJS.enc.Utf8);
 
      return data;
    }
  });

   // Set the json data to local 
   setJsonValue(key: string, value: any) {
    this.secureStorage.setItem(key, value);
  }

  // Get the json value from local 
  getJsonValue(key: string) {
    return this.secureStorage.getItem(key);

  }// Clear the local 
  clearToken() {
    return this.secureStorage.clear();
  }
}
