import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menuItems_desktop = [
    { label: 'Trang chủ', path: '/', isRouterLink: true },
    { label: 'Menu', path: '/menu', isRouterLink: false },
    { label: 'Giới thiệu', path: '/about', isRouterLink: false },
    { label: 'Liên hệ', path: '/contact', isRouterLink: false },
    { label: 'Đăng nhập', path: '/login', isRouterLink: true }
  ];

  menuItems_moblile = [
    { label: 'Trang chủ', path: '/', icon: 'bi-house-door', isRouterLink: true },
    { label: 'Menu', path: '/menu', icon: 'bi-cup-straw', isRouterLink: true },
    { label: 'Giới thiệu', path: '/about', icon: 'bi-info-circle', isRouterLink: true },
    { label: 'Liên hệ', path: '/contact', icon: 'bi-envelope', isRouterLink: true },
    { label: 'Đăng nhập', path: '/login', icon: 'bi-box-arrow-in-right', isRouterLink: true },
    { label: 'Giỏ hàng', path: '/cart', icon: 'bi-cart-fill', isRouterLink: true }

  ];


  @Input() cartCount: number = 0;
  isSearchBarVisible: boolean = false;
  keyword: string = '';
  @Output() searchChanged = new EventEmitter<string>();


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount += count;
    });
  }

  // Method to toggle the search bar visibility
  toggleSearchBar(): void {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }

  onSearchChange(): void {
    this.searchChanged.emit(this.keyword);
    this.isSearchBarVisible = false;
  }
}
