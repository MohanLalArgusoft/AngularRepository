import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  token: string;
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    cpass: new FormControl(null, [Validators.required])
  });

  constructor(private _route: Router, private _userService: UserService) { }

  ngOnInit() {
  }

  moveToLogin() {
    this._route.navigate(['/login']);
  }

  register() {
    if (!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value)) {
      console.log('Invalid form'); return;
    }
    this._userService.register(JSON.stringify(this.registerForm.value)).subscribe(
      data => {
        console.log(data),
          this.token = JSON.stringify(data),
          // console.log(this.token);
          localStorage.setItem('token', this.token),
          this._route.navigate(['/login'])
      },
      error => console.log(error)
    )
    console.log(JSON.stringify(this.registerForm.value));
  }

}
