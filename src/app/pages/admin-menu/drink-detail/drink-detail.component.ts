import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.scss']
})
export class DrinkDetailComponent {
  @Output() closePupAdd = new EventEmitter<void>();
  @Input() showoffcanvas: boolean = false;

  //#region event

  close() {
    // this.showoffcanvas = false;
    this.closePupAdd.emit();
  }
}
