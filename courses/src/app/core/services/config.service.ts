import { HttpClient, HttpErrorResponse, HttpEvent, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable} from 'rxjs/internal/Observable';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private currentUserSubject!: BehaviorSubject<User>;
  public currentUser!: Observable<User>;

  constructor(private http : HttpClient) { 
    //this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("currentUser")));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getRequest(url : string, params? : HttpParams){
    this.http.get(url, {params}).subscribe({next : (data) => 
     console.log(data)
     ,
     error: (error: HttpErrorResponse) => {
      console.log(error);
    },
    });
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  login(username : any, password : any) {
    return this.http.post<any>(`/login`, { username, password })
        .pipe(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            //this.currentUserSubject.next(user);
            return user;
        });
}

  //Add other HTTP methods



}
