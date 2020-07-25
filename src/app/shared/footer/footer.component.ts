import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLogged: string;
  constructor(public userService: UserService) { 
    this.isLogged = this.userService.isLogged();
  }
  

  ngOnInit() {
  }

}
