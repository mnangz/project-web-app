import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  url = environment.url;

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getAllBadges(): Observable<any> {
    return this.http.get(`${this.url}/api/badges`).pipe(
      map(this.extractData),
    );
  }
}
