import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-order-type',
  templateUrl: './select-order-type.component.html',
  styleUrls: ['./select-order-type.component.scss']
})
export class SelectOrderTypeComponent {
  @Input() isTypeOpen = false;
  @Output() closeTypeModal = new EventEmitter<void>();
  @Output() showOrder_Type = new EventEmitter<void>();

  showOrderType() {
    this.showOrder_Type.emit();
  }

  closeType() {
    this.isTypeOpen = false;
    this.closeTypeModal.emit();
  }
}
