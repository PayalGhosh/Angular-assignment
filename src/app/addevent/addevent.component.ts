import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Event } from '../data/Event';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {

  event:Event={
    name:null,
    startDate:null,
    endDate:null,    
    revenue:null
  };

  constructor(private dataService:DataService) { }

  ngOnInit() {
  }

  checkValidations(form : NgForm){
      console.log(form.valid);
  }

  onSubmit(){
      this.dataService.postEvent(this.event).subscribe(
        result => console.log('success',result),
        error => console.log('error',error));
  }

}
