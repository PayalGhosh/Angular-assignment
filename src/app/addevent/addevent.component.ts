import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { error } from 'protractor';
import { Event } from '../data/Event';
import { EventService } from '../data/event.service';

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

  error:any={isError:false,errorMessage:''};
  isValidDate:any;
  isValidName:any;
  isValidRevenue:any;
  submitStatus:boolean = false;

  constructor(private eventService:EventService) { }

  ngOnInit() {
  }

  checkValidations(form : NgForm){
      console.log(form.valid);
  }

  onSubmit(){
  
    this.isValidDate = this.validateDates(this.event.startDate, this.event.endDate);
    this.isValidName = this.validateName(this.event.name);
    this.isValidRevenue = this.ValidateRevenue(this.event.revenue);

    if(this.isValidDate && this.isValidName && this.isValidRevenue){

      this.eventService.postEvent(this.event).subscribe(
        result => this.submitStatus = true,
        error => this.handleError(error));
  }
  }
  handleError(error: any): void {
    this.submitStatus = false;
    if(error==500){
      this.error={isError:true,errorMessage:'Event Name already exists.Try again with a different name'};
    }
    else{
      this.error={isError:true,errorMessage:'Event not submitted due to network error'};
    }
    
  }
 
  
  validateName(name: string) {
    this.isValidName = true;
    if((name == null)){
      this.error={isError:true,errorMessage:'Event Name is required.'};
      this.isValidName = false;
    }
    return this.isValidName;
  }

  validateDates(sDate: Date, eDate: Date){
    this.isValidDate = true;
    if((sDate == null)){
      this.error={isError:true,errorMessage:'Start date is required.'};
      this.isValidDate = false;
    }
    if((eDate == null )){
      this.error={isError:true,errorMessage:'End date is required.'};
      this.isValidDate = false;
    }

    if((sDate != null && eDate !=null) && (eDate) < (sDate)){
      this.error={isError:true,errorMessage:'End date should be greater then start date.'};
      this.isValidDate = false;
    }
    return this.isValidDate;
  }
 

 ValidateRevenue(revenue: number){
   console.log(String(revenue).indexOf('.'));
  const reg = new RegExp("^\d+\.\d{1,2}$");
  this.isValidRevenue = true;
  if((revenue == null)){
    this.error={isError:true,errorMessage:'Event Revenue is required.'};
    this.isValidRevenue = false;
  }
  if(isNaN(revenue)){
    this.error={isError:true,errorMessage:'Event Revenue must be a number'};
    this.isValidRevenue = false;
  }
  if((revenue != null) && (revenue<=0)){
    this.error={isError:true,errorMessage:'Event Revenue must be greater than zero'};
    this.isValidRevenue = false;
  }
  if(reg.test(String(revenue))){
    this.error={isError:true,errorMessage:'Event Revenue can only contain 2 digits after decimal'};
    this.isValidRevenue = false;
  }
  return this.isValidRevenue;
}

}
