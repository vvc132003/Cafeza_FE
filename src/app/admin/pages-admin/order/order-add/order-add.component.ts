import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificationService } from 'src/app/services/notification';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss']
})
export class OrderAddComponent implements OnChanges {

  @Input() showoffcanvas = false;
  @Output() closePupAddOrder = new EventEmitter<void>();
  text: string = "";
  @Input() data: any;
  action: string = "";
  @Input() customer: any = {};
  order: any = {};
  @Input() user: any = {};

  @Input() tableId: number = 0;



  tables = [
    { label: 'Thông tin khách hàng', icon: 'bi-person-vcard', tab: 'category' },
  ];

  constructor(private cdr: ChangeDetectorRef, private customerService: CustomerService, private orderService: OrderService, private notificationService: NotificationService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.data = { ...changes['data'].currentValue };
      this.text = this.data.text;
      this.action = this.data.action;
    }
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let code = 'HD-';

    for (let i = 0; i < 3; i++) {
      code += letters[Math.floor(Math.random() * letters.length)];
      code += numbers[Math.floor(Math.random() * numbers.length)];
    }
    this.order.code = code;
  }

  close() {
    this.closePupAddOrder.emit();
  }

  save() {
    this.order.tableId = this.tableId;
    this.order.totalAmount = "0";
    this.order.status = "Chờ thanh toán";
    this.customer.membershipLevel = "Thường";
    this.customer.rewardPoints = "0";
    const requestData = {
      orderDto: this.order,
      customerDetailsDTO: this.customer,
      userDTO: this.user
    };
    // console.log(requestData);
    this.orderService.postData(requestData).subscribe((res: any) => {
      this.close();
    })
  }

}
