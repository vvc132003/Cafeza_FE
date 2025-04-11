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


}
