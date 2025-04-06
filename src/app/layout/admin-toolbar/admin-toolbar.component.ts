import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.scss']
})
export class AdminToolbarComponent {
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
    }
  ];


  @Output() showPupAdd = new EventEmitter<string>();


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
      default: return 'light';
    }
  }
}
