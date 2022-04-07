import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Project from "../models/project";
import Todo from "../models/todo";
import {FormGroup} from "@angular/forms";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  baseUrl: string = 'https://dencher12-my-tasks.herokuapp.com';

  getProjects() {
    return this.httpClient.get<Project[]>(`${this.baseUrl}/projects`)
  }

  updateTodo(project: Project, todo: Todo) {
    return this.httpClient.patch(`${this.baseUrl}/projects/${project.id}/todos/${todo.id}`, {})
  }

  createTodo(newTodoForm: FormGroup) {
    return this.httpClient.post<Project[]>(`${this.baseUrl}/todos`, newTodoForm.value)
  }
}
