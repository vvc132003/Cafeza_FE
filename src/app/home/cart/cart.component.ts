import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {


  carts: any[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.fetCart();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetCart() {
    this.subscription.add(
      this.cartService.getCurrentCartByUserIdAsync().subscribe((data: any) => {
        console.log(data);
      })
    )
  }

}
