import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form:FormGroup;

  constructor() { }

  ngOnInit() {
    
    this.form = new FormGroup({
      codigo: new FormControl(null,[Validators.required]),
      token: new FormControl(null, [Validators.required])
   });

  }

  validacion(){

  }

}
