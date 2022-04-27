import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api = 'https://sheet.best/api/sheets/5d92918d-007d-41cf-97c4-8aadbede74b3'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getUserList():Observable<User[]>{
    return this.httpClient.get<User[]>(this.api);
  }

  postUser(user: User):Observable<User>{
    return this.httpClient.post<User>(this.api, user, this.httpOptions)
  }
}
