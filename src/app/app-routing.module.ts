import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAddComponent } from './core/form-add/form-add.component';
import { TableAddComponent } from './pages/table/table-add/table-add.component';
import { TableComponent } from './pages/table/table.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminMenuComponent } from './pages/admin-menu/admin-menu.component';
import { CategoryComponent } from './pages/category/category.component';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
  { path: 'admin/tables/:funId', component: TableComponent },
  { path: 'admin/tables/:funId/orderdetail/:id', component: OrderComponent },
  { path: 'admin/drinks/:funId', component: AdminMenuComponent },
  { path: 'admin/categories/:funId', component: CategoryComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
