import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  showoffcanvas = false;
  showAdd = false;

  click(event: any) {
    if (event === '101') {
      this.showoffcanvas = true;
    }
  }

  close() {
    // this.showAdd = false;
    this.showoffcanvas = false;
  }

}
