import {Component, OnInit} from '@angular/core';
import { ApiService } from "../../services/api.service";
import Project from "../../models/project";
import Todo from "../../models/todo";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClientXsrfModule, HttpXsrfTokenExtractor} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private apiService: ApiService, private fb: FormBuilder, private token: HttpXsrfTokenExtractor) { }

  projects: Project[] = [];
  isCreateWindowOpen: boolean = false
  isNewProjectFieldShown: boolean = false
  newTodoForm: FormGroup = this.fb.group({
    project: this.fb.group({
      id: 0,
      title: ''
    }),
    todo: this.fb.group({
      text: ''
    })
  });

  ngOnInit() {
    this.getProjects();
    console.log(this.token.getToken())
  }

  toggleCreateWindow() {
    this.isCreateWindowOpen = !this.isCreateWindowOpen
  }

  toggleNewFieldShown() {
    this.isNewProjectFieldShown = !this.isNewProjectFieldShown
  }

  submit() {
    this.apiService.createTodo(this.newTodoForm).subscribe((projects) => {
      this.projects = projects
      this.toggleCreateWindow()
    })
  }

  getProjects() {
    this.apiService.getProjects().subscribe((projects) => this.projects = projects);
  }

  updateTodo(project: Project, todo: Todo) {
    this.apiService.updateTodo(project, todo).subscribe(() => todo.isCompleted = !todo.isCompleted)
  }
}
