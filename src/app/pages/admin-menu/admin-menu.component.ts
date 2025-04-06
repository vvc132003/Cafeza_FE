import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent {
  showoffcanvas = false;
  showAdd = false;
  showDetail = false;
  selectedRoom: any = {};
  drink: any = {};


  click(event: any) {
    if (event === '101') {
      this.showoffcanvas = true;
      this.drink = {};
    } else if (event === '102') {
      this.showoffcanvas = true;
      this.drink = {
        sku: 'SKU123456',
        name: 'Cà phê sữa đá',
        categoryId: 1,
        price: 25000,
        description: 'Một ly cà phê sữa đá thơm ngon, đậm đà.',
        quantity: 10,
        status: 'available',
        size: 'medium',
        image: null
      };
    }
    else if (event === '103') {
      this.showDetail = true;
    }
  }

  close() {
    this.showDetail = false;
    this.showoffcanvas = false;
  }
}
