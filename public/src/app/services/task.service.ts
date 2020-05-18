import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Task} from "../task";


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/api/';

  getTasks() {
    return this.http.get<Task[]>(this.baseUrl + 'tasks');
  }

  createTask(task: Task) {
    return this.http.post(this.baseUrl + 'task', task);
  }

  updateTask(task: Task) {
    return this.http.put(this.baseUrl + 'task/', task);
  }

  deleteTask(id: number) {
    return this.http.delete(this.baseUrl + 'task/' + id);
  }

  getTaskById(id: number) {
    return this.http.get<Task>(this.baseUrl + 'task/' + id);
  }

  getUsersTasks(id: number) {
  	return this.http.get<Task>(this.baseUrl + 'getUsersTasks/' + id);
  }

}
