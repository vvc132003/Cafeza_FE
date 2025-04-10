import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-node',
  templateUrl: './category-node.component.html',
  styleUrls: ['./category-node.component.scss']
})
export class CategoryNodeComponent {
  @Input() category: any;
  @Input() level: number = 0;
  @Input() isLast: boolean = false;
  isExpanded: boolean = false;
  @Input() cateogryselect: any;
  @Output() nodeSelected = new EventEmitter<any>();

  clickEvent() {
    // console.log(this.category);
    this.nodeSelected.emit(this.category);
  }

  toggleExpand() {
    if (this.category.children?.length) {
      this.category.isExpanded = !this.category.isExpanded;
    }
  }


  getPrefix(): string {
    const lines = [];
    for (let i = 0; i < this.level - 1; i++) {
      lines.push('|  ');
    }
    if (this.level > 0) {
      lines.push(this.isLast ? '└─' : '├─');
    }
    return lines.join('');
  }

  getStatusText(isActive: boolean): string {
    switch (isActive) {
      case true: return 'Đang hoạt động';
      case false: return 'Không hoạt động';
      default: return '';
    }
  }

  getStatusClass(isActive: boolean): string {
    switch (isActive) {
      case true: return 'status-available';
      case false: return 'status-rented';
      default: return '';
    }
  }

}
