import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss']
})
export class CategoryTreeComponent implements OnInit, OnChanges {
  @Input() categories: any[] = [];
  tree: any[] = [];
  drinkselect: any = null;

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categories'] && changes['categories'].currentValue) {
      // épp về mảng nếu là object kiểu {0: {...}, 1: {...}}
      const raw = changes['categories'].currentValue;
      this.categories = Array.isArray(raw) ? raw : Object.values(raw);
      this.tree = this.buildTree(this.categories, null);
    }
  }


  buildTree(categories: any[], parentId: string | null): any[] {
    return categories
      .filter(cat => cat.parentId === parentId)
      .map(cat => ({
        ...cat,
        children: this.buildTree(categories, cat.id)
      }));
  }


}
