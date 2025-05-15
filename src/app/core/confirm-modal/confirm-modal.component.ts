import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification';
import { OrderService } from 'src/app/services/order.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnChanges, OnDestroy {
  @Input() show: boolean = false;
  @Input() isModalVisible = false;
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() cancelText: string = '';
  @Input() confirmText: string = '';
  @Input() action: string = '';
  @Input() tableName: string = '';
  @Input() toTableId: string = '';
  @Input() fromTableId: string = '';
  @Output() onCancel = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<string>();
  @Input() tableList: { id: number, name: string }[] = [];
  @Input() height: string = "30vh";
  changetable: boolean = false;
  private subscription = new Subscription();
  constructor(private router: Router, private notificationService: NotificationService,
    private orderService: OrderService, private tableService: TableService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {

    // this.show = true;
    // setTimeout(() => {
    //   this.isModalVisible = true;
    // }, 0);

    if (changes['tableName'] && changes['tableName'].currentValue !== undefined) {
      this.tableName = changes['tableName'].currentValue;
      this.changetable = true;
      if (this.changetable === true)
        this.loadTables();
    }
  }
  tables: any[] = [];
  loadTables() {
    this.subscription.add(
      this.tableService.getData().subscribe((data: any) => {
        this.tables = data.filter((table: any) => table.status === 'empty');
        // console.log(data);
        // console.log(this.tables);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cancel() {
    this.show = false;
    setTimeout(() => {
      this.isModalVisible = false;
    }, 0);
    this.onCancel.emit();
  }

  confirm(data: any) {
    switch (data) {
      case '110':
        const data = {
          fromTableId: this.fromTableId,
          toTableId: this.toTableId
        }
        // console.log(data);
        this.orderService.changeTable(data).subscribe((data) => {
          this.cancel();
          this.router.navigate(['/admin/tables/1002']);
        })
        break;
      case '112':
      case '113':
        this.onConfirm.emit(this.action);
        break;
      default:
        break;
    }
  }
}