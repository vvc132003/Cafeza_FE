import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-staff-table-kaban',
  templateUrl: './staff-table-kaban.component.html',
  styleUrls: ['./staff-table-kaban.component.scss']
})
export class StaffTableKabanComponent implements OnChanges, OnInit, OnDestroy {
  @ViewChildren('tableKaban ') tableKaban!: QueryList<ElementRef>;
  columns: any[] = [];
  connectedLists: string[] = [];
  @Input() tables: any[] = [];

  private subscription: Subscription = new Subscription();

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tables'] && changes['tables'].currentValue) {
      this.updateColumns();
    }
  }
  getStatusText(status: string): string {
    switch (status) {
      case 'empty': return 'Trống';
      case 'reserved': return 'Đã đặt';
      case 'occupied': return 'Có khách';
      default: return '';
    }
  }

  // getStatusClass(status: string): string {
  //   switch (status) {
  //     case 'empty': return 'status-empty';
  //     case 'reserved': return 'status-reserved';
  //     case 'occupied': return 'status-occupied';
  //     default: return '';
  //   }
  // }
  updateColumns(): void {
    this.columns = [
      {
        name: 'Trống', status: 'empty',
        tables: this.tables.filter(r => r.status === 'empty').slice(0, 5),
        fulltables: this.tables.filter(r => r.status === 'empty')
      },
      {
        name: 'Có khách', status: 'occupied',
        tables: this.tables.filter(r => r.status === 'occupied').slice(0, 5),
        fulltables: this.tables.filter(r => r.status === 'occupied')
      },
      {
        name: 'Đã đặt', status: 'reserved',
        tables: this.tables.filter(r => r.status === 'reserved').slice(0, 5),
        fulltables: this.tables.filter(r => r.status === 'reserved')
      },
      // {
      //   name: 'Sửa chữa', status: 'Repair',
      //   tables: this.tables.filter(r => r.status === 'Repair').slice(0, 5),
      //   fulltables: this.tables.filter(r => r.status === 'Repair')
      // }
    ];

    this.connectedLists = this.columns.map(col => col.status);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'empty': return 'status-empty';
      case 'reserved': return 'status-reserved';
      case 'occupied': return 'status-occupied';
      default: return 'status-default';
    }
  }

  @Input() selectedTable: any;
  @Output() tableSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() doubleClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() tableDropped = new EventEmitter<{ event: CdkDragDrop<any[]>; columns: any[] }>();

  drop(event: CdkDragDrop<any[]>): void {
    this.tableDropped.emit({ event, columns: this.columns });
  }

  isScrolling: boolean = false;
  scrollTimeout: any;
  onTouchStart() {
    this.isScrolling = false;
  }

  onTouchMove() {
    this.isScrolling = true;
  }

  onTouchEnd() {
    setTimeout(() => (this.isScrolling = false), 100);
  }

  onWheel() {
    this.isScrolling = true;
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => (this.isScrolling = false), 100);
  }
  onScroll(column: any, event: any) {
    const target = event.target;
    const previousScrollTop = target.scrollTop;
    const previousScrollHeight = target.scrollHeight;

    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
      this.isLoading[column.status] = true;
      this.loadMoreTables(column, target, previousScrollTop, previousScrollHeight);
    }
  }
  isLoading: { [key: string]: boolean } = {};

  loadMoreTables(column: any, target: any, previousScrollTop: number, previousScrollHeight: number) {
    const columnIndex = this.columns.findIndex(c => c.status === column.status);
    if (columnIndex !== -1) {
      const currentColumn = this.columns[columnIndex];

      if (currentColumn.tables.length >= currentColumn.fulltables.length) {
        this.isLoading[column.status] = false;
        return;
      }
      setTimeout(() => {
        const nextTables = currentColumn.fulltables.slice(currentColumn.tables.length, currentColumn.tables.length + 3);
        if (nextTables.length > 0) {
          nextTables.forEach((table: any) => currentColumn.tables.push(table));
          // this.cdr.detectChanges();
          setTimeout(() => {
            target.scrollTop = previousScrollTop + (target.scrollHeight - previousScrollHeight);
            this.isLoading[column.status] = false;
          }, 9000);
        }
      }, 1000);
    }
  }

  onDoubleClick(table: any) {
    // if (table.status === 'occupied') {
      // console.log(table);
      this.doubleClick.emit(table);
    // }
  }

  onTableClick(table: any) {
    this.selectedTable = table;
    this.tableSelected.emit(table);
  }

}
