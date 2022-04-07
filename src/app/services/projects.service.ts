import { Injectable } from '@angular/core';
import Project from "../models/project";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {deserializeArray, plainToClass, plainToInstance} from "class-transformer";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private api: ApiService, private httpClient: HttpClient) {}

  baseUrl: string = 'http://localhost:3000/projects';

  getProjects() {
    return this.httpClient.get<Project[]>(`${this.baseUrl}/projects`)
  }
}
