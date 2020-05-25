import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { UserService } from 'src/app/services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userService:UserService) { }

  ngOnInit() {
    M.AutoInit();
  }

}
