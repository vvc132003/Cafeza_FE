import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnChanges, OnInit {
  @Input() users: any[] = [];
  @Input() userselect: any;


  @Output() dblclick = new EventEmitter<void>();
  @Output() Employee = new EventEmitter<any>();

  pagedEmployee: any[] = [];

  currentPage = 1;
  pageSize = 6;
  totalPages = 1;

  ngOnInit(): void {
    if (this.users.length > 0) {
      this.userselect = this.users[0];
    }
    this.updatePagination();
  }

 ngOnChanges(changes: SimpleChanges): void {
  if (changes['users']) {
    setTimeout(() => {
      if (this.users && this.users.length > 0) {
        this.userselect = this.users[0];
      }
      this.currentPage = 1;
      this.updatePagination();
    });
  }
}

  updatePagination() {
    this.totalPages = Math.ceil(this.users.length / this.pageSize);
    this.setPage(this.currentPage);
  }

  setPage(page: number) {
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedEmployee = this.users.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPage(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPage(this.currentPage);
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'đang làm': return 'Đang làm';
      case 'đã nghĩ': return 'Đã nghĩ';
      case 'discontinued': return 'Ngừng bán';
      default: return 'Sửa chữa';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'đang làm': return 'status-available';
      case 'đã nghĩ': return 'status-rented';
      case 'discontinued': return 'status-cleaning';
      default: return 'status-default';
    }
  }

  clickEmployee(Employee: any) {
    this.userselect = Employee;
    this.Employee.emit(Employee);
  }

  dblclickEmployee() {
    this.dblclick.emit();
  }
}