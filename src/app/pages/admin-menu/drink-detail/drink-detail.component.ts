import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrinkService } from 'src/app/services/drinkservice';

@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.scss']
})
export class DrinkDetailComponent implements OnInit, OnDestroy {
  @Output() closePupAdd = new EventEmitter<void>();
  @Input() showoffcanvas: boolean = false;

  private subscription = new Subscription();

  constructor(private drinkService: DrinkService, private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
  }
  //#region load
  loadDrinks() {
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //#region event

  close() {
    // this.showoffcanvas = false;
    this.closePupAdd.emit();
  }
}