import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Event } from './Event';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventGroup } from './EventGroup';
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  [x: string]: any;
  


  constructor(private http:HttpClient) { }

  postEvent(event : Event){
    // return of(event);
    return this.http.post<Event>("http://localhost:8090/events/add",event).pipe(
      catchError(this.handleError)
    );
  }

  displayEvents():Observable<EventGroup[]>{
    return this.http.get<EventGroup[]>("http://localhost:8090/events/group").pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
  

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      return throwError(`${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      return throwError(`${error.status}`);
    }
  }

  displayEventsByYear(years):Observable<EventGroup[]>{
    let params = new HttpParams();
    params = params.append('years',years);
    return this.http.get<EventGroup[]>("http://localhost:8090/events/group/year",{params: params});
  }

  displayEventsByMonth(months):Observable<EventGroup[]>{
    let params = new HttpParams();
    params = params.append('months',months);
    return this.http.get<EventGroup[]>("http://localhost:8090/events/group/month",{params: params});
  }

  displayEventsByYearAndMonth(years,months):Observable<EventGroup[]>{
    let params = new HttpParams();
    params = params.append('years',years);
    params = params.append('months',months);
    return this.http.get<EventGroup[]>("http://localhost:8090/events/group/year/month",{params: params});
  }

  getYearValues():Observable<number[]>{
    return this.http.get<number[]>("http://localhost:8090/events/year");
  }
}
