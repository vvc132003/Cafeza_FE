import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { TableComponent } from './pages-admin/table/table.component';
import { TableAddComponent } from './pages-admin/table/table-add/table-add.component';
import { LayoutComponent } from './layout-admin/layout.component';
import { HeaderComponent } from './layout-admin/header/header.component';
import { SidebarComponent } from './layout-admin/sidebar/sidebar.component';
import { AdminToolbarComponent } from './layout-admin/admin-toolbar/admin-toolbar.component';
import { AdminMenuComponent } from './pages-admin/admin-menu/admin-menu.component';
import { AdminMenuAddComponent } from './pages-admin/admin-menu/admin-menu-add/admin-menu-add.component';
import { DrinkDetailComponent } from './pages-admin/admin-menu/drink-detail/drink-detail.component';
import { AdminMenuListComponent } from './pages-admin/admin-menu/admin-menu-list/admin-menu-list.component';
import { CategoryComponent } from './pages-admin/category/category.component';
import { CategoryTreeComponent } from './pages-admin/category/category-tree/category-tree.component';
import { CategoryNodeComponent } from './pages-admin/category/category-tree/category-node/category-node.component';
import { CategoryAddComponent } from './pages-admin/category/category-add/category-add.component';
import { CategoryIconComponent } from './pages-admin/category/category-add/category-icon/category-icon.component';
import { TableListComponent } from './pages-admin/table/table-list/table-list.component';
import { OrderComponent } from './pages-admin/order/order.component';
import { OrderAddComponent } from './pages-admin/order/order-add/order-add.component';
import { SelectOrderTypeComponent } from './pages-admin/table/select-order-type/select-order-type.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ImgComponent } from 'src/app/core/img/img.component';
import { ImgsComponent } from 'src/app/core/imgs/imgs.component';
import { FormAddComponent } from 'src/app/core/form-add/form-add.component';

@NgModule({
  declarations: [
    AdminComponent,
    ImgComponent,
    ImgsComponent,
    FormAddComponent,
    TableComponent,
    TableAddComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    AdminToolbarComponent,
    AdminMenuComponent,
    AdminMenuAddComponent,
    DrinkDetailComponent,
    AdminMenuListComponent,
    CategoryComponent,
    CategoryTreeComponent,
    CategoryNodeComponent,
    CategoryAddComponent,
    CategoryIconComponent,
    TableListComponent,
    OrderComponent,
    OrderAddComponent,
    SelectOrderTypeComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ]
})
export class AdminModule { }
