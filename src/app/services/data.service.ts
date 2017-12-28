import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

const baseUrl = 'http://localhost:3000';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

export class Bandwith {
  timestamp: number[];
  cdn: number[];
  p2p: number[];
}

export class Audience {
  audience: number[][];
}

export class Isp {
  isp: string;
  cdn: number;
  p2p: number;
}

export class Country {
  country: string;
  cdn: number;
  p2p: number;
}

export class Platform {
  platform: string;
  cdn: number;
  p2p: number;
  upload: number;
  max_viewers: number;
}

export class Stream {
  manifest: string;
  cdn: number;
  p2p: number;
  max_viewers: number;
  average_viewers: number;
}

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getInfo(token: string) {
    return this.http.post('/myinfo', 'session_token=' + token, httpOptions);
  }

  getBandwidth(token: string, from: Date, to: Date, aggregate?: string): Observable<Bandwith> {
    return this.post<Bandwith>('/bandwidth',
    'session_token=' + token + '&from=' + from.getTime() + '&to=' + to.getTime());
  }
  getAudience(token: string, from: Date, to: Date, aggregate?: string): Observable<Audience> {
    return this.post<Audience>('/audience',
    'session_token=' + token + '&from=' + from.getTime() + '&to=' + to.getTime());
  }
  getStreams(token: string): Observable<Stream[]> {
    return this.post('/streams', 'session_token=' + token);
  }
  getCountries(token: string): Observable<Country[]> {
    return this.post('/countries', 'session_token=' + token);
  }
  getIsps(token: string): Observable<Isp[]> {
    return this.post('/isps', 'session_token=' + token);
  }
  getPlatforms(token: string): Observable<Platform[]> {
    return this.post('/platforms', 'session_token=' + token);
  }

  private post<T>(path: string, body: string): Observable<T> {
    return this.http.post<T>(baseUrl + path, body, httpOptions)
    .pipe(catchError(this.handleError(`post ${path}`, null)));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
