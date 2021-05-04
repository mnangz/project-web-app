import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  url = environment.url;

  constructor(private http: HttpClient) {
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  allEmployees(): Observable<any> {
    return this.http.get(`${this.url}/api/users`).pipe(
      map(this.extractData),
    );
  }

  register(credentials) {
    return this.http.post(`${this.url}/api/user/register`, credentials);
  }

  update(credentials) {
    return this.http.patch(`${this.url}/api//user/edit`, credentials);
  }

  removeEmployee(id) {
    return this.http.delete(`${this.url}/api/user/delete/${id}`);
  }

  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    username: new FormControl('', Validators.required),
    isAdmin: new FormControl(null),
    isNurse: new FormControl(null),
    isEntrance: new FormControl(null),
    isEmployee: new FormControl(null),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    __v: new FormControl(null),
  });

  initializeFormGroup() {
    this.form.setValue({
      _id: null,
      username: '',
      isAdmin: null,
      isNurse: null,
      isEntrance: null,
      isEmployee: null,
      password: '',
      __v: null,
    });
  }

  populateForm(employee) {
    this.form.patchValue(employee);
  }

}
