import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnChanges {
  @Output() closePupAdd = new EventEmitter<void>();
  text: string = "";
  @Input() data: any;
  @Input() category: any = {};
  action: string = "";
  @Input() listcategoryparentId: any[] = [];
  @Output() newData = new EventEmitter<void>();
  @Input() showoffcanvas = false;
  @Input() isModalVisible = false;

  tables = [
    { label: 'Thông tin loại món', icon: 'bi-cup-straw', tab: 'category' },
    { label: 'Cài đặt', icon: 'bi-gear', tab: 'setting' }
  ];

  constructor(private categoryService: CategoryService, private notificationService: NotificationService) {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['listcategoryparentId'] && changes['listcategoryparentId'].currentValue) {
      const raw = changes['listcategoryparentId'].currentValue;
      const list = Array.isArray(raw) ? raw : Object.values(raw);
      this.listcategoryparentId = list.filter(item => item.parentId == null);
    }

    if (this.category != null) {
      // this.category.isActive = true;
      this.category.viewCount = this.category.viewCount ? this.category.viewCount : 0;
      this.categoryIcons = [{ icon: this.category.icon }];
      // console.log(this.category);
    }

    if (changes['data'] && changes['data'].currentValue) {
      this.data = { ...changes['data'].currentValue };
      this.text = this.data.text;
      this.action = this.data.action;
    }
    if (changes['category'] && changes['category'].currentValue) {
      this.category = { ...changes['category'].currentValue };
      // console.log(this.category);
    }
    if (this.category && !this.category.code) {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
      let code = 'MN-';

      for (let i = 0; i < 3; i++) {
        code += letters[Math.floor(Math.random() * letters.length)];
        code += numbers[Math.floor(Math.random() * numbers.length)];
      }
      this.category.code = code
    }
  }
  toSlug(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-');
  }

  onNameChange() {
    this.category.slug = this.toSlug(this.category.name);
  }

  save(): void {
    if (this.action === 'add') {
      this.saveCategory();
    } else {
      this.updateCategory();
    }
  }

  saveCategory() {
    this.category.icon = this.categoryIcons[0].icon;
    this.categoryService.postData(this.category).subscribe((data: any) => {
      // console.log(data);
      this.close();
      this.newData.emit(data);
    })
  }
  updateCategory() {
    this.category.icon = this.categoryIcons[0].icon;
    this.categoryService.updateData(this.category).subscribe((data: any) => {
      // console.log(data);
      this.close();
      this.newData.emit(data);
    })
  }

  close() {
    this.closePupAdd.emit();
  }

  isCardVisible = false;
  toggleCard() {
    this.isCardVisible = true;
  }
  closeCard() {
    this.isCardVisible = false;
  }

  categoryIcons: any = {}
  getCategoryIcon(item: any) {
    // console.log(item);
    this.categoryIcons = item;
  }

}