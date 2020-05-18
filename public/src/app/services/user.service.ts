import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../user";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }
  baseUrl: string = 'http://localhost:8080/api/';

  getUsers(id) {
    return this.http.get<User[]>(this.baseUrl + 'usersbyrole/'+id);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl + 'users', user);
  }

  getUserById(id: number) {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + 'users/', user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + 'users/' + id);
  }

  authenticate(email: string, password: string) {
    return this.http.get<User>(this.baseUrl + 'authenticate?email=' + email + '&password=' + password);
  }

  checkEmailExists(email: string, id) {
    return this.http.get(this.baseUrl + 'users/checkEmailExists?email=' + email + '&id=' + id);
  }

  
  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    this.http.delete(this.baseUrl + 'logout/' + localStorage.getItem('access_token')).subscribe(
      res => { 
        localStorage.clear();

        if (localStorage.removeItem('access_token') == null) {
          this.router.navigate(['/']);
        }

      });
    
    
  }
}
