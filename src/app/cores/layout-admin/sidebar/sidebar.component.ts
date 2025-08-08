import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = [
    { icon: '🏠', label: 'Trang chủ', route: '/admin/dashboard' },
    { icon: '🍹', label: 'Loại món', route: '/admin/categories', funId: '1001' },
    { icon: '☕', label: 'Quản lý món', route: '/admin/drinks', funId: '1001' },
    { icon: '🧾', label: 'Đơn hàng', route: '/admin/orders' },
    { icon: '🪑', label: 'Bàn', route: '/admin/tables', funId: '1002' },
    { icon: '👨‍🍳', label: 'Nhân viên', route: '/admin/employee', funId: '1005' },
    { icon: '📊', label: 'Doanh thu', route: '/admin/revenue' },
  ];
}