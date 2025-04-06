import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-menu-add',
  templateUrl: './admin-menu-add.component.html',
  styleUrls: ['./admin-menu-add.component.scss']
})
export class AdminMenuAddComponent implements OnInit, OnChanges {

  // @ViewChild('extraContent') extraContent!: TemplateRef<any>;
  @Input() showoffcanvas = false;
  @Output() closePupAdd = new EventEmitter<void>();


  @Input() drink: any = {};
  categories = [
    { id: '1', name: 'Đồ uống' },
    { id: '2', name: 'Đồ ăn' },
    { id: '3', name: 'Tráng miệng' }
  ];

  tables = [
    { label: 'Danh mục', icon: 'bi-folder', tab: 'category' },
    { label: 'Thông tin thêm', icon: 'bi-file-earmark-text', tab: 'extraContent' },
    // { label: 'Cài đặt', icon: 'bi-file-earmark-text', tab: 'setting' },
  ];

  //#region  load

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['drink'] && changes['drink'].currentValue) {
      this.drink = { ...changes['drink'].currentValue };
    }
    if (this.drink && !this.drink.sku) {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
      let sku = 'MN-';

      for (let i = 0; i < 3; i++) {
        sku += letters[Math.floor(Math.random() * letters.length)];
        sku += numbers[Math.floor(Math.random() * numbers.length)];
      }
      this.drink.sku = sku
    }
  }

  //#region  event

  save() {
    throw new Error('Method not implemented.');
  }
  onFileChange($event: Event) {
    throw new Error('Method not implemented.');
  }

  close() {
    this.closePupAdd.emit();
  }

}
