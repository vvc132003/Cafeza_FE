import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent {
  @Input() tables: any[] = [];
  @Input() selectTable: any;
  @Output() table = new EventEmitter<void>();


  clickTable(table: any) {
    this.selectTable = table;
    this.table.emit(table);
  }

  getUniqueAreas(): string[] {
    const unique = new Set(this.tables.map(t => t.parentId));
    return Array.from(unique);
  }

  getTablesByArea(area: string): any[] {
    return this.tables.filter(t => t.parentId === area);
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
