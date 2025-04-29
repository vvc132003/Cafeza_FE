import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeListComponent } from './pages-home/home-list/home-list.component';
import { DrinksDetailComponent } from './drinks/drinks-detail/drinks-detail.component';

const routes: Routes = [
  { path: '', component: HomeListComponent },
  { path: 'drinks/drink-detail/:slug-:sku', component: DrinksDetailComponent },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class HomeRoutingModule { }
