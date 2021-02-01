import { Component, OnInit } from '@angular/core';
import { EventService } from '../data/event.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  pageOfItems: Array<any>;

  public years = [];
  public months = [];
  public selectedYears = [];
  public selectedMonths = [];
  error: boolean;

  constructor(private eventService: EventService) { }

  public eventGroups = [];
  ngOnInit() {

    this.eventService.getYearValues().subscribe(
      (response) => this.years = response,
      (error) => this.error = true
    );

    this.eventService.displayEvents().subscribe(
      (response) => this.eventGroups = response,
      (error) => this.error = true);
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  filter(){
    if (this.selectedYears.length > 0 && this.selectedMonths.length == 0) {
      this.eventService.displayEventsByYear(this.selectedYears).subscribe(
        (response) => this.eventGroups = response,
        (error) => this.error = true);
    }
    else if (this.selectedYears.length == 0 && this.selectedMonths.length > 0) {
      this.eventService.displayEventsByMonth(this.selectedMonths).subscribe(
        (response) => this.eventGroups = response,
        (error) => this.error = true);
    }
    else if (this.selectedYears.length > 0 && this.selectedMonths.length > 0) {
      this.eventService.displayEventsByYearAndMonth(this.selectedYears, this.selectedMonths).subscribe(
        (response) => this.eventGroups = response,
        (error) => this.error = true);
    }
    else {
      this.eventService.displayEvents().subscribe(
        (response) => this.eventGroups = response,
        (error) => this.error = true);
    }
  }

  populateYears(year, status: boolean) {
    if (status && this.selectedYears.indexOf(year) === -1) {
      this.selectedYears.push(year);
      this.filter();
    }
    else if (!status) {
      this.selectedYears.splice(this.selectedYears.indexOf(year), 1)
      this.filter();
    }
  }

  populateMonths(month, status: boolean) {
    if (status && this.selectedMonths.indexOf(month) === -1) {
      this.selectedMonths.push(month);
      this.filter();
    }
    else if (!status) {
      this.selectedMonths.splice(this.selectedMonths.indexOf(month), 1)
      this.filter();
    }
  }
}

