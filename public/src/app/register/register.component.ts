import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { UserService } from "../services/user.service";
import { User } from '../user';
import {first} from "rxjs/operators";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Md5} from "md5-typescript";


import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';






@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
  role_id=2;
  submitted = false;
  emailExists= false;

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  dateForm: FormGroup;


  myDateForm: FormGroup;
  myFromDate: FormControl;
  myToDate: FormControl;

  //model: NgbDateStruct;
  model;
  date: { year: number, month: number };
  //@ViewChild('dp') dp: NgbDatepicker;

  constructor(private http: HttpClient, private router: Router, private userService: UserService, private formBuilder: FormBuilder, private calendar: NgbCalendar) { }

  ngOnInit() {
  	this.registerForm = this.formBuilder.group({
            full_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            dob: ['', Validators.required],
            designation: ['', Validators.required],
            role_id:['']
        });
  }
      get f() { return this.registerForm.controls; }


  onSubmit() {
  	if(!this.emailExists)
  	{
  		this.submitted = true;
	    if(this.registerForm.value.password!='')
	    {
	  		this.registerForm.value.password = Md5.init(this.registerForm.value.password);
	    }
	  	console.log(this.registerForm.value, 'added data');
	    this.userService.createUser(this.registerForm.value)
	      .subscribe( data => {
	      	alert("Registered successfully, once admin approved you can login");
	        this.router.navigate(['/']);
	      });
  	}
    
  }

  chkEmailInDB(event) {
  	console.log(event.target.value, ' email cv');
  	this.userService.checkEmailExists(event.target.value, 0)
      .subscribe( data => {
      	if(data!=null)
      	{
			    this.emailExists = true;
      	}else{
      		this.emailExists = false;
      	}
      });
  	return true;
  	console.log('called');
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      let dateObj = new Date(this.toDate.year, this.toDate.month, this.toDate.day);
      this.myDateForm.controls.myFromDate.setValue(dateObj);
    } else {
      this.toDate = null;
      this.fromDate = date;
      let dateObj = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day);
      this.myDateForm.controls.myToDate.setValue(dateObj);
    }
  }

}
