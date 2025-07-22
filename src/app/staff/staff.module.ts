import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BartendingComponent } from './bartending/bartending.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BartendingComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    DragDropModule,
    FormsModule
  ]
})
export class StaffModule { }
