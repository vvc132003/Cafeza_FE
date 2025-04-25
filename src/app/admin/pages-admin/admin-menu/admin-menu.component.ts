import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrinkService } from 'src/app/services/drinkservice';
import { NotificationService } from 'src/app/services/notification';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit, OnDestroy {
  showoffcanvas = false;
  // showAdd = false;
  showDetail = false;

  selectedRoom: any = {};
  drinks: any[] = [];
  drink: any;
  drinkUpdate: any = {};
  count: number = 0;
  @ViewChild('adminMenuList', { static: true }) adminMenuList!: TemplateRef<any>;
  @ViewChild('adminMenuAdd', { static: true }) adminMenuAdd!: TemplateRef<any>;



  private subscription = new Subscription();

  constructor(private drinkService: DrinkService, private cdr: ChangeDetectorRef,private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadDrinks();
  }
  //#region load
  loadDrinks() {
    this.subscription.add(
      this.drinkService.getData().subscribe((data: any) => {
        this.drinks = data;
        // console.log(this.drinks);
        this.drink = this.drinks[0];
        this.count = this.drinks.length;
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

  newData(data: any) {
    const index = this.drinks.findIndex(drink => drink.id === data.id);
    if (index === -1) {
      this.count += 1;
      this.drinks.unshift(data);
    } else {
      this.drinks[index] = data;
    }
    this.drink = data;
    if (this.pendingActions.length > 0) {
      this.evetnbuttons(this.pendingActions);
      // this.pendingActions = [];
    }
  }


  dbclickDrink() {
    const found = this.drinks.find(dr => dr.id == this.drink.id);
    if (!found) return;
    this.drinkUpdate = found;
    setTimeout(() => this.showDetail = true, 100);
  }

  selectDrink(event: any) {
    this.drink = event;
    this.evetnbuttons(this.pendingActions);
    // console.log(this.drink);
  }
  data: any = {};
  click(event: any) {
    switch (event) {
      case '101':
        this.showoffcanvas = true;
        this.drinkUpdate = {};
        this.data = {
          action: 'add',
          text: 'Thêm món'
        };
        break;
      case '102':
        this.showoffcanvas = true;
        this.drinkUpdate = this.drinks.find(dr => dr.id == this.drink.id);
        this.data = {
          action: 'update',
          text: 'Cập nhật món'
        };
        break;
      case '103':
        this.dbclickDrink();
        break;
      case '104':
        // console.log(this.drink.id);
        this.drinkService.deleteData(this.drink.id).subscribe(data => {
          this.drinks = this.drinks.filter(d => d.id !== this.drink.id);
          this.drink = this.drinks[0];
        })
        break;
      default:
        break;
    }
  }

  close() {
    this.showDetail = false;
    this.showoffcanvas = false;
  }

  showButtonsnone: any[] = [];
  pendingActions: any[] = [];

  evetnbuttons(actions: any[]) {
    this.showButtonsnone = actions.filter(action => action.id === '101');
    this.cdr.detectChanges();

    if (!this.drink || !this.drink?.status) {
      this.pendingActions = actions;
      return;
    }

    switch (this.drink?.status) {
      case 'available':
        this.showButtonsnone = actions.map(action => {
          if (action.id === '104') {
            return { ...action, display: 'none' };
          }
          return action;
        });
        break;
      case 'out_of_stock':
        this.showButtonsnone = actions.map(action => {
          if (action.id === '109') {
            return { ...action, display: 'none' };
          }
          return action;
        });
        break;
      case 'Cleaning':
        break;
      default:
        break;
    }
    // this.showButtonsnone = actions.map(action => {
    //   if (action.id === '106'|| action.id === '108') {
    //     return { ...action, display: 'none' };
    //   }
    //   return action;
    // });
    this.cdr.detectChanges();
  }

}
