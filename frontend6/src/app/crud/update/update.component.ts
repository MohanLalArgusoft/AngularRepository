import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {


  studentForm : FormGroup = new FormGroup({
    rollno: new FormControl(null, [Validators.required]),
    studentname: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required]),
    total: new FormControl(null, [Validators.required])
  });


  constructor(private _route: Router, private _userService: UserService,private toastr:ToastrService) { 
    
  }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('token'),
    this._route.navigate(['/login'])
  }

  loaddata(){
    this._route.navigate(['/read']);
  }

  update(){
    if (!this.studentForm.valid) {
      console.log('Invalid form'); return;
    }
    this._userService.updatedb(JSON.stringify(this.studentForm.value)).subscribe(
      data => {
        console.log(data)
        this.showInfo()
          // this.token = JSON.stringify(data),
          // console.log(this.token);
          // localStorage.setItem('token', this.token),
          //this._route.navigate(['/login'])
      },
      error => console.log(error)
    )
    console.log(JSON.stringify(this.studentForm.value));
  }

  showInfo() {
    this.toastr.info('Given Details is updated successfully !');
  }
}
