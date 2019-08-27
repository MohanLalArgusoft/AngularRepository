import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  constructor(private _route: Router, private _userService: UserService) { }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('token'),
    this._route.navigate(['/login'])
  }
}
