import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	role_id = localStorage.getItem("role_id");
  constructor(private http: HttpClient, private router: Router, public userService: UserService) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout()
  }

}
