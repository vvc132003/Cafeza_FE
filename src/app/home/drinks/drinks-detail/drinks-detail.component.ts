import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrinkService } from 'src/app/services/drinkservice';

@Component({
  selector: 'app-drinks-detail',
  templateUrl: './drinks-detail.component.html',
  styleUrls: ['./drinks-detail.component.scss']
})
export class DrinksDetailComponent implements OnInit, OnDestroy {
  drink: any;

  constructor(private drinkService: DrinkService) { }

  ngOnInit(): void {
    this.drink = this.drinkService.getDrink();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('selectedDrink');
  }
}