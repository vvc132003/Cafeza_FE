import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TableComponent } from './pages-admin/table/table.component';
import { OrderComponent } from './pages-admin/order/order.component';
import { AdminMenuComponent } from './pages-admin/admin-menu/admin-menu.component';
import { CategoryComponent } from './pages-admin/category/category.component';
import { EmployeeComponent } from './pages-admin/employee/employee.component';
import { EmployeeService } from '../services/employee.service';

const routes: Routes = [
  { path: 'admin/tables/:funId', component: TableComponent, canActivate: [EmployeeService] },
  { path: 'admin/tables/:funId/orderdetail/:id', component: OrderComponent, canActivate: [EmployeeService] },
  { path: 'admin/drinks/:funId', component: AdminMenuComponent, canActivate: [EmployeeService] },
  { path: 'admin/categories/:funId', component: CategoryComponent, canActivate: [EmployeeService] },
  { path: 'admin/employee/:funId', component: EmployeeComponent, canActivate: [EmployeeService] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
