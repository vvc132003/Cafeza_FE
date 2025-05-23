import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-layout-home',
  templateUrl: './layout-home.component.html',
  styleUrls: ['./layout-home.component.scss']
})
export class LayoutHomeComponent implements OnInit, OnDestroy {
  keywordFromNavbar: string = '';
  showHeader: boolean = true;
  @Input() text: string = "";
  @Input() cartCount: number = 0;
  private subscription = new Subscription();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    if (this.router.url !== '/') {
      this.showHeader = false;
    }
    this.fetCart();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  fetCart() {
    this.subscription.add(
      this.cartService.getCurrentCartByUserIdAsync().subscribe((data: any[]) => {
        this.cartCount = data.reduce((sum, item) => sum + item.quantity, 0);
      })
    )
  }

  updatecartCount() {
    this.cartCount += 1;
  }

  onSearchChange(keyword: string): void {
    this.keywordFromNavbar = keyword;
  }

}
