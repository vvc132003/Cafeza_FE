import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  showoffcanvas = false;
  showAdd = false;
  selectedRoom: any = {};
  selectTable: any = {};

  constructor(private cdr: ChangeDetectorRef) { }

  tables: any[] = [
    { id: 1, tableName: 'Bàn 1', capacity: 4, location: 'Khu A', status: 'empty', parentId: 'A' },
    { id: 2, tableName: 'Bàn 2', capacity: 2, location: 'Khu A', status: 'reserved', parentId: 'A' },
    { id: 3, tableName: 'Bàn 3', capacity: 4, location: 'Khu B', status: 'occupied', parentId: 'B' },
    { id: 4, tableName: 'Bàn 4', capacity: 6, location: 'Khu B', status: 'occupied', parentId: 'B' },
    { id: 5, tableName: 'Bàn 5', capacity: 4, location: 'Khu C', status: 'occupied', parentId: 'C' },
  ];
  
  
  count: number = 0;

  ngOnInit(): void {
    this.count = this.tables.length;
    this.selectTable = this.tables[0];
  }

  showButtonsnone: any[] = [];
  pendingActions: any[] = [];

  evetnbuttons(actions: any[]) {
    this.showButtonsnone = actions.filter(action => action.id === '101');
    this.cdr.detectChanges();

    if (!this.selectTable || !this.selectTable.id) {
      this.pendingActions = actions;
      return;
    }

    this.showButtonsnone = actions.map(action => {
      if (action.id === '106' || action.id === '108') {
        return { ...action, display: 'none' };
      }
      return action;
    });

    this.cdr.detectChanges();
  }

  click(event: any) {
    if (event === '101') {
      this.showoffcanvas = true;
      this.selectedRoom = {};
    } else if (event === '102') {
      this.showoffcanvas = true;
      this.selectedRoom.roomName = 'hahha';
    }
  }

  close() {
    // this.showAdd = false;
    this.showoffcanvas = false;
  }

}
