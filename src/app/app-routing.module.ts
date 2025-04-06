import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAddComponent } from './core/form-add/form-add.component';
import { TableAddComponent } from './pages/table/table-add/table-add.component';
import { TableComponent } from './pages/table/table.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminMenuComponent } from './pages/admin-menu/admin-menu.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   children: [
  //     { path: '', component: TableComponent },
  //   ]
  // }
  { path: 'admin/tables', component: TableComponent }, 
  { path: 'admin/drinks', component: AdminMenuComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
