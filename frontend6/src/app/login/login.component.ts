import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token: string;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(private _route: Router, private _userService: UserService) { }

  ngOnInit() {
  }

  moveToRegister() {
    this._route.navigate(['/register']);
  }

  login() {

    if (!this.loginForm.valid) {
      console.log('Invalid form'); return;
    }
    this._userService.login(JSON.stringify(this.loginForm.value)).subscribe(
      data => {
        console.log(data),
          this.token = JSON.stringify(data),
          // console.log(this.token);
          localStorage.setItem('token', this.token),
          this._route.navigate(['/user'])
      },
      error => console.log(error)
    )
    console.log(JSON.stringify(this.loginForm.value));

  }
}
