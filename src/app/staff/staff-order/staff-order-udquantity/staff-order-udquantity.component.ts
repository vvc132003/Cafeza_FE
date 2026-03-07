import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from 'src/app/services/notification';

@Component({
  selector: 'app-staff-order-udquantity',
  templateUrl: './staff-order-udquantity.component.html',
  styleUrls: ['./staff-order-udquantity.component.scss']
})
export class StaffOrderUdquantityComponent implements OnInit {

  @Input() isorderdetailOpen = false;
  @Output() categoryIconSelected = new EventEmitter<any>();
  @Output() closenModal = new EventEmitter<void>();
  data: any = {};
  constructor(private notificationService: NotificationService) { }
  ngOnInit(): void {

  }

  selectQuantity() {
    if (Object.keys(this.data).length === 0) {
      this.notificationService.showWarning('1013');
      return;
    }

    this.categoryIconSelected.emit(this.data);
    // this.close();
  }

  close() {
    this.isorderdetailOpen = false;
    this.closenModal.emit();
  }

}
