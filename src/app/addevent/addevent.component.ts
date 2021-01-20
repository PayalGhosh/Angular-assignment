import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Event } from '../data/Event';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {

  event:Event={
    end_date:null,
    name:null,
    revenue:null,
    st_date:null
  };

  constructor(private dataService:DataService) { }

  ngOnInit() {
  }

  onSubmit(){
      this.dataService.postEvent(this.event).subscribe(
        result => console.log('success',result),
        error => console.log('error',error));
  }

}
