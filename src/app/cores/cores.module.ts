import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminToolbarComponent } from './layout-admin/admin-toolbar/admin-toolbar.component';
import { HeaderComponent } from './layout-admin/header/header.component';
import { SidebarComponent } from './layout-admin/sidebar/sidebar.component';
import { LayoutComponent } from './layout-admin/layout.component';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormAddComponent } from './layout-admin/form-add/form-add.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { TableStatusComponent } from './table-status/table-status.component';



@NgModule({
  declarations: [
    AdminToolbarComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
    FormAddComponent,
    ConfirmModalComponent,
    TableStatusComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    SharedModule,
    DragDropModule,
  ],
  exports: [
    LayoutComponent,
    FormAddComponent,
    ConfirmModalComponent,
    TableStatusComponent
  ]
})
export class CoresModule { }
