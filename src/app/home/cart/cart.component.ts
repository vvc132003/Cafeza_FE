import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { DrinkService } from 'src/app/services/drinkservice';
import { NotificationService } from 'src/app/services/notification';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cartCount: number = 0;
  carts: any[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private cartService: CartService, private drinkService: DrinkService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.fetCart();
    this.fetDrink();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetCart() {
    this.subscription.add(
      this.cartService.getCurrentCartByUserIdAsync().subscribe((data: any) => {
        // console.log(data);
        this.carts = data;
      })
    )
  }

  drinks: any[] = [];

  fetDrink() {
    this.subscription.add(
      this.drinkService.getDataDrink_random().subscribe((data: any) => {
        // console.log(data);
        this.drinks = data;
      })
    )
  }

  getTotalQuantity() {
    return this.carts?.filter(c => c.selected).reduce((sum, item) => sum + item.quantity, 0) || 0;
  }

  getTotalPrice() {
    return this.carts?.filter(c => c.selected)
      .reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) || 0;
  }


  selectAll: boolean = false;

  toggleSelectAll() {
    this.carts.forEach(item => item.selected = this.selectAll);
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.cartService.updateCartCount(1);
  }

  decreaseQuantity(item: any) {
    this.cartService.updateCartCount(-1);
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  updateCart(item: any) {
    console.log('Update cart item', item);
  }

  removeCartItem(item: any) {
    this.cartService.updateCartCount(-item.quantity);
    this.carts = this.carts.filter(x => x !== item);
  }

  addToCart(data: any) {
    const res = {
      drink: data,
      userId: null
    }

    this.cartService.postData(res).subscribe((data: any) => {
      // this.cartCount = data.reduce((sum, item) => sum + item.quantity, 0);
      this.newCart(data);
      this.cartService.updateCartCount(1);
      this.notificationService.showSuccess('1015');
    })

  }


  newCart(data: any) {
    const index = this.carts.findIndex(c => c.id === data.id);
    if (index === -1) {
      this.carts.unshift(data);
    } else {
      this.carts[index] = data;
    }
  }

}