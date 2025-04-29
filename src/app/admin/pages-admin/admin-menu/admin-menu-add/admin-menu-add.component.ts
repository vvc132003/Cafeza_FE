import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
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
  @Output() newData = new EventEmitter<void>();
  @Input() data: any;
  text: string = "";
  action: string = "";

  @Input() drink: any = {};

  categorys: any[] = [];

  tables = [
    { label: 'Danh mục', icon: 'bi-folder', tab: 'category' },
    { label: 'Thông tin thêm', icon: 'bi-file-earmark-text', tab: 'extraContent' },
    // { label: 'Cài đặt', icon: 'bi-file-earmark-text', tab: 'setting' },
  ];

  private subscription = new Subscription();

  constructor(private notificationService: NotificationService, private drinkService: DrinkService, private categoryService: CategoryService) { }


  //#region  load

  ngOnInit(): void {
    this.fetCategory();
  }

  fetCategory() {
    this.subscription.add(
      this.categoryService.getData().subscribe((data: any) => {
        this.categorys = data.filter((c: any) => c.parentId === null);
      })
    );
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
    if (changes['data'] && changes['data'].currentValue) {
      this.data = { ...changes['data'].currentValue };
      this.text = this.data.text;
      this.action = this.data.action;
    }
  }

  //#region  event


  toSlug(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-');
  }

  onNameChange() {
    this.drink.slug = this.toSlug(this.drink.name);
  }

  save(): void {
    if (this.action === 'add') {
      this.saveDrink();
    } else if (this.action === 'update') {
      this.updateDrink();
    }
  }

  saveDrink() {
    this.drinkService.postData(this.drink).subscribe((data: any) => {
      this.close();
      // console.log(data);
      this.newData.emit(data);
    })
  }

  updateDrink() {
    this.drinkService.updateData(this.drink).subscribe((data: any) => {
      this.close();
      // console.log(data);
      this.newData.emit(data);
    })
  }

  // onFilesSelected(event: any): void {
  //   const file: File = event.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //     const base64String = e.target.result;
  //     this.drink.imagePath = [base64String];
  //   };
  //   reader.readAsDataURL(file);
  // }

  onFilesSelected(event: any): void {
    const reader = new FileReader();
    const file = event.target.files[0];

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Image = reader.result;
        this.drink.imagePath = base64Image;
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
    }
  }


  close() {
    this.closePupAdd.emit();
  }

}
