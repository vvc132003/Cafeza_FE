import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-table-add',
  templateUrl: './table-add.component.html',
  styleUrls: ['./table-add.component.scss']
})
export class TableAddComponent {
  @ViewChild('extraContent') extraContent!: TemplateRef<any>;
  @ViewChild('categoryContent') categoryContent!: TemplateRef<any>;
  @ViewChild('setting') setting!: TemplateRef<any>;
  @ViewChild('button') button!: TemplateRef<any>;

  @Input() showoffcanvas = false;
  @Output() closePupAdd = new EventEmitter<void>();

  close() {
    this.closePupAdd.emit();
  }

  @Input() selectedRoom: any = {};
  tables = [
    { label: 'Danh mục', icon: 'bi-folder', tab: 'category' },
    { label: 'Nội dung mở rộng', icon: 'bi-file-earmark-text', tab: 'extraContent' },
    { label: 'Cài đặt', icon: 'bi-file-earmark-text', tab: 'setting' },

  ];

  save(): void {
    // this.showoffcanvas = false;
    this.close();
  }

}