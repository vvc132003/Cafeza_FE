import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  @Output() showPupAdd = new EventEmitter<void>();
  @Input() text: string = "";





  //#region  event

  onChildClick(event: any) {
    this.showPupAdd.emit(event);
  }
}