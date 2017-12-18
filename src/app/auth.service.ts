import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

export class AuthResponse {
  session_token: string;
}

@Injectable()
export class AuthService implements OnInit {
  private token: string;
  private users: string[] = [ 'urtoob', 'swagtv', 'shinynewclient' ];
  private pwds: string[] = [ 'ToobRU', 'bling$bling', 'siriusblack' ];
  private currentUser: number;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.currentUser = 0;
    this.getToken()
    .subscribe(response => this.token = response.session_token);
  }

  getUsers() {
     return this.users;
  }

  getUser() {
    return this.users[this.currentUser];
  }

  getUserToken() {
    return this.token;
  }

  setUser (index: number) {
    this.logout();
    this.currentUser = index;
    this.getToken()
    .subscribe(response => this.token = response.session_token);
  }

  private logout() {
    this.http
    .post('http://localhost:3000/auth',
          'sesstion_token=' + this.token,
          httpOptions);
  }

  private getToken(): Observable<AuthResponse> {
    return this.http
    .post<AuthResponse>('http://localhost:3000/auth',
          'identifiant=' + this.users[this.currentUser] + '&password=' + this.pwds[this.currentUser],
          httpOptions)
    .pipe(
      tap(r => console.log(r)),
      catchError(this.handleError('getToken', new AuthResponse())));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
