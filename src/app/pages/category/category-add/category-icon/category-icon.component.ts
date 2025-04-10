import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-icon',
  templateUrl: './category-icon.component.html',
  styleUrls: ['./category-icon.component.scss']
})
export class CategoryIconComponent implements OnInit, OnDestroy {

  @Output() categoryIconSelected = new EventEmitter<any>();
  @Output() closeIconModal = new EventEmitter<void>();
  @Input() selectedCategoryIcon: any[] = [];
  searchTerm: string = '';
  checkAll: boolean = false;
  @Input() isCategoryiconOpen = false;
  categoryIconList: any[] = [];
  categoryIcon: any[] = [];
  originalcategoryIcon: any[] = [];

  private subscription = new Subscription();

  constructor(

  ) { }

  ngOnInit(): void {
    this.fetchCategoryIcon();
  }

  fetchCategoryIcon() {
    this.categoryIconList = [
      { id: 1, name: 'Home', icon: 'fa fa-home', selected: false },
      { id: 2, name: 'User', icon: 'fa fa-user', selected: false },
      { id: 3, name: 'Envelope', icon: 'fa fa-envelope', selected: false },
      { id: 4, name: 'Bell', icon: 'fa fa-bell', selected: false },
      { id: 5, name: 'Camera', icon: 'fa fa-camera', selected: false },
      { id: 6, name: 'Car', icon: 'fa fa-car', selected: false },
      { id: 7, name: 'Heart', icon: 'fa fa-heart', selected: false },
      { id: 8, name: 'Star', icon: 'fa fa-star', selected: false },
      { id: 9, name: 'Lock', icon: 'fa fa-lock', selected: false },
      { id: 10, name: 'Search', icon: 'fa fa-search', selected: false },
      { id: 11, name: 'Phone', icon: 'fa fa-phone', selected: false },
      { id: 12, name: 'Map', icon: 'fa fa-map', selected: false },
      { id: 13, name: 'Music', icon: 'fa fa-music', selected: false },
      { id: 14, name: 'Bookmark', icon: 'fa fa-bookmark', selected: false },
      { id: 15, name: 'Wifi', icon: 'fa fa-wifi', selected: false },
      { id: 16, name: 'Thumbs Up', icon: 'fa fa-thumbs-up', selected: false },
      { id: 17, name: 'Thumbs Down', icon: 'fa fa-thumbs-down', selected: false },
      { id: 18, name: 'Download', icon: 'fa fa-download', selected: false },
      { id: 19, name: 'Upload', icon: 'fa fa-upload', selected: false },
      { id: 20, name: 'Paperclip', icon: 'fa fa-paperclip', selected: false },
      { id: 21, name: 'Trash', icon: 'fa fa-trash', selected: false },
      { id: 22, name: 'Cog', icon: 'fa fa-cog', selected: false },
      { id: 23, name: 'Wrench', icon: 'fa fa-wrench', selected: false },
      { id: 24, name: 'Battery', icon: 'fa fa-battery-full', selected: false },
      { id: 25, name: 'Bug', icon: 'fa fa-bug', selected: false },
      { id: 26, name: 'Clock', icon: 'fa fa-clock', selected: false },
      { id: 27, name: 'Cloud', icon: 'fa fa-cloud', selected: false },
      { id: 28, name: 'Credit Card', icon: 'fa fa-credit-card', selected: false },
      { id: 29, name: 'Edit', icon: 'fa fa-edit', selected: false },
      { id: 30, name: 'Eye', icon: 'fa fa-eye', selected: false },
      { id: 31, name: 'Flag', icon: 'fa fa-flag', selected: false },
      { id: 32, name: 'Folder', icon: 'fa fa-folder', selected: false },
      { id: 33, name: 'Globe', icon: 'fa fa-globe', selected: false },
      { id: 34, name: 'Key', icon: 'fa fa-key', selected: false },
      { id: 35, name: 'Laptop', icon: 'fa fa-laptop', selected: false },
      { id: 36, name: 'Lightbulb', icon: 'fa fa-lightbulb', selected: false },
      { id: 37, name: 'Link', icon: 'fa fa-link', selected: false },
      { id: 38, name: 'List', icon: 'fa fa-list', selected: false },
      { id: 39, name: 'Microphone', icon: 'fa fa-microphone', selected: false },
      { id: 40, name: 'Mobile', icon: 'fa fa-mobile', selected: false },
      { id: 41, name: 'Money', icon: 'fa fa-money-bill', selected: false },
      { id: 42, name: 'Palette', icon: 'fa fa-palette', selected: false },
      { id: 43, name: 'Paper Plane', icon: 'fa fa-paper-plane', selected: false },
      { id: 44, name: 'Print', icon: 'fa fa-print', selected: false },
      { id: 45, name: 'Rocket', icon: 'fa fa-rocket', selected: false },
      { id: 46, name: 'Shopping Cart', icon: 'fa fa-shopping-cart', selected: false },
      { id: 47, name: 'Smile', icon: 'fa fa-smile', selected: false },
      { id: 48, name: 'Tag', icon: 'fa fa-tag', selected: false },
      { id: 49, name: 'TV', icon: 'fa fa-tv', selected: false },
      { id: 50, name: 'Volume Up', icon: 'fa fa-volume-up', selected: false }
    ];

    this.originalcategoryIcon = this.categoryIconList;
    this.syncSelectedCategoryIcon();



  }

  private syncSelectedCategoryIcon() {
    this.categoryIcon = this.selectedCategoryIcon.map(f => {
      const item = this.categoryIconList.find((CategoryIcon: any) => CategoryIcon.id === f.id);
      if (item) {
        item.selected = true;
        return item;
      }
      return null;
    }).filter(Boolean);

    this.checkAll = this.categoryIconList.every(item => item.selected);
  }

  // onSelectCategoryIcon(item: any) {
  //   const index = this.CategoryIcon.findIndex(f => f.id === item.id);
  //   if (index === -1) {
  //     this.CategoryIcon.push(item);
  //   } else {
  //     this.CategoryIcon.splice(index, 1);
  //   }
  //   this.checkAll = this.categoryIcon.every(item => item.selected);
  //   // console.log(this.CategoryIcon);
  // }

  onSelectCategoryIcon(item: any) {
    this.categoryIconList.forEach(icon => icon.selected = false);
    item.selected = true;
    this.categoryIcon = [item];
    // this.checkAll = false;
  }


  // onSelectAll(event: any) {
  //   const isChecked = event.target.checked;
  //   this.categoryIcon.forEach(item => item.selected = isChecked);
  //   this.CategoryIcon = isChecked ? [...this.categoryIcon] : [];
  //   // console.log(this.CategoryIcon);
  // }

  selectCategoryIcon() {
    if (this.categoryIcon.length === 0) {
      return;
    }
    this.categoryIconSelected.emit(this.categoryIcon);
    this.closeIcon();
  }

  onSearch(): void {
    this.categoryIconList = [...this.originalcategoryIcon];
    if (this.searchTerm) {
      this.categoryIconList = this.categoryIconList.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.categoryIconList = this.originalcategoryIcon;
    }
  }
  closeIcon() {
    this.isCategoryiconOpen = false;
    this.closeIconModal.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
