import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  showoffcanvas = false;
  showButtonsnone: any[] = [];
  count: number = 0;

  private subscription = new Subscription();
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

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
        this.data = {
          action: 'add',
          text: 'Thêm nhân viên'
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
}
