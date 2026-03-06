import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NotificationService } from 'src/app/services/notification';
import { Userservice } from 'src/app/services/Userservice';

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



  constructor(private userService: Userservice, private notificationService: NotificationService) { }

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
    if (this.user && !this.user.code) {

      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
      let code = 'MN-';

      for (let i = 0; i < 3; i++) {
        code += letters[Math.floor(Math.random() * letters.length)];
        code += numbers[Math.floor(Math.random() * numbers.length)];
      }
      this.user.code = code
    }
  }

  close() {
    this.closePupAdd.emit();
  }

  rolesInput: string = '';
  @Output() newData = new EventEmitter<void>();
  save() {
    if (this.action === 'add') {
      this.saveE();
    } else if (this.action === 'update') {
      this.updateE();
    }
  }
  saveE() {

    if (!this.user) {
      return;
    }

    if (!this.user.fullName || !this.user.phoneNumber) {
      this.notificationService.showSuccess("1030");
      return;
    }
    this.user.isDeleted = true;
    this.user.role = 'employee';
    this.user.membershipLevel = "Thường";
    this.user.rewardPoints = "0";

    // console.log(data);
    this.userService.postData(this.user).subscribe((res: any) => {
      this.close();
      this.newData.emit(res);
      this.notificationService.showSuccess("1029");
    })
  }


  updateE() {
    this.userService.updateData(this.user.id, this.user).subscribe((res: any) => {
      this.close();
      this.newData.emit(res);
      this.notificationService.showSuccess("1031");
    })
  }

}
