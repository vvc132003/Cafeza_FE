import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TableComponent } from './pages-admin/table/table.component';
import { OrderComponent } from './pages-admin/order/order.component';
import { AdminMenuComponent } from './pages-admin/admin-menu/admin-menu.component';
import { CategoryComponent } from './pages-admin/category/category.component';

const routes: Routes = [
  // { path: '', component: AdminComponent },
  { path: 'admin/tables/:funId', component: TableComponent },
  { path: 'admin/tables/:funId/orderdetail/:id', component: OrderComponent },
  { path: 'admin/drinks/:funId', component: AdminMenuComponent },
  { path: 'admin/categories/:funId', component: CategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
