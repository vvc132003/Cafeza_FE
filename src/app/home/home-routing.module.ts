import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeListComponent } from './pages-home/home-list/home-list.component';
import { DrinksDetailComponent } from './drinks/drinks-detail/drinks-detail.component';
import { LoginComponent } from './pages-home/login/login.component';
import { CustomerService } from '../services/customer.service';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeListComponent },
  { path: 'login', component: LoginComponent  },
  { path: 'cart', component: CartComponent, canActivate: [CustomerService]  },
  { path: 'drinks/drink-detail/:slug-:sku', component: DrinksDetailComponent },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class HomeRoutingModule { }
