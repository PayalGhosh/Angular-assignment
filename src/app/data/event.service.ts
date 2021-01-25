import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from './Event';
import { HttpClient } from '@angular/common/http';
import { EventGroup } from './EventGroup';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  constructor(private http:HttpClient) { }

  postEvent(event : Event){
    // return of(event);
    return this.http.post<Event>("http://localhost:8090/events/add",event);
  }

  displayEvents():Observable<EventGroup[]>{
    return this.http.get<EventGroup[]>("http://localhost:8090/events/group");
  }
}
