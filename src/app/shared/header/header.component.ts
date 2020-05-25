import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isLogged = false;

  constructor(public userService:UserService) { }

  ngOnInit() {
    M.AutoInit();
  }

}
