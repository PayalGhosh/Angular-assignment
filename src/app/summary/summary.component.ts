import { Component, OnInit } from '@angular/core';
import { EventService } from '../data/event.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(private eventService : EventService) { }

  public eventGroups = [];
  ngOnInit() {
    this.eventService.displayEvents().subscribe(
      (response) => this.eventGroups = response
    )}
    
  }