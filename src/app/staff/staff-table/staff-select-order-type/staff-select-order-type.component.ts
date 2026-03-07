import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NotificationService } from 'src/app/services/notification';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-staff-select-order-type',
  templateUrl: './staff-select-order-type.component.html',
  styleUrls: ['./staff-select-order-type.component.scss']
})
export class StaffSelectOrderTypeComponent implements OnChanges {
  @Input() isTypeOpen = false;
  @Input() tableId: number = 0;
  @Output() closeTypeModal = new EventEmitter<void>();
  @Output() showOrder_Type = new EventEmitter<void>();

  constructor(private orderService: OrderService, private notificationService: NotificationService) {

  }

  showOrderType() {
    this.showOrder_Type.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let code = 'HD-';

    for (let i = 0; i < 3; i++) {
      code += letters[Math.floor(Math.random() * letters.length)];
      code += numbers[Math.floor(Math.random() * numbers.length)];
    }
    this.order.code = code;
  }

  order: any = {};
  createDineInOrder() {
    this.order.tableId = this.tableId;
    this.order.totalAmount = "0";
    this.order.status = "Chờ thanh toán";
    this.order.type = "10";
    const requestData = {
      orderDto: this.order,
      customerDetailsDTO: null,
      userDTO: null
    };
    // console.log(requestData);
    this.orderService.postData(requestData).subscribe((d) => {
      this.closeType();
      this.notificationService.showSuccess('1003');
    })
  }

  closeType() {
    this.isTypeOpen = false;
    this.closeTypeModal.emit();
  }
}