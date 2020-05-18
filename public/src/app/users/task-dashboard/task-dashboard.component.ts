import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { Task } from '../../task';
import {first} from "rxjs/operators";
declare var $: any;


@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {
	taskData = <any>{};
  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
  	let id = localStorage.getItem("user_id");
  	this.taskService.getUsersTasks(parseInt(id))
      .subscribe( res => {
      	this.taskData.toDoTask = res.toDoTask;
      	this.taskData.inProgTask = res.inProgTask;
      	this.taskData.compTask = res.compTask;
      	console.log(this.taskData, 'task res');
        //this.tasks = res.data;
        //this.t = res.data;
      });



      /*$(document).ready(function() {
	     $('#draggable-move').draggable({
			cursor: "move"
			});

			$('#draggable-pointer').draggable({
			cursor: "pointer",
			cursorAt: { top: -5, left: -5 }
			});

			$('#draggable-crosshair').draggable({
			cursor: "crosshair",
			cursorAt: { bottom: 0 }
			});
	   });*/
  }

  updateTaskStatus(task, status): void {
  	let updateData={"id": '', "status": ""};
  	task.status = status;
  	task.id = task.id;
  	console.log(updateData, 'ooo');
  	this.taskService.updateTask(task)
      .pipe(first())
      .subscribe(
        data => {
        	if(status==1)
        	{
        		this.taskData.toDoTask = this.taskData.toDoTask.filter(t => t !== task);
        		this.taskData.inProgTask.push(task);
        	}else{
        		this.taskData.inProgTask = this.taskData.inProgTask.filter(t => t !== task);
        		this.taskData.compTask.push(task)
        	}
          //this.router.navigate(['tasks-dashboard']);
        },
        error => {
          alert(error);
        });
  }

}
