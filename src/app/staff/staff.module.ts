import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BartendingComponent } from './bartending/bartending.component';
import { FormsModule } from '@angular/forms';
import { AdminModule } from '../admin/admin.module';
import { CounterStaffComponent } from './counter-staff/counter-staff.component';
import { API_URLS } from '../config/api-urls';
import { MyLibConfig, MyLibModule, provideMyLib } from 'my-lib';


const myLibConfig: MyLibConfig = {
  hubUrl: API_URLS.hub,
  apiUrl: API_URLS.api,
  apiUrlChat: API_URLS.api
};

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
    MyLibModule,
    provideMyLib(myLibConfig)

  ]
})
export class StaffModule { }
