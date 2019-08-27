import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  studentForm : FormGroup = new FormGroup({
    rollno: new FormControl(null, [Validators.required]),
    studentname: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required]),
    total: new FormControl(null, [Validators.required])
  });

  constructor(private _route: Router, private _userService: UserService,private toastr:ToastrService) { }

  ngOnInit() {
  }

  loaddata(){
    this._route.navigate(['/read']);
  }

  logout(){
    localStorage.removeItem('token'),
    this._route.navigate(['/login'])
  }
  
  submit(){
    if (!this.studentForm.valid) {
      console.log('Invalid form'); return;
    }
    this._userService.submittodb(JSON.stringify(this.studentForm.value)).subscribe(
      data => {
        console.log(data)
        this.showSuccess()
          // this.token = JSON.stringify(data),
          // console.log(this.token);
          // localStorage.setItem('token', this.token),
          //this._route.navigate(['/login'])
      },
      error => console.log(error)
    )
    //console.log(JSON.stringify(this.studentForm.value));
  }

  showSuccess() {
    this.toastr.success('Data is Inserted Successfully', 'Success!');
  }

}
