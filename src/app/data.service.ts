import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable()
export class DataService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  getInfo() {
    return this.http.post('http://localhost:3000/myinfo', 'session_token=' + this.auth.getUserToken(), httpOptions)
    .pipe(tap(r => console.log(r)));
  }

  getStreams() {
    return this.http.post('http://localhost:3000/streams',
                          'session_token=' + this.auth.getUserToken(),
                           httpOptions)
    .pipe(tap(r => console.log(r)));
  }
  getBandwidth() {
    return this.http.post('http://localhost:3000/streams',
                          'session_token=' + this.auth.getUserToken(),
                           httpOptions)
    .pipe(tap(r => console.log(r)));
  }
  getAudience() {
    return this.http.post('http://localhost:3000/streams',
                          'session_token=' + this.auth.getUserToken(),
                           httpOptions)
                           .pipe(tap(r => console.log(r)));
  }
  getCountries() {
    return this.http.post('http://localhost:3000/streams',
                          'session_token=' + this.auth.getUserToken(),
                           httpOptions)
                           .pipe(tap(r => console.log(r)));
  }
  getIsps() {
    return this.http.post('http://localhost:3000/streams',
                          'session_token=' + this.auth.getUserToken(),
                           httpOptions)
                           .pipe(tap(r => console.log(r)));
  }
  getPlatforms() {
    return this.http.post('http://localhost:3000/streams',
                          'session_token=' + this.auth.getUserToken(),
                           httpOptions)
          .pipe(tap(r => console.log(r)));
  }
}
