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
    DrinkDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
