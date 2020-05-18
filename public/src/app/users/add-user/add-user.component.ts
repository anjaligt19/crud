import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
//import { DatePickerOptions, DateModel } from 'ng2-datepicker';
/*https://medium.com/letsboot/lets-pick-a-date-with-ng2-datepicker-1ba2d9593a66*/


import {Md5} from "md5-typescript";



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

	/*date: DateModel;
	  options: DatePickerOptions = {
	    format: 'DD-MM-YYYY',
	    todayText: 'Oggi',
	    style: 'big'
	  };*/
    emailExists= false;

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder) {
	//this.options = new DatePickerOptions();
   }

  addForm: FormGroup;
  submitted: boolean = false;
  url = '';
  role_id=2;
  
  

  ngOnInit() {
		this.addForm = this.formBuilder.group({
            full_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            dob: ['', Validators.required],
            designation: ['', Validators.required],
            role_id:['']
    });
	}

  // convenience getter for easy access to form fields
    get f() { return this.addForm.controls; }

  onSubmit() {
    if(!this.emailExists)
    {
      this.submitted = true;

    	this.addForm.value.password = Md5.init(this.addForm.value.password);
    	this.userService.createUser(this.addForm.value)
        .subscribe( data => {
          this.router.navigate(['users']);
        });
    }
  }


  chkEmailInDB(event) {
    console.log(event.target.value, ' email cv');
    this.userService.checkEmailExists(event.target.value, 0)
      .subscribe( data => {
        if(data!=null)
        {
          console.log(data, 'aaaaaaa');
        this.emailExists = true;
        }else{
          this.emailExists = false;
        }
      });
    return true;
    console.log('called');
  }

}
