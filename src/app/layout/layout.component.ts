import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  @Output() showPupAdd = new EventEmitter<void>();





  //#region  event

  onChildClick(event: any) {
    this.showPupAdd.emit(event);
  }
}