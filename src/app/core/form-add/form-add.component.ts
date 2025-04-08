import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss']
})
export class FormAddComponent implements AfterViewInit {
  @Input() headerDiv?: any;
  // @Input() categoryContent: TemplateRef<any[]> | null = null;
  @Input() tabTemplates: { [key: string]: TemplateRef<any> } = {};
  // @Input() extraContent: TemplateRef<any> | null = null;
  @Input() text: string = "";
  // @ViewChild('contentContainer', { read: ViewContainerRef }) contentContainer!: ViewContainerRef;
  // @ViewChild('extraContainer', { read: ViewContainerRef }) extraContainer!: ViewContainerRef;


  @Input() showoffcanvas = false;

  isLargeScreen: boolean = window.innerWidth > 470;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isLargeScreen = window.innerWidth > 470;
  }
  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }



  //#region  event

  selectedTab: string = 'category';
  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  @Output() closePupAdd = new EventEmitter<void>();

  close() {
    this.showoffcanvas = false;
    this.closePupAdd.emit();
  }

}