import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnChanges {

  @Input() showoffcanvas = false;
  @Output() closePupAdd = new EventEmitter<void>();
  @Input() data: any;
  text: string = "";
  action: string = "";
  @Input() user: any = {};
  @Input() employee: any = {};



  constructor(private employeeService: EmployeeService) { }

  tables = [
    // { label: 'Danh mục', icon: 'bi-folder', tab: 'category' },
    { label: 'Thông tin chung', icon: 'bi-file-earmark-text', tab: 'category' },
    { label: 'Cài đặt', icon: 'bi-file-earmark-text', tab: 'setting' },
  ];


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.data = { ...changes['data'].currentValue };
      this.text = this.data.text;
      this.action = this.data.action;
    }
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let code = 'MN-';

    for (let i = 0; i < 3; i++) {
      code += letters[Math.floor(Math.random() * letters.length)];
      code += numbers[Math.floor(Math.random() * numbers.length)];
    }
    this.employee.code = code
  }

  close() {
    this.closePupAdd.emit();
  }

  rolesInput: string = '';

  save() {
    this.employee.roles = this.rolesInput.split(',').map(role => role.trim());
    this.employee.status = 'đang làm';
    this.user.isDeleted = true;
    this.user.role = 'employee';
    const data = {
      employeeDetailsDTO: this.employee,
      userDTO: this.user,
    }
    // console.log(data);
    this.employeeService.postData(data).subscribe((res: any) => {
      console.log('thành công !');
    })
  }

}
