import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification';
import { OrderDetailService } from 'src/app/services/orderdetail.service';
import { TableService } from 'src/app/services/table.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-bartending',
  templateUrl: './bartending.component.html',
  styleUrls: ['./bartending.component.scss']
})
export class BartendingComponent implements OnChanges, OnInit, OnDestroy {
  @ViewChildren('tableKaban ') tableKaban!: QueryList<ElementRef>;
  columns: any[] = [];
  connectedLists: string[] = [];
  // @Input() tables: any[] = [];

  private subscription: Subscription = new Subscription();
  constructor(private cookieService: CookieService, private cdr: ChangeDetectorRef, private notificationService: NotificationService, private router: Router, private route: ActivatedRoute, private tableService: TableService, private orderDetailService: OrderDetailService) { }
  currentUserName: string = "";
  currentUserRole: string = "";

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    const token = this.cookieService.get('access_token');
    if (token) {
      const decoded: any = jwt_decode(token);
      this.currentUserName = decoded.sub;
      const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.currentUserRole = role;
    }
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
    this.loadTables();
  }

  updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('vi-VN');
    const dateString = now.toLocaleDateString('vi-VN');
    document.getElementById('currentTime')!.textContent = timeString;
    document.getElementById('currentDate')!.textContent = dateString;
  }

  orderdetails: any[] = [];
  loadTables() {
    this.subscription.add(
      this.orderDetailService.getAllOrdersDetail().subscribe((data: any) => {
        this.orderdetails = data;
        this.updateColumns();
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['tables'] && changes['tables'].currentValue) {
    this.updateColumns();
    // }
  }
  getStatusText(status: string): string {
    switch (status) {
      case 'waiting': return 'Đơn cần pha';
      case 'processing': return 'Đang pha';
      case 'done': return 'Đã hoàn thành';
      default: return 'Đã huỷ';
    }
  }

  // getStatusClass(status: string): string {
  //   switch (status) {
  //     case 'waiting': return 'status-waiting';
  //     case 'processing': return 'status-processing';
  //     case 'done': return 'status-done';
  //     default: return '';
  //   }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'processing':
        return 'bi bi-hourglass-split'; // Biểu tượng đang pha chế
      case 'waiting':
        return 'bi bi-hourglass'; // Biểu tượng đang chờ
      case 'done':
        return 'bi bi-check-circle-fill'; // Biểu tượng hoàn thành
      default:
        return 'bi bi-x-lg'; // Biểu tượng không xác định
    }
  }



  getIconStyle(status: string): any {
    switch (status) {
      case 'processing': return { color: '#17a2b8' };
      case 'waiting': return { color: '#ffc107' };
      case 'done': return { color: '#28a745' };
      default: return { color: 'red' };
    }
  }




  // }
  updateColumns(): void {
    this.columns = [
      {
        name: 'Đơn cần pha', status: 'waiting',
        orderdetails: this.orderdetails.filter(r => r.status === 'waiting').slice(0, 5),
        fullorderdetails: this.orderdetails.filter(r => r.status === 'waiting')
      },
      {
        name: 'Đang pha', status: 'processing',
        orderdetails: this.orderdetails.filter(r => r.status === 'processing').slice(0, 5),
        fullorderdetails: this.orderdetails.filter(r => r.status === 'processing')
      },
      {
        name: 'Đã hoàn thành', status: 'done',
        orderdetails: this.orderdetails.filter(r => r.status === 'done').slice(0, 5),
        fullorderdetails: this.orderdetails.filter(r => r.status === 'done')
      },
      {
        name: 'Đã huỷ', status: 'delete',
        orderdetails: this.orderdetails.filter(r => r.status === 'delete').slice(0, 5),
        fullorderdetails: this.orderdetails.filter(r => r.status === 'delete')
      },
    ];

    this.connectedLists = this.columns.map(col => col.status);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'waiting': return 'status-waiting';
      case 'processing': return 'status-processing';
      case 'done': return 'status-done';
      default: return 'status-delete';
    }
  }

  getStatusClasss(status: string): string {
    switch (status) {
      case 'waiting': return 'status-waitings';
      case 'processing': return 'status-processings';
      case 'done': return 'status-dones';
      default: return 'status-deletes';
    }
  }

  @Input() selectedTable: any;
  @Output() tableSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() doubleClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() tableDropped = new EventEmitter<{ event: CdkDragDrop<any[]>; columns: any[] }>();

  drop(event: CdkDragDrop<any[]>): void {
    const columns = this.columns;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const movedRoom = event.previousContainer.data[event.previousIndex];
      const newColumn = columns.find((col: any) => col.status === event.container.id);
      if (newColumn) {
        this.updateTableStatusDrop(movedRoom, newColumn.status, event);
      }
    }
  }

  updateTableStatusDrop(movedRoom: any, status: string, event: CdkDragDrop<any[]>): void {
    // console.log(status);
    if (movedRoom.status === 'delete') {
      this.notificationService.showWarning('1017');
      return;
    }
    if (movedRoom.status === 'done') {
      this.notificationService.showWarning('1018');
      return;
    }
    if (movedRoom.status !== 'processing' && status === 'done') {
      this.notificationService.showWarning('1019');
      return;
    }
    this.orderDetailService.updateOrderDetailStatus(movedRoom.orderdetailId, status).subscribe((data: any) => {
      if (!data)
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      // if(status === 'processing'){}
      this.notificationService.showSuccess('1016');
    })
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

      if (currentColumn.orderdetails.length >= currentColumn.fullorderdetails.length) {
        this.isLoading[column.status] = false;
        return;
      }
      setTimeout(() => {
        const nextTables = currentColumn.fullorderdetails.slice(currentColumn.orderdetails.length, currentColumn.orderdetails.length + 3);
        if (nextTables.length > 0) {
          nextTables.forEach((table: any) => currentColumn.orderdetails.push(table));
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
    // if (table.status === 'done') {
    // console.log(table);
    this.doubleClick.emit(table);
    // }
  }

  onTableClick(table: any) {
    this.selectedTable = table;
    this.tableSelected.emit(table);
  }

}
