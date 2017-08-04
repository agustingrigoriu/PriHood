import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
  private restApiURL_Users = 'http://localhost:8080';

  constructor(private http: Http){
  }

  postUserCredentials(): Observable<Response>{
    var datos = JSON.stringify({usuario:'Lucas',password:'123'})
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.restApiURL_Users, datos,{headers})
    //Incompleto
  }
}  