import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { DrinkService } from '../services/drinkservice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit, OnChanges, OnInit, OnDestroy {

  @Output() showPupAdd = new EventEmitter<void>();
  @Input() text: string = "";
  @Input() count: number = 0;
  // @Input() tabTemplates: TemplateRef<any>[] = [];
  @Input() tabTemplates: { [key: string]: TemplateRef<any> } = {};

  private tabTemplatesSubscription!: Subscription;

  constructor(private cdr: ChangeDetectorRef, private drinkService: DrinkService) { }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    // this.tabTemplatesSubscription = this.drinkService.tabTemplate$.subscribe(
    //   (tabTemplates) => {
    //     this.tabTemplates = tabTemplates;
    //   }
    // );
    // this.cdr.detectChanges();
  }
  ngOnDestroy() {
    // if (this.tabTemplatesSubscription) {
    //   this.tabTemplatesSubscription.unsubscribe();
    // }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['tabTemplates']) {
      // console.log('Tab templates:', this.tabTemplates); // Kiểm tra xem các TemplateRef có hợp lệ không
    }
  }



  @Output() showButtonss = new EventEmitter<any[]>();
  @Input() buttonNone: any[] = [];
  evetnbuttons(event: any) {
    this.showButtonss.emit(event);
  }

  //#region  event

  onChildClick(event: any) {
    this.showPupAdd.emit(event);
  }
}