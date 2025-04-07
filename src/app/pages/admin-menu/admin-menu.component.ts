import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrinkService } from 'src/app/services/drinkservice';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit, OnDestroy {
  showoffcanvas = false;
  showAdd = false;
  showDetail = false;

  selectedRoom: any = {};
  drinks: any[] = [];
  drink: any;
  drinkUpdate: any = {};
  @ViewChild('adminMenuList', { static: true }) adminMenuList!: TemplateRef<any>;
  @ViewChild('adminMenuAdd', { static: true }) adminMenuAdd!: TemplateRef<any>;



  private subscription = new Subscription();

  constructor(private drinkService: DrinkService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadDrinks();
  }
  //#region load
  loadDrinks() {
    this.subscription.add(
      this.drinkService.getData().subscribe((data: any) => {
        this.drinks = data;
        this.drink = this.drinks[0];
        // console.log(data);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //#region event

  newDrink(data: any) {
    this.drinks.unshift(data);
    this.drink = data;
  }

  dblclickDrink() {
    const found = this.drinks.find(dr => dr.id == this.drink.id);
    if (!found) return;
    this.drinkUpdate = found;
    setTimeout(() => this.showDetail = true, 100);
  }

  selectDrink(event: any) {
    this.drink = event;
  }

  click(event: any) {
    if (event === '101') {
      this.showoffcanvas = true;
      this.drinkUpdate = {};
    } else if (event === '102') {
      this.showoffcanvas = true;
      this.drinkUpdate = this.drinks.find(dr => dr.id == this.drink.id);
    }
    else if (event === '103') {
      this.dblclickDrink();
    }
  }

  close() {
    this.showDetail = false;
    this.showoffcanvas = false;
  }
}
