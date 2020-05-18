import { Component, OnInit } from '@angular/core';

import {TaskService} from "../../services/task.service";
import {Router} from "@angular/router";
import {Task} from "../../task";
import {FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import {first} from "rxjs/operators";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  task: Task;
  //users = <any>[];
  editForm: FormGroup;
  users = <any>[];
  constructor(private router: Router, private taskService: TaskService, private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  	let taskId = localStorage.getItem("editTaskId");
    if(!taskId) {
      alert("Invalid action.")
      this.router.navigate(['tasks']);
      return;
    }

    this.userService.getUsers(localStorage.getItem("user_id"))
      .subscribe( data => {
        this.users = data;
      });

    this.editForm =  this.formBuilder.group({
    	id:  [''],
            name: ['', Validators.required],
            description: ['', Validators.required],
            user_id: ['', Validators.required],
            status: ['']
        });

    this.taskService.getTaskById(+taskId)
      .subscribe( data => {
      	this.editForm.setValue(data);
      	});
  }


  onSubmit() {
  	console.log(this.editForm.value);
    this.taskService.updateTask(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['tasks']);
        },
        error => {
          alert(error);
        });
  }

}
