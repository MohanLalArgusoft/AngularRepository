import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  Emp: string[];

  constructor(private _route: Router, private _userService: UserService,private toastr: ToastrService) {

  }


  ngOnInit() {
    this._userService.loadalldata().subscribe(data => {
      console.log(data);
      this.Emp = data as string[];
    });
  }

  logout() {
    localStorage.removeItem('token'),
      this._route.navigate(['/login'])
  }



  delete(id: number) {
    console.log(id);
    this._userService.deletedb(id).subscribe(data => {
      console.log(data);
      this.showWarning();
      this._route.navigateByUrl('/create', { skipLocationChange: true }).then(() =>
        this._route.navigate(['/read']));
    });

  }

  showWarning() {
    this.toastr.warning('Data is deleted from database !.', 'Deleted !');
  }
}
