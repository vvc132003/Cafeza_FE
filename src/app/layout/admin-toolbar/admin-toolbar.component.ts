import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.scss']
})
export class AdminToolbarComponent implements OnInit, OnChanges {
  showButtons = false;

  buttons = [
    {
      id: '101',
      label: 'Thêm',
      icon: 'fa-plus',
      type: 'primary',
      action: () => this.event('101'),
      display: 'block'
    },
    {
      id: '102',
      label: 'Cập nhật',
      icon: 'fa-refresh',
      type: 'warning',
      action: () => this.event('102'),
      display: 'block'
    },
    {
      id: '103',
      label: 'Xem',
      icon: 'fa-eye',
      type: 'secondary',
      action: () => this.event('103'),
      display: 'block'
    },
    {
      id: '104',
      label: 'Xoá',
      icon: 'fa-trash',
      type: 'danger',
      action: () => this.event('104'),
      display: 'block'
    },
    {
      id: '106',
      label: 'Hoàn tất',
      icon: 'fa-check',
      type: 'success',
      action: () => this.event('106'),
      display: 'block'
    },
    {
      id: '108',
      label: 'Tạo hoá đơn',
      icon: 'fa-file-invoice',
      type: 'success',
      action: () => this.event('108'),
      display: 'block'
    }
  ];


  @Output() showPupAdd = new EventEmitter<string>();
  @Output() showButtonss = new EventEmitter<any>();

  @Input() text: string = "";
  @Input() count: number = 0;
  @Input() buttonNone: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['buttonNone']) {
      this.buttonNone = this.buttonNone;
    }
  }

  ngOnInit(): void {
    this.showButtonss.emit(this.buttons);
  }

  //#region  event

  toggleButtons() {
    this.showButtons = !this.showButtons;
  }

  event(buttonId: string) {
    this.showPupAdd.emit(buttonId);
    this.showButtons = false;
  }

  getButtonClass(type: string) {
    // console.log(type);
    switch (type) {
      case 'primary': return 'btn-primary';
      case 'secondary': return 'btn-secondary';
      case 'warning': return 'btn-warning';
      case 'danger': return 'btn-danger';
      case 'success': return 'btn-success';
      default: return 'light';
    }
  }
}
