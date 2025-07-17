import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BartendingComponent } from './bartending/bartending.component';


@NgModule({
  declarations: [
    BartendingComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    DragDropModule
  ]
})
export class StaffModule { }
