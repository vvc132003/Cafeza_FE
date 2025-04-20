import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrinkService } from 'src/app/services/drinkservice';

@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.scss']
})
export class DrinkDetailComponent implements OnInit, OnDestroy, OnChanges {
  @Output() closePupAdd = new EventEmitter<void>();
  @Input() showoffcanvas: boolean = false;
  @Input() drink: any = {};
  text: string = "";

  getStatusText(status: string): string {
    switch (status) {
      case 'available': return 'Có sẵn';
      case 'out_of_stock': return 'Hết hàng';
      case 'discontinued': return 'Ngừng bán';
      default: return 'Sửa chữa';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'available': return 'status-available';
      case 'out_of_stock': return 'status-rented';
      case 'discontinued': return 'status-cleaning';
      default: return 'status-default';
    }
  }

  private subscription = new Subscription();

  constructor(private drinkService: DrinkService, private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
  }
  //#region load
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['drink']) {
      // this.drink.imagePath = 'https://classiccoffee.com.vn/upload/xzYyaYzbM7FgfiwHSe76KCpPOdgpqnyXWxw.jpg'
      this.text = "Xem chi tiết: " + this.drink.name;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //#region event

  close() {
    // this.showoffcanvas = false;
    this.closePupAdd.emit();
  }

  showZoomBtn: boolean = false;
  isModalOpen: boolean = false;

  onHover() {
    this.showZoomBtn = true;
  }
  onLeave() {
    this.showZoomBtn = false;
  }

  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
}