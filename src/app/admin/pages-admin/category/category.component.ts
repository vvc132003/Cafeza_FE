import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  count: number = 0;
  showButtonsnone: any[] = [];
  pendingActions: any[] = [];
  categories: any[] = [];
  category: any = {};
  newcategory: any = {};
  isModalVisible = false;
  categoryUpcate: any = {};

  showoffcanvas = false;

  @ViewChild('categoryTree', { static: true }) categoryTree!: TemplateRef<any>;
  @ViewChild('categoryAdd', { static: true }) categoryAdd!: TemplateRef<any>;

  private subscription = new Subscription();

  constructor(private categoryService: CategoryService, private cdr: ChangeDetectorRef, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadCategorys();
  }

  //#region load
  loadCategorys() {
    // this.category = null;
    this.subscription.add(
      this.categoryService.getData().subscribe((data: any) => {
        this.categories = data;
        // console.log(this.categories);
        this.category = this.categories[0];
        this.count = this.categories.length;
        if (this.pendingActions.length > 0) {
          this.evetnbuttons(this.pendingActions);
          // this.pendingActions = [];
        }
      })
    );
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  //#region event

  evetnbuttons(actions: any[]) {

    this.showButtonsnone = actions.filter(action => action.id === '101');
    this.cdr.detectChanges();

    if (!this.category || !this.category.id) {
      this.pendingActions = actions;
      return;
    }

    this.showButtonsnone = actions.map(action => {
      // if (action.id === '106' || action.id === '108' || action.id === '109') {
      //   return { ...action, display: 'none' };
      // }
      return action;
    });

    this.cdr.detectChanges();
  }

  selectCategory(event: any) {
    this.category = event;
    // this.evetnbuttons(this.pendingActions);
    // console.log(this.category);
  }

  data: any = {};
  click(event: any) {
    this.isModalVisible = true;

    const modalMap: { [key: string]: () => void } = {
      '101': () => setTimeout(() => this.showoffcanvas = true, 0),
      '102': () => setTimeout(() => this.showoffcanvas = true, 0)
    };

    const openModal = modalMap[event];
    if (openModal) {
      openModal();
    }
    switch (event) {
      case '101':
        // this.showoffcanvas = true;
        this.newcategory = {};
        this.data = {
          action: 'add',
          text: 'Thêm loại món'
        };
        break;
      case '102':
        // this.showoffcanvas = true;
        this.newcategory = this.categories.find(dr => dr.id == this.category.id);
        this.data = {
          action: 'update',
          text: 'Cập nhật loại món'
        };
        break;
      case '103':
        break;
      case '104':
        this.categoryService.deleteData(this.category.id).subscribe(data => {
          this.categories = this.categories.filter(d => d.id !== this.category.id);
          this.category = this.categories[0];
          this.count -= 1;
          this.notificationService.showSuccess('1028');
        })
        break;
      default:
        break;
    }
  }

  newData(data: any) {
    const index = this.categories.findIndex(c => c.id === data.id);
    if (index === -1) {
      this.count += 1;
      // this.categories.unshift(data);
      this.categories = [data, ...this.categories];
    } else {
      const updated = [...this.categories];
      updated[index] = data;
      this.categories = updated;
    }
    this.category = data;
    if (this.pendingActions.length > 0) {
      this.evetnbuttons(this.pendingActions);
      // this.pendingActions = [];
    }
  }

  close() {
    // this.showDetail = false;
    this.showoffcanvas = false;
    setTimeout(() => {
      this.isModalVisible = false;
    }, 400);
  }


}
