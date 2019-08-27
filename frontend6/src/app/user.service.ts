import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ObserversModule } from '@angular/cdk/observers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  register(body: any) {
    return this._http.post('http://127.0.0.1:3000/users/register', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  login(body: any) {
    return this._http.post('http://127.0.0.1:3000/users/login', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  submittodb(body: any) {
    return this._http.post('http://127.0.0.1:3000/students/create', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  loadalldata() {
    return this._http.get('http://127.0.0.1:3000/students/read', {
      // withCredentials: true,
      // headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  updatedb(body:any){
    return this._http.put('http://127.0.0.1:3000/students/update', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  deletedb(id:number){
    console.log(id);
    return this._http.delete('http://127.0.0.1:3000/students/delete/'+id ,{
      withCredentials: true,
      // headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
}
