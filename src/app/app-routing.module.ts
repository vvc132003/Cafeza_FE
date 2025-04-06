import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAddComponent } from './core/form-add/form-add.component';
import { TableAddComponent } from './pages/table/table-add/table-add.component';
import { TableComponent } from './pages/table/table.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   children: [
  //     { path: '', component: TableComponent },
  //   ]
  // }
  { path: '', component: TableComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
