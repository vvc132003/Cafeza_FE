import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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

  tables = [
    { label: 'Thông tin khách hàng', icon: 'bi-person-vcard', tab: 'category' },
  ];

  constructor(private cdr: ChangeDetectorRef, private orderService: OrderService, private notificationService: NotificationService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.data = { ...changes['data'].currentValue };
      this.text = this.data.text;
      this.action = this.data.action;
    }
  }

  close() {
    this.closePupAddOrder.emit();
  }

  save() {
    
  }

}
