import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../model/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {

//API server base URL
private apiServerUrl = environment.apiBaseUrl;

//Inject HTTPClient in the service layer constructor
constructor(private http: HttpClient) { }

public getUsers(): Observable<User[]>{
  return this.http.get<User[]>(`${this.apiServerUrl}/users/all`)
}

public addUser(user: User): Observable<User>{
  return this.http.post<User>(`${this.apiServerUrl}/users/add`, user)
}

  public updateUser(user: User): Observable<User>{
    return this.http.put<User>(`${this.apiServerUrl}/users/update`, user)
  }

   public deleteUser(userId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/users/delete/${userId}`)
  }

}
