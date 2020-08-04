import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLogged: string;
  popup;
  
  constructor(public userService: UserService) { 
    this.isLogged = this.userService.isLogged();
  }
  

  ngOnInit() {
    let elems = document.querySelectorAll('.modal');
    this.popup = M.Modal.init(elems);
  }

}
