import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { TaskService } from "../services/task.service";
import { Task } from '../task';
import {first} from "rxjs/operators";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
	//tasks: Task[];
	
	tasks = <any>{};

  constructor(private http: HttpClient, private router: Router, private taskService: TaskService) { }

  ngOnInit() {
  	this.taskService.getTasks()
      .subscribe( res => {
      	console.log(res, 'task res');
        this.tasks = res;
        //this.t = res.data;
      });
  }

  addTask(): void {
    this.router.navigate(['add-task']);
  };

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id)
      .subscribe( data => {
        this.tasks.data = this.tasks.data.filter(t => t !== task);
      })
  };

  editTask(task: Task): void {
    
    localStorage.removeItem("editTaskId");
    localStorage.setItem("editTaskId", task.id.toString());
    this.router.navigate(['edit-task']);
  };

}
