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
import { StaffTableComponent } from './staff-table/staff-table.component';
import { StaffTableListComponent } from './staff-table/staff-table-list/staff-table-list.component';
import { StaffTableKabanComponent } from './staff-table/staff-table-kaban/staff-table-kaban.component';
import { StaffTableAddComponent } from './staff-table/staff-table-add/staff-table-add.component';
import { StaffSelectOrderTypeComponent } from './staff-table/staff-select-order-type/staff-select-order-type.component';
import { StaffOrderAddComponent } from './staff-table/staff-order-add/staff-order-add.component';
import { StaffOrderComponent } from './staff-order/staff-order.component';
import { StaffOrderUdquantityComponent } from './staff-order/staff-order-udquantity/staff-order-udquantity.component';
import { StaffOrderMenuAddComponent } from './staff-order/staff-order-menu-add/staff-order-menu-add.component';


const myLibConfig: MyLibConfig = {
  hubUrl: API_URLS.hub,
  apiUrl: API_URLS.api,
  apiUrlChat: API_URLS.api
};

@NgModule({
  declarations: [
    BartendingComponent,
    CounterStaffComponent,
    StaffTableComponent,
    StaffTableListComponent,
    StaffTableKabanComponent,
    StaffTableAddComponent,
    StaffSelectOrderTypeComponent,
    StaffOrderAddComponent,
    StaffOrderComponent,
    StaffOrderUdquantityComponent,
    StaffOrderMenuAddComponent,
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
