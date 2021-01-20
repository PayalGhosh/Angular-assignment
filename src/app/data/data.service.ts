import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Event } from './Event';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _url : string = "src\assets\dbconn\dat.json";

  constructor(private http:HttpClient) { }

  postEvent(event : Event){
    // return of(event);
    return this.http.post<Event>("http://localhost:8090/events/add",event);
  }
}
