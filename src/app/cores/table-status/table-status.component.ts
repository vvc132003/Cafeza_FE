import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-status',
  templateUrl: './table-status.component.html',
  styleUrls: ['./table-status.component.scss']
})
export class TableStatusComponent {
  @Input() table: any = {};


  getStatusText(): string {
    switch (this.table.status) {
      case 'empty': return 'Trống';
      case 'reserved': return 'Đã đặt';
      case 'occupied': return 'Có khách';
      default: return 'Sửa chữa';
    }
  }

  getStatusClass(): string {
    switch (this.table.status) {
      case 'empty': return 'status-empty';
      case 'reserved': return 'status-reserved';
      case 'occupied': return 'status-occupied';
      default: return 'status-default';
    }
  }

  getIconStyle(): any {
    switch (this.table.status) {
      case 'empty': return { color: '#28a745' };
      case 'occupied': return { color: '#ffc107' };
      default: return { color: '#6c757d' };
    }
  }

  getStatusIcon(): string {
    switch (this.table.status) {
      case 'empty':
        return 'fa fa-chair'; // hoặc 'fa fa-circle-check'
      case 'occupied':
        return 'fa fa-users'; // hoặc 'fa fa-user'
      case 'reserved':
        return 'fa fa-calendar-check'; // hoặc 'fa fa-bookmark'
      default:
        return 'fa fa-question-circle'; // hoặc 'fa fa-cogs'
    }
  }



  currentDate: Date = new Date();
  showTooltip: boolean = false;

  getFlagStatus(): string {
    return this.currentDate < new Date(this.table.endDate) ? 'Đúng hạn' : 'Quá hạn';
  }

  getFlagClass() {
    const currentDate = new Date();
    const endDate = new Date(this.table.endDate);
    // console.log(currentDate);
    return {
      'color': currentDate < endDate ? 'green' : 'red'
    };
  }

}
