import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import {TaskService} from "../../services/task.service";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private router: Router, private taskService: TaskService, private userService: UserService, private formBuilder: FormBuilder) { }
  addForm: FormGroup;
  submitted: boolean = false;
  url = '';
  users = <any>[];
  //assign_to;

  ngOnInit() {
  	//this.assign_to = "";
  	this.addForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: [this.users.description, Validators.required],
            user_id: ['', Validators.required]
        });

  	this.userService.getUsers(localStorage.getItem("user_id"))
      .subscribe( data => {
        this.users = data;
      });

    
  }

  onSubmit() {
    this.submitted = true;
  	
  	console.log(this.addForm.value, 'added data');
    this.taskService.createTask(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['tasks']);
      });
  }

}
