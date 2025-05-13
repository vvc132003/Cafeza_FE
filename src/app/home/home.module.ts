import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LayoutHomeComponent } from './layout-home/layout-home.component';
import { NavbarComponent } from './layout-home/navbar/navbar.component';
import { HeaderComponent } from './layout-home/header/header.component';
import { HomeListComponent } from './pages-home/home-list/home-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DrinksDetailComponent } from './drinks/drinks-detail/drinks-detail.component';
import { LoginComponent } from './pages-home/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    HomeComponent,
    LayoutHomeComponent,
    NavbarComponent,
    HeaderComponent,
    HomeListComponent,
    DrinksDetailComponent,
    LoginComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
    // providers: [CookieService],
})
export class HomeModule { }
