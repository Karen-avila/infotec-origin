import { Component, OnInit } from '@angular/core';


import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  output: any;
  signInForm: NgForm;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  onSignInSubmit() {

   // this.output = null;

console.log("login component")
this.router.navigate(["dashboard"]);
  }

  }
