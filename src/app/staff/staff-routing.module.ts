import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BartendingComponent } from './bartending/bartending.component';
import { EmployeeService } from '../services/employee.service';
import { CounterStaffComponent } from './counter-staff/counter-staff.component';

const routes: Routes = [
  { path: 'staff/bartending/:funId', component: BartendingComponent, canActivate: [EmployeeService] },
  { path: 'staff/counter-staff/:funId', component: CounterStaffComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
