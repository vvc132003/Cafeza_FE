import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-menu-list',
  templateUrl: './admin-menu-list.component.html',
  styleUrls: ['./admin-menu-list.component.scss']
})
export class AdminMenuListComponent implements OnInit {
  @Input() drinks: any[] = [];
  @Output() dblclick = new EventEmitter<void>();
  @Output() drink = new EventEmitter<void>();
  @Input() drinkselect: any;


  ngOnInit(): void {
    this.drinkselect = this.drinks[0];
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'available': return 'Có sẵn';
      case 'out_of_stock': return 'Hết hàng';
      case 'discontinued': return 'Ngừng bán';
      default: return 'Sửa chữa';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'available': return 'status-available';
      case 'out_of_stock': return 'status-rented';
      case 'discontinued': return 'status-cleaning';
      default: return 'status-default';
    }
  }

  //#region event
  clickDrink(drink: any) {
    this.drinkselect = drink;
    this.drink.emit(drink);
  }
  
  dblclickDrink() {
    this.dblclick.emit();
  }

}
