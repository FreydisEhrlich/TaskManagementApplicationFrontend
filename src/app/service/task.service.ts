import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Task } from '../model/task';



@Injectable({
  providedIn: 'root'
})
export class TaskService {

//API server base URL
private apiServerUrl = environment.apiBaseUrl;

//Inject HTTPClient in the service layer constructor
constructor(private http: HttpClient) { }

public getTasks(): Observable<Task[]>{
  return this.http.get<Task[]>(`${this.apiServerUrl}/task/all`)
}

public addTask(task: Task): Observable<Task>{
  return this.http.post<Task>(`${this.apiServerUrl}/task/add`, task)
}

  public updateTask(task: Task): Observable<Task>{
    return this.http.put<Task>(`${this.apiServerUrl}/task/update`, task)
  }

   public deleteTask(taskId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/task/delete/${taskId}`)
  }

}
