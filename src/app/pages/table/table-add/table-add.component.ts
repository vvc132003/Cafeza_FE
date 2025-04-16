import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table-add',
  templateUrl: './table-add.component.html',
  styleUrls: ['./table-add.component.scss']
})
export class TableAddComponent implements OnChanges {
  @ViewChild('extraContent') extraContent!: TemplateRef<any>;
  @ViewChild('categoryContent') categoryContent!: TemplateRef<any>;
  @ViewChild('setting') setting!: TemplateRef<any>;
  // @ViewChild('button') button!: TemplateRef<any>;

  @Input() showoffcanvas = false;
  @Output() closePupAdd = new EventEmitter<void>();
  @Output() newPupAdd = new EventEmitter<void>();

  text: string = "";
  @Input() data: any;
  action: string = "";


  constructor(private cdr: ChangeDetectorRef, private tableService: TableService) { }


  close() {
    this.closePupAdd.emit();
  }

  @Input() table: any = {};
  @Input() listTablesparentId: any[] = [];

  tables = [
    { label: 'Thông tin chung', icon: 'bi-folder', tab: 'category' },
    { label: 'Cài đặt', icon: 'bi-gear', tab: 'setting' }
  ];


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.data = { ...changes['data'].currentValue };
      this.text = this.data.text;
      this.action = this.data.action;
    }
    if (changes['listTablesparentId'] && changes['listTablesparentId'].currentValue) {
      const raw = changes['listTablesparentId'].currentValue;
      const list = Array.isArray(raw) ? raw : Object.values(raw);
      this.listTablesparentId = list.filter(item => item.parentId == null);
    }
  }

  save(): void {
    if (this.action === 'addkv') {
      this.saveLocation();
    } else if (this.action === 'addb') {
      this.table.status = 'empty';
      this.table.location = this.listTablesparentId.find((tb: any) => tb.id === this.table.parentId)?.location || null;
      this.saveLocation();
    }
  }
  saveLocation() {
    if (!this.table.location) return;
    this.tableService.postData(this.table).subscribe((data) => {
      this.close();
      // this.newPupAdd.emit(data);
    })
  }

}