import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BartendingComponent } from './bartending/bartending.component';
import { EmployeeService } from '../services/employee.service';

const routes: Routes = [
  { path: 'staff/bartending/:funId', component: BartendingComponent, canActivate: [EmployeeService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
