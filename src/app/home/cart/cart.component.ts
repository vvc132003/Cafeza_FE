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
        this.statusAll = this.carts.every(cart => cart.status === '10');
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
    return this.carts?.filter(c => c.status == "10").reduce((sum, item) => sum + item.quantity, 0) || 0;
  }

  getTotalPrice() {
    return this.carts?.filter(c => c.status == "10")
      .reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) || 0;
  }


  statusAll: boolean = false;
  togglestatusAll() {
    const newStatus = this.statusAll ? '10' : '90';
    // const ids = this.carts.map(c => c.id);

    this.carts.forEach(cart => {
      cart.status = newStatus;
    });

    // console.log(this.carts);
    // trường hợp cần lưu vào db

    // this.subscription.add(
    //   this.cartService.updateStatusMultiple(ids, newStatus).subscribe()
    // );
  }


  toggleSingleStatus(cart: any) {
    cart.status = cart.status === '10' ? '90' : '10';
    this.statusAll = this.carts.every(c => c.status === '10');
    // console.log(this.carts);
    // trường hợp cần lưu vào db
    // this.subscription.add(
    //   this.cartService.updateStatus(cart.id, cart.status).subscribe(() => {

    //   })
    // )
  }



  increaseQuantity(item: any) {
    this.subscription.add(
      this.cartService.changeQuantity(item.drinkId, item.cartId, 1).subscribe((data: any) => {
        item.quantity++;
        this.cartService.updateCartCount(1);
      })
    )
  }

  decreaseQuantity(item: any) {
    this.subscription.add(
      this.cartService.changeQuantity(item.drinkId, item.cartId, -1).subscribe((data: any) => {
        this.cartService.updateCartCount(-1);
        if (item.quantity > 1) {
          item.quantity--;
        }
        if (data == true) {
          this.carts = this.carts.filter(c => c.id !== item.id);
        }
      })
    )
  }

  updateCart(item: any) {
    console.log('Update cart item', item);
  }

  removeCartItem(item: any) {
    this.subscription.add(
      // this.cartService.changeQuantity()
    )
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