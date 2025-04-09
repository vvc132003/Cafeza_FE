import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

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
  categoryUpcate: any = {};

  showoffcanvas = false;

  @ViewChild('categoryTree', { static: true }) categoryTree!: TemplateRef<any>;
  @ViewChild('categoryAdd', { static: true }) categoryAdd!: TemplateRef<any>;

  private subscription = new Subscription();

  constructor(private categoryService: CategoryService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadCategorys();
  }

  //#region load
  loadCategorys() {
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
    if (!this.category) {
      this.pendingActions = actions;
      return;
    }
    this.showButtonsnone = actions.map(action => {
      if (action.id === '106' || action.id === '108') {
        return { ...action, display: 'none' };
      }
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
    switch (event) {
      case '101':
        this.showoffcanvas = true;
        this.category = {};
        this.data = {
          action: 'add',
          text: 'Thêm loại món'
        };
        break;
      case '102':
        this.showoffcanvas = true;
        this.category = this.categories.find(dr => dr.id == this.category.id);
        this.data = {
          action: 'update',
          text: 'Cập nhật loại món'
        };
        break;
      case '103':
        break;
      case '104':

        break;
      default:
        break;
    }
  }

  newData(data: any) {
    const index = this.categories.findIndex(c => c.id === data.id);
    if (index === -1) {
      this.count += 1;
      this.categories.unshift(data);
    } else {
      this.categories[index] = data;
    }
    this.category = data;
  }

  close() {
    // this.showDetail = false;
    this.showoffcanvas = false;
  }


}
