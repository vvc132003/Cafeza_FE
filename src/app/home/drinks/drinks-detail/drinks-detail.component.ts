import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { DrinkService } from 'src/app/services/drinkservice';
import { NotificationService } from 'src/app/services/notification';

@Component({
  selector: 'app-drinks-detail',
  templateUrl: './drinks-detail.component.html',
  styleUrls: ['./drinks-detail.component.scss']
})
export class DrinksDetailComponent implements OnInit, OnDestroy {
  drink: any;
  cartCount: number = 0;
  constructor(private drinkService: DrinkService, private notificationService: NotificationService, private cartService: CartService) { }

  ngOnInit(): void {
    this.drink = this.drinkService.getDrink();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('selectedDrink');
  }

  addToCart(data: any) {
    const res = {
      drink: data,
      userId: null
    }

    this.cartService.postData(res).subscribe((data: any) => {
      this.notificationService.showSuccess('1015');
      this.cartService.updateCartCount(1);
    });
  }

}