import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { ConversationService } from 'src/app/services/conversation.service';
import { DrinkService } from 'src/app/services/drinkservice';

@Component({
  selector: 'app-layouts',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit, OnChanges, OnInit, OnDestroy {

  @Output() showPupAdd = new EventEmitter<void>();
  @Input() text: string = "";
  @Input() tableName: string = "";
  @Input() count: number = 0;
  // @Input() tabTemplates: TemplateRef<any>[] = [];
  @Input() tabTemplates: { [key: string]: TemplateRef<any> } = {};
  private subscription: Subscription = new Subscription();

  private tabTemplatesSubscription!: Subscription;

  constructor(private cdr: ChangeDetectorRef, private drinkService: DrinkService, private conversationService: ConversationService) { }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    // this.tabTemplatesSubscription = this.drinkService.tabTemplate$.subscribe(
    //   (tabTemplates) => {
    //     this.tabTemplates = tabTemplates;
    //   }
    // );
    // this.cdr.detectChanges();
    this.loadInitialChat();
  }

  conversations: any[] = [];

  loadInitialChat() {
    this.subscription.add(
      forkJoin([
        this.conversationService.postData_Chat()]).subscribe(([resChat]) => {
          if (resChat === true) {
            this.conversationService.getConversations().subscribe((data: any) => {
              this.conversations = data;
              // console.log(data);
            });
          }
        })
    );
  }

  ngOnDestroy() {
    // if (this.tabTemplatesSubscription) {
    //   this.tabTemplatesSubscription.unsubscribe();
    // }
    this.subscription.unsubscribe();
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