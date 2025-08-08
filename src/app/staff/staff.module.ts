import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BartendingComponent } from './bartending/bartending.component';
import { FormsModule } from '@angular/forms';
import { AdminModule } from '../admin/admin.module';
import { CounterStaffComponent } from './counter-staff/counter-staff.component';
import { MyLibModule } from 'my-lib';


@NgModule({
  declarations: [
    BartendingComponent,
    CounterStaffComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    DragDropModule,
    FormsModule,
    AdminModule,
    MyLibModule
  ]
})
export class StaffModule { }
