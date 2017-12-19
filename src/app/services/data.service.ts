import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/mergeMap';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

export class Bandwith {
  timestamp: number[];
  cdn: number[];
  p2p: number[];
}

@Injectable()
export class DataService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  getInfo() {
    return this.http.post('http://localhost:3000/myinfo', 'session_token=' + this.auth.getUserToken(), httpOptions)
    .pipe(tap(r => console.log(r)));
  }

  getBandwidth(from: Date, to: Date, aggregate?: string): Observable<Bandwith> {
    return this.auth.getUserToken().flatMap(auth => {
      return this.http.post<Bandwith>('http://localhost:3000/bandwidth',
      'session_token=' + auth.session_token + '&from=' + from.getTime() + '&to=' + to.getTime(),
      httpOptions);
    });
  }
  getAudience(from: Date, to: Date, aggregate?: string) {
    return this.http.post('http://localhost:3000/audience',
    'session_token=' + this.auth.getUserToken() + '&from=' + from.getTime() + '&to=' + to.getTime(),
    httpOptions)
    .pipe(tap(r => console.log(r)));
  }
  getStreams() {
    return this.http.post('http://localhost:3000/streams',
    'session_token=' + this.auth.getUserToken(),
    httpOptions)
    .pipe(tap(r => console.log(r)));
  }
  getCountries() {
    return this.http.post('http://localhost:3000/countries',
    'session_token=' + this.auth.getUserToken(),
    httpOptions)
    .pipe(tap(r => console.log(r)));
  }
  getIsps() {
    return this.http.post('http://localhost:3000/isps',
    'session_token=' + this.auth.getUserToken(),
    httpOptions)
    .pipe(tap(r => console.log(r)));
  }
  getPlatforms() {
    return this.http.post('http://localhost:3000/platforms',
    'session_token=' + this.auth.getUserToken(),
    httpOptions)
    .pipe(tap(r => console.log(r)));
  }
}
