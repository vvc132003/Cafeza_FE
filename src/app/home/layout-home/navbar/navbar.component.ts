import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() cartCount: number = 0;
  isSearchBarVisible: boolean = false;
  keyword: string = '';
  @Output() searchChanged = new EventEmitter<string>();

  // Method to toggle the search bar visibility
  toggleSearchBar(): void {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }

  onSearchChange(): void {
    this.searchChanged.emit(this.keyword);
    this.isSearchBarVisible = false;
  }
}
