import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-updatequantity-detail',
  templateUrl: './updatequantity-detail.component.html',
  styleUrls: ['./updatequantity-detail.component.scss']
})
export class UpdatequantityDetailComponent implements OnInit {

  @Input() isorderdetailOpen = false;
  @Output() categoryIconSelected = new EventEmitter<any>();
  @Output() closenModal = new EventEmitter<void>();
  data: any = {};
  ngOnInit(): void {

  }

  selectQuantity() {
    this.categoryIconSelected.emit(this.data);
    // this.close();
  }

  close() {
    this.isorderdetailOpen = false;
    this.closenModal.emit();
  }

}
