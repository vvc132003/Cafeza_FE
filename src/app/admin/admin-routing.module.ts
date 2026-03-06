import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TableComponent } from './pages-admin/table/table.component';
import { OrderComponent } from './pages-admin/order/order.component';
import { AdminMenuComponent } from './pages-admin/admin-menu/admin-menu.component';
import { CategoryComponent } from './pages-admin/category/category.component';
import { EmployeeComponent } from './pages-admin/employee/employee.component';
import { DashboardOverviewComponent } from './pages-admin/dashboard/dashboard-overview/dashboard-overview.component';
import { Userservice } from '../services/Userservice';

const routes: Routes = [
  { path: 'admin/dashboard/:funId', component: DashboardOverviewComponent, canActivate: [Userservice] },
  { path: 'admin/tables/:funId', component: TableComponent, canActivate: [Userservice] },
  { path: 'admin/tables/:funId/orderdetail/:id', component: OrderComponent, canActivate: [Userservice] },
  { path: 'admin/drinks/:funId', component: AdminMenuComponent, canActivate: [Userservice] },
  { path: 'admin/categories/:funId', component: CategoryComponent, canActivate: [Userservice] },
  { path: 'admin/employee/:funId', component: EmployeeComponent, canActivate: [Userservice] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
