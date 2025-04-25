import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  isTypeOpen = false;
  showoffcanvas = false;
  showoffOrder = false;
  showAdd = false;
  table: any = {};
  selectTable: any = {};
  toastMessage = '';
  showToast = false;
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
    // this.loadTables();
    this.tableService.startConnection().subscribe(() => {
      this.loadTables();
    });
  }

  loadTables() {
    this.subscription.add(
      this.tableService.getData().subscribe((data: any) => {
        this.tables = data;
        // console.log(this.categories);
        this.count = this.tables.length;
        this.selectTable = this.tables[3];
        // this.selectTableStatus =this.tables[2].status;
        if (this.pendingActions.length > 0) {
          this.evetnbuttons(this.pendingActions);
          console.log(this.pendingActions);
          // this.pendingActions = [];
        }
        this.tableService.onTableLoaded().subscribe((newTable: any) => {
          this.newData(newTable);
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.tableService.stopConnection();
  }

  showButtonsnone: any[] = [];
  pendingActions: any[] = [];

  evetnbuttons(actions: any[]) {
    this.showButtonsnone = actions.filter(action => action.id === '109' || action.id === '101');
    this.cdr.detectChanges();

    if (!this.selectTable || !this.selectTable.id) {
      this.pendingActions = actions;
      return;
    }
    // console.log(this.pendingActions);
    switch (this.selectTable.status) {
      case 'empty':
        this.showButtonsnone = actions.map(action => {
          if (action.id === '110' || action.id === '111' || action.id === '112' || action.id === '113' || action.id === '114' || action.id === '115') {
            return { ...action, display: 'none' };
          }
          return action;
        });
        break;
      case 'occupied':
        this.showButtonsnone = actions.map(action => {
          if (action.id === '110' || action.id === '102' || action.id === '104' || action.id === '108' || action.id === '111' || action.id === '112' || action.id === '113' || action.id === '114' || action.id === '115') {
            return { ...action, display: 'none' };
          }
          return action;
        });
        break;
      default:
        break;
    }

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
      case '108':
        this.isTypeOpen = true;
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
      this.showNotification("Đã thêm bàn thành công!");
    } else {
      const updated = [...this.tables];
      updated[index] = data;
      this.tables = updated;
    }
    this.selectTable = data;
    // this.selectTableStatus = data.status;
    if (this.pendingActions.length > 0) {
      this.evetnbuttons(this.pendingActions);
      // this.pendingActions = [];
    }
  }

  showNotification(message: string) {
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }

  showOrderType() {
    this.data = {
      action: 'add',
      text: 'Tạo đơn'
    };
    this.isTypeOpen = false;
    this.showoffOrder = true;
  }

  close() {
    // this.showAdd = false;
    this.showoffOrder = false;
    this.showoffcanvas = false;
  }

  closeType() {
    this.evetnbuttons(this.pendingActions);
    this.isTypeOpen = false;
  }
  tableId: any = {};
  // selectTableStatus: string = "";
  clickTable(table: any) {
    this.tableId = table.id;
    this.selectTable = table;
    this.evetnbuttons(this.pendingActions);

  }

}
