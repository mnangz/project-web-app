import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AccesslogService {

  url = environment.url;


  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getLogs(): Observable<any> {
    return this.http.get(`${this.url}/api/accesslog`).pipe(
      map(this.extractData),
    );
  }
}
