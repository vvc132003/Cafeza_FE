import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Userservice } from 'src/app/services/Userservice';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  pendingActions: any[] = [];

  showoffcanvas = false;
  showButtonsnone: any[] = [];
  count: number = 0;
  users: any[] = [];
  user: any = {};
  userUpdate: any = {};

  private subscription = new Subscription();
  constructor(private cdr: ChangeDetectorRef, private userservice: Userservice) { }

  ngOnInit(): void {
    this.loaduser();
  }

  loaduser() {
    this.subscription.add(
      this.userservice.getData().subscribe((res: any[]) => {
        this.users = res;
        this.count = res.length;
        this.user = res[0];
        if (this.pendingActions.length > 0) {
          this.evetnbuttons(this.pendingActions);
          // this.pendingActions = [];
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  //#region  event


  evetnbuttons(event: any[]) {
    this.showButtonsnone = event;
    this.cdr.detectChanges();

  }
  data: any = {};
  click(event: any) {
    switch (event) {
      case '101':
        this.showoffcanvas = true;
        this.userUpdate = {};
        this.data = {
          action: 'add',
          text: 'Thêm nhân viên'
        };
        break;

      case '102':
        this.showoffcanvas = true;
        this.userUpdate = this.users.find(e => e.id === this.user.id);
        this.data = {
          action: 'update',
          text: 'Cập nhật nhân viên'
        };
        break;
      default:
        break;
    }
  }

  close() {
    // this.showDetail = false;
    this.showoffcanvas = false;
  }

  dbclickEm() {
    // const found = this.users.find(dr => dr.id == this.user.id);
    // if (!found) return;
    // this.drinkUpdate = found;
    // setTimeout(() => this.showDetail = true, 100);
  }

  selectEm(event: any) {
    this.user = event;
    // this.evetnbuttons(this.pendingActions);
    // console.log(this.drink);
  }

  newData(data: any) {
    const index = this.users.findIndex(drink => drink.id === data.id);
    if (index === -1) {
      this.count += 1;
      this.users = [data, ...this.users];
    } else {
      const updated = [...this.users];
      updated[index] = data;
      this.users = updated;
    }
    this.user = data;
    if (this.pendingActions.length > 0) {
      this.evetnbuttons(this.pendingActions);
      // this.pendingActions = [];
    }
  }

}
