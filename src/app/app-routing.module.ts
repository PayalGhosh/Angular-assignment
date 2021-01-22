import { AddeventComponent } from './addevent/addevent.component';
import { SummaryComponent } from './summary/summary.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: AddeventComponent},
  { path: 'summary', component: SummaryComponent},
  { path: 'addevent', component: AddeventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
