import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api = 'https://sheet.best/api/sheets/393c33a4-8ceb-4b89-a432-46157508fa0e'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getUserList():Observable<User[]>{
    return this.httpClient.get<User[]>(this.api);
  }

  getUser(id: string):Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.api}/ID/${id}`)
  }

  postUser(user: User):Observable<User>{
    return this.httpClient.post<User>(this.api, user, this.httpOptions)
  }

  updateUser(id: string, user: User):Observable<User>{
    return this.httpClient.put<User>(`${this.api}/ID/${id}`, user, this.httpOptions)
  }

  deleteUser(id: number): Observable<User>{
    return this.httpClient.delete<User>(`${this.api}/ID/${id}`)
  }
}
