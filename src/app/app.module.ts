import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImgComponent } from './core/img/img.component';
import { ImgsComponent } from './core/imgs/imgs.component';
import { FormAddComponent } from './core/form-add/form-add.component';
import { TableComponent } from './pages/table/table.component';
import { TableAddComponent } from './pages/table/table-add/table-add.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AdminToolbarComponent } from './layout/admin-toolbar/admin-toolbar.component';
import { AdminMenuComponent } from './pages/admin-menu/admin-menu.component';
import { AdminMenuAddComponent } from './pages/admin-menu/admin-menu-add/admin-menu-add.component';
import { DrinkDetailComponent } from './pages/admin-menu/drink-detail/drink-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AdminMenuListComponent } from './pages/admin-menu/admin-menu-list/admin-menu-list.component';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryTreeComponent } from './pages/category/category-tree/category-tree.component';
import { CategoryNodeComponent } from './pages/category/category-tree/category-node/category-node.component';
import { CategoryAddComponent } from './pages/category/category-add/category-add.component';
import { CategoryIconComponent } from './pages/category/category-add/category-icon/category-icon.component';
import { TableListComponent } from './pages/table/table-list/table-list.component';

@NgModule({
  declarations: [
    AppComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
