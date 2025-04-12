import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  showoffcanvas = false;
  showAdd = false;
  table: any = {};
  selectTable: any = {};
  private subscription = new Subscription();

  constructor(private cdr: ChangeDetectorRef, private tableService: TableService) { }

  tables: any[] = [
    // { id: 1, tableName: 'Bàn 1', capacity: 4, location: 'Khu A', status: 'empty', parentId: 'A' },
    // { id: 2, tableName: 'Bàn 2', capacity: 2, location: 'Khu A', status: 'reserved', parentId: 'A' },
    // { id: 3, tableName: 'Bàn 3', capacity: 4, location: 'Khu B', status: 'occupied', parentId: 'B' },
    // { id: 4, tableName: 'Bàn 4', capacity: 6, location: 'Khu B', status: 'occupied', parentId: 'B' },
    // { id: 5, tableName: 'Bàn 5', capacity: 4, location: 'Khu C', status: 'occupied', parentId: 'C' },
  ];


  count: number = 0;

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables() {
    this.subscription.add(
      this.tableService.getData().subscribe((data: any) => {
        this.tables = data;
        // console.log(this.categories);
        this.count = this.tables.length;
        this.selectTable = this.tables[1];
        if (this.pendingActions.length > 0) {
          this.evetnbuttons(this.pendingActions);
          // this.pendingActions = [];
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showButtonsnone: any[] = [];
  pendingActions: any[] = [];

  evetnbuttons(actions: any[]) {
    this.showButtonsnone = actions.filter(action => action.id === '109');
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
  data: any = {};
  click(event: any) {
    switch (event) {
      case '101':
        this.showoffcanvas = true;
        this.table = {};
        this.data = {
          action: 'addb',
          text: 'Thêm bàn'
        };
        break;
      case '109':
        this.showoffcanvas = true;
        this.table = {};
        this.data = {
          action: 'addkv',
          text: 'Thêm khu vực'
        };
        break;
      default:
        break;
    }
  }


  newData(data: any) {
    const index = this.tables.findIndex(c => c.id === data.id);
    if (index === -1) {
      this.count += 1;
      // this.categories.unshift(data);
      // this.tables = [data, ...this.tables];
      if (data.parentId == null) {
        this.tables = [...this.tables, data]; // thêm cuối mảng
      } else {
        this.tables = [data, ...this.tables]; // thêm đầu mảng
      }
    } else {
      const updated = [...this.tables];
      updated[index] = data;
      this.tables = updated;
    }
    this.selectTable = data;
    if (this.pendingActions.length > 0) {
      this.evetnbuttons(this.pendingActions);
      // this.pendingActions = [];
    }
  }

  close() {
    // this.showAdd = false;
    this.showoffcanvas = false;
  }

}
