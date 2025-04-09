import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnChanges {
  @Output() closePupAdd = new EventEmitter<void>();
  text: string = "";
  @Input() data: any;
  action: string = "";
  @Output() newData = new EventEmitter<void>();
  @Input() showoffcanvas = false;

  tables = [
    { label: 'Thông tin loại món', icon: 'bi-cup-straw', tab: 'category' },
    { label: 'Cài đặt', icon: 'bi-gear', tab: 'setting' }
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.data = { ...changes['data'].currentValue };
      this.text = this.data.text;
      this.action = this.data.action;
    }
  }

  save(): void {

  }

  close() {
    this.closePupAdd.emit();
  }
}
