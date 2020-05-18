import { Component } from '@angular/core';
import { UserService } from "./services/user.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  role_id = localStorage.getItem("role_id");
  
  constructor(public userService: UserService) { }

  ngOnInit() {
  	/*if(this.role_id!==null) {
      //this.globals.isLogin = true;
    }*/
    //this.role_id = localStorage.getItem("role_id");
    console.log(this.role_id, 'aa');
  }

  logout() {
    this.userService.logout()
  }
}


/*https://www.techiediaries.com/angular-9-8-mean-stack-authentication-tutorial-and-example-with-node-and-mongodb/


https://stackblitz.com/edit/angular-8-registration-login-example?file=app%2F_services%2Falert.service.ts
*/