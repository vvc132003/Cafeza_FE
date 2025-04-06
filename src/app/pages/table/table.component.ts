import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  showoffcanvas = false;
  showAdd = false;
  selectedRoom: any = {};
  
  click(event: any) {
    if (event === '101') {
      this.showoffcanvas = true;
      this.selectedRoom = {};
    } else if (event === '102') {
      this.showoffcanvas = true;
      this.selectedRoom.roomName = 'hahha';
    }
  }

  close() {
    // this.showAdd = false;
    this.showoffcanvas = false;
  }

}
