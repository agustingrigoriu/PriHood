import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Login } from '../app/models/login.model';

@Injectable()
export class ApiRequestService {
  constructor(protected http: HttpClient) { }

  public BASE_URL = 'http://localhost:5000';

  post<T>(api, data?): Promise<Request<T>> {
    const params = this.getAuth();
    return this.http.post<Request<T>>(`${this.BASE_URL}/api/${api}`, data, { params }).toPromise().catch(this.handlerError);
  }

  put<T>(api, data?): Promise<Request<T>> {
    const params = this.getAuth();
    return this.http.put<Request<T>>(`${this.BASE_URL}/api/${api}`, data, { params }).toPromise().catch(this.handlerError);
  }

  delete<T>(api): Promise<Request<T>> {
    const params = this.getAuth();
    return this.http.delete<Request<T>>(`${this.BASE_URL}/api/${api}`, { params }).toPromise().catch(this.handlerError);
  }

  get<T>(api): Promise<Request<T>> {
    const params = this.getAuth();
    return this.http.get<Request<T>>(`${this.BASE_URL}/api/${api}`, { params }).toPromise().catch(this.handlerError);
  }

  upload<T>(api, data, file: File, input = 'file'): Promise<Request<T>> {
    const form = new FormData();
    const params = this.getAuth();

    for (let key in data) {
      form.append(key, data[key]);
    }

    form.append(input, file, file.name);

    return this.http.post<Request<T>>(`${this.BASE_URL}/api/${api}`, form, { params }).toPromise();
  }

  handlerError(err): Request<any> {
    return { error: true, data: null };
  }

  private getAuth() {
    try {
      const json = window.localStorage.getItem('SessionPrihood');
      const session: Login = JSON.parse(json);
      const params = new HttpParams().set('access_token', session.token);

      return params;
    } catch (error) {
      return new HttpParams();
    }
  }
}

export interface Request<T> {
  error: Boolean,
  data: T
}