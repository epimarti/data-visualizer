import { Injectable  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { catchError, flatMap, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

class AuthResponse {
  session_token: string;
}

@Injectable()
export class AuthService {
  private token: string;
  private users: string[] = [ 'urtoob', 'swagtv', 'shinynewclient' ];
  private pwds: string[] = [ 'ToobRU', 'bling$bling', 'siriusblack' ];
  private currentUser: number;

  constructor(private http: HttpClient) {
    this.currentUser = 0;
    this.token = null;
  }

  getUsers() {
    return this.users;
  }

  getUser() {
    return this.users[this.currentUser];
  }

  getUserToken(): Observable<AuthResponse> {
    if (this.token) {
      const t = new AuthResponse();
      t.session_token = this.token;
      return of(t);
    }
    return this.getToken();
  }

  setUser (index: number): Observable<AuthResponse> {
    return this.logout().flatMap(_ => {
      this.currentUser = index;
      return this.getToken();
    });
  }

  private logout(): Observable<any> {
    if (this.token) {
      return this.http
      .post('http://localhost:3000/logout',
      'session_token=' + this.token,
      httpOptions);
    }
    return of();
  }

  private getToken(): Observable<AuthResponse> {
    return this.http
    .post<AuthResponse>('http://localhost:3000/auth',
    'identifiant=' + this.users[this.currentUser] + '&password=' + this.pwds[this.currentUser],
    httpOptions)
    .pipe(
      tap(respone => this.token = respone.session_token),
      catchError(this.handleError('getToken', new AuthResponse())));
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        console.log(`${operation} failed: ${error.message}`);

        return of(result as T);
      };
    }
  }
