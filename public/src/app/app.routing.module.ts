import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { TaskDashboardComponent } from './users/task-dashboard/task-dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from "./auth.guard";



@NgModule({
  declarations: [ 
    LoginComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    TasksComponent,
    AddTaskComponent,
    EditTaskComponent,
    TaskDashboardComponent,
    RegisterComponent
  ],
  imports: [
  BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path : '', component : LoginComponent},
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard] },
      { path: 'edit-user', component: EditUserComponent, canActivate: [AuthGuard] },
      { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
      { path: 'add-task', component: AddTaskComponent, canActivate: [AuthGuard] },
      { path: 'edit-task', component: EditTaskComponent, canActivate: [AuthGuard] },
      { path: 'task-dashboard', component: TaskDashboardComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent },
      { path: '**', redirectTo: 'login' }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [],

})
export class AppRoutingModule {}


