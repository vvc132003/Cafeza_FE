import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = [
    { icon: '🏠', label: 'Trang chủ', route: '/admin/dashboard' },
    { icon: '🍹', label: 'Loại món', route: '/admin/categories' },
    { icon: '☕', label: 'Quản lý món', route: '/admin/drinks' },
    { icon: '🧾', label: 'Đơn hàng', route: '/admin/orders' },
    { icon: '🪑', label: 'Bàn', route: '/admin/tables' },
    { icon: '👨‍🍳', label: 'Nhân viên', route: '/admin/staff' },
    { icon: '📊', label: 'Doanh thu', route: '/admin/revenue' },
  ];
}