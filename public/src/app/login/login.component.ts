import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import { UserService } from "../services/user.service";
import {Md5} from "md5-typescript";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  password;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
	  this.loginForm =  new FormGroup({
			email: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required])
		});
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let formData = this.loginForm.value;
    
    this.userService.authenticate(formData.email,Md5.init(formData.password))
      .subscribe(
        data => {
          
          //this.loginForm.value.password = '';
          if(data)
          {
            
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('user_id', data.id.toString());
            localStorage.setItem('role_id', data.role_id.toString());
            console.log(typeof(data.role_id), 'type of', data.role_id)


            if(data.role_id==1){
              this.router.navigateByUrl('/UsersComponent', { skipLocationChange: true }).then(() => {
                this.router.navigate(['users']);
            });
              this.router.navigate(['users']);
            }else{
              this.router.navigate(['task-dashboard']);
            }
          }
          
        },
        error => {
          this.loginForm.value.password = '';
          this.password = '';
        	console.log(error);
          alert(error.error.message);
        });
  }

  register() {
    this.router.navigate(['register']);
  }

}
