import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  url = environment.url;

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getAllQuestionnaires(): Observable<any> {
    return this.http.get(`${this.url}/api/questionnaires`).pipe(
      map(this.extractData),
    );
  }

}
