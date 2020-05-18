import { Component, OnInit } from '@angular/core';

import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../user";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  emailExists= false;
  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  	let userId = localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['users']);
      return;
    }

    this.editForm =  this.formBuilder.group({
            full_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            //password: ['', [Validators.required, Validators.minLength(6)]],
            dob: ['', Validators.required],
            designation: ['', Validators.required],
            id:[''],
            is_active:['']
    });

    this.userService.getUserById(+userId)
      .subscribe( data => {
      	this.editForm.setValue(data);
      	});
  }

  // convenience getter for easy access to form fields
    get f() { return this.editForm.controls; }

  onSubmit() {
    this.userService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['users']);
        },
        error => {
          alert(error);
        });
  }

  chkEmailInDB(event) {
    console.log(event.target.value, ' email cv');
    this.userService.checkEmailExists(event.target.value, localStorage.getItem("editUserId"))
      .subscribe( data => {
        if(data!=null)
        {
          this.emailExists = true;
        }else{
          this.emailExists = false;
        }
      });
    return true;
  }

}
