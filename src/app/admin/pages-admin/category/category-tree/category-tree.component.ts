import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss']
})
export class CategoryTreeComponent implements OnInit, OnChanges {
  @Input() categories: any[] = [];
  tree: any[] = [];
  @Input() cateogryselect: any = null;
  @Output() clickcategory = new EventEmitter<void>();

  clickdrinkselect(event: any) {
    this.clickcategory.emit(event);
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categories'] && changes['categories'].currentValue) {
      // épp về mảng nếu là object kiểu {0: {...}, 1: {...}}
      const raw = changes['categories'].currentValue;
      this.categories = Array.isArray(raw) ? raw : Object.values(raw);
      this.tree = this.buildTree(this.categories, null);
      if (this.cateogryselect?.parentId) {
        this.expandParentPath(this.cateogryselect.parentId, this.tree);
      }
    }
  }
  /// đệ quy
  expandParentPath(parentId: any, nodes: any[]): boolean {
    for (let node of nodes) {
      if (node.id === parentId) {
        node.isExpanded = true;
        return true;
      }
      if (node.children?.length) {
        const found = this.expandParentPath(parentId, node.children);
        if (found) {
          node.isExpanded = true;
          return true;
        }
      }
    }
    return false;
  }


  buildTree(categories: any[], parentId: string | null): any[] {
    return categories
      .filter(cat => cat.parentId === parentId)
      .map(cat => ({
        ...cat,
        isExpanded: false,
        children: this.buildTree(categories, cat.id)
      }));
  }
}
