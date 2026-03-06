import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-admin-menu-list',
  templateUrl: './admin-menu-list.component.html',
  styleUrls: ['./admin-menu-list.component.scss']
})
export class AdminMenuListComponent implements OnInit, OnChanges {

  @Input() drinks: any[] = [];
  @Input() drinkselect: any;

  @Output() dblclick = new EventEmitter<void>();
  @Output() drink = new EventEmitter<any>();

  pagedDrinks: any[] = [];

  currentPage = 1;
  pageSize = 6;
  totalPages = 1;

  ngOnInit(): void {
    if (this.drinks.length > 0) {
      this.drinkselect = this.drinks[0];
    }
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['drinks']) {
      this.updatePagination();
    }
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.drinks.length / this.pageSize);
    this.setPage(this.currentPage);
  }

  setPage(page: number) {
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedDrinks = this.drinks.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPage(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPage(this.currentPage);
    }
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

  clickDrink(drink: any) {
    this.drinkselect = drink;
    this.drink.emit(drink);
  }

  dblclickDrink() {
    this.dblclick.emit();
  }
}