import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrinkService } from 'src/app/services/drinkservice';
import { NotificationService } from 'src/app/services/notification';

@Component({
  selector: 'app-admin-menu-add',
  templateUrl: './admin-menu-add.component.html',
  styleUrls: ['./admin-menu-add.component.scss']
})
export class AdminMenuAddComponent implements OnInit, OnChanges, OnDestroy {

  // @ViewChild('extraContent') extraContent!: TemplateRef<any>;
  @Input() showoffcanvas = false;
  @Output() closePupAdd = new EventEmitter<void>();
  @Output() newDrink = new EventEmitter<void>();



  @Input() drink: any = {};
  categories = [
    { id: '1', name: 'Đồ uống' },
    { id: '2', name: 'Đồ ăn' },
    { id: '3', name: 'Tráng miệng' }
  ];

  tables = [
    { label: 'Danh mục', icon: 'bi-folder', tab: 'category' },
    { label: 'Thông tin thêm', icon: 'bi-file-earmark-text', tab: 'extraContent' },
    // { label: 'Cài đặt', icon: 'bi-file-earmark-text', tab: 'setting' },
  ];

  private subscription = new Subscription();

  constructor(private notificationService: NotificationService, private drinkService: DrinkService) { }


  //#region  load

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['drink'] && changes['drink'].currentValue) {
      this.drink = { ...changes['drink'].currentValue };
    }
    if (this.drink && !this.drink.sku) {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
      let sku = 'MN-';

      for (let i = 0; i < 3; i++) {
        sku += letters[Math.floor(Math.random() * letters.length)];
        sku += numbers[Math.floor(Math.random() * numbers.length)];
      }
      this.drink.sku = sku
    }
  }

  //#region  event

  save(): void {
    this.saveDrink();
  }
  saveDrink() {
    this.drinkService.postData(this.drink).subscribe((data: any) => {
      this.close();
      // console.log(data);
      this.newDrink.emit(data);
    })
  }
  onFileChange($event: Event) {
  }

  close() {
    this.closePupAdd.emit();
  }

}
