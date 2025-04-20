import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
      funId: '1001',
      label: 'Thêm',
      icon: 'fa-plus',
      type: 'primary',
      action: () => this.event('101'),
      display: 'block'
    },
    {
      id: '102',
      funId: '1001',
      label: 'Cập nhật',
      icon: 'fa-refresh',
      type: 'warning',
      action: () => this.event('102'),
      display: 'block'
    },
    {
      id: '103',
      funId: '1001',
      label: 'Xem',
      icon: 'fa-eye',
      type: 'secondary',
      action: () => this.event('103'),
      display: 'block'
    },
    {
      id: '104',
      funId: '1001',
      label: 'Xoá',
      icon: 'fa-trash',
      type: 'danger',
      action: () => this.event('104'),
      display: 'block'
    },
    {
      id: '106',
      funId: '1003',
      label: 'Hoàn tất',
      icon: 'fa-check',
      type: 'success',
      action: () => this.event('106'),
      display: 'block'
    },
    {
      id: '108',
      funId: '1002',
      label: 'Tạo đơn',
      icon: 'fa-file-invoice',
      type: '',
      class: 'custom-create-btn',
      action: () => this.event('108'),
      display: 'block'
    },
    {
      id: '101',
      funId: '1002',
      label: 'Thêm',
      icon: 'fa-plus',
      type: 'primary',
      action: () => this.event('101'),
      display: 'block'
    },
    {
      id: '102',
      funId: '1002',
      label: 'Cập nhật',
      icon: 'fa-refresh',
      type: 'warning',
      action: () => this.event('102'),
      display: 'block'
    },
    {
      id: '103',
      funId: '1002',
      label: 'Xem',
      icon: 'fa-eye',
      type: 'secondary',
      action: () => this.event('103'),
      display: 'block'
    },
    {
      id: '104',
      funId: '1002',
      label: 'Xoá',
      icon: 'fa-trash',
      type: 'danger',
      action: () => this.event('104'),
      display: 'block'
    },
    {
      id: '109',
      funId: '1002',
      label: 'Thêm khu vực',
      icon: 'fa-plus',
      type: 'success',
      action: () => this.event('109'),
      display: 'block'
    },
    {
      id: '110',
      funId: '1002',
      label: 'Chuyển bàn',
      icon: 'fa-random',
      type: 'primary',
      action: () => this.event('110'),
      display: 'block'
    },
    {
      id: '111',
      funId: '1002',
      label: 'Thanh toán',
      icon: 'fa-money-bill-wave',
      type: 'success',
      action: () => this.event('111'),
      display: 'block'
    },
    {
      id: '112',
      funId: '1002',
      label: 'Huỷ đơn',
      icon: 'fa-trash',
      type: 'danger',
      class: '',
      action: () => this.event('112'),
      display: 'block'
    },
    {
      id: '113',
      funId: '1002',
      label: 'In hóa đơn',
      icon: 'fa-print',
      type: '',
      class: 'btn-custom-print',
      action: () => this.event('113'),
      display: 'block'
    },
    {
      id: '114',
      funId: '1002',
      label: 'Xem thông tin khách hàng',
      icon: 'fa-eye',
      type: 'secondary',
      action: () => this.event('114'),
      display: 'block'
    },
    {
      id: '115',
      funId: '1002',
      label: 'Tách đơn',
      icon: 'fa-scissors',
      type: '',
      class: 'btn btn-warning',
      action: () => this.event('115'),
      display: 'block'
    },
    // {
    //   id: '114',
    //   funId: '1002',
    //   label: 'Cập nhật số lượng',
    //   icon: 'fa-sync-alt',
    //   type: '',
    //   class: 'btn-custom-update',
    //   action: () => this.event('114'), 
    //   display: 'block'
    // }


  ];
  constructor(private route: ActivatedRoute) { }


  @Output() showPupAdd = new EventEmitter<string>();
  @Output() showButtonss = new EventEmitter<any>();

  @Input() text: string = "";
  @Input() count: number = 0;
  @Input() buttonNone: any[] = [];
  @Input() tableName: string = "";

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['buttonNone']) {
      this.buttonNone = this.buttonNone;
    }
  }
  funId: string = '';
  ngOnInit(): void {
    this.funId = this.route.snapshot.paramMap.get('funId') || '';
    const filteredButtons = this.buttons.filter(btn => btn.funId === this.funId);
    this.showButtonss.emit(filteredButtons);
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
