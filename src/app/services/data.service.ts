import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DataExampleService {
    constructor(public http:Http) {}

getData() {
    return this.http.get("file://app/dataExample.json")
        .map((res:Response) => res.json()); 
  }
}