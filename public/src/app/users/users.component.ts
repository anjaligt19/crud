import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { UserService } from "../services/user.service";
import { User } from '../user';
import {first} from "rxjs/operators";



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  ngOnInit() {
    //window.location.reload();
    let id = localStorage.getItem("user_id");
  	this.userService.getUsers(id)
      .subscribe( data => {
        this.users = data;
      });
  }

  addUser(): void {
    this.router.navigate(['add-user']);
  };

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  editUser(user: User): void {
    console.log(user.id, 'id');
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  };

  updateStatus(user: User): void {
    if(user.is_active==1)
    {
      user.is_active = 0;
    }else{
      user.is_active = 1;
    }
    this.userService.updateUser(user)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['users']);
        },
        error => {
          alert(error);
        });
  }

}
