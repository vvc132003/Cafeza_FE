import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent {
  funId: string = '';
  @Input() tables: any[] = [];
  @Input() selectTable: any;
  @Output() table = new EventEmitter<void>();
  constructor(private router: Router, private route: ActivatedRoute) { }

  onTableDoubleClick(tableId: number): void {
    this.funId = this.route.snapshot.paramMap.get('funId') || '';
    this.router.navigate([`/admin/tables/${this.funId}/orderdetail/${tableId}`]);
  }

  clickTable(table: any) {
    this.selectTable = table;
    this.table.emit(table);
  }

  getUniqueAreas(): any[] {
    return this.tables.filter(t => t.parentId == null);
  }


  getTablesByArea(parentId: string): any[] {
    return this.tables.filter(t => t.parentId === parentId);
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'empty': return 'Trống';
      case 'reserved': return 'Đã đặt';
      case 'occupied': return 'Có khách';
      default: return '';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'empty': return 'status-empty';
      case 'reserved': return 'status-reserved';
      case 'occupied': return 'status-occupied';
      default: return '';
    }
  }

}
