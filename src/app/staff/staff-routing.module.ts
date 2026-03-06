import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BartendingComponent } from './bartending/bartending.component';
import { CounterStaffComponent } from './counter-staff/counter-staff.component';
import { Userservice } from '../services/Userservice';

const routes: Routes = [
  { path: 'staff/bartending/:funId', component: BartendingComponent, canActivate: [Userservice] },
  { path: 'staff/counter-staff/:funId', component: CounterStaffComponent },
  
];  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
