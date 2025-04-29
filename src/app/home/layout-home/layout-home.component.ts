import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout-home',
  templateUrl: './layout-home.component.html',
  styleUrls: ['./layout-home.component.scss']
})
export class LayoutHomeComponent implements OnInit {
  keywordFromNavbar: string = '';
  showHeader: boolean = true;
  @Input() text: string = "";
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.router.url !== '/') {
      this.showHeader = false;
    }
  }

  onSearchChange(keyword: string): void {
    this.keywordFromNavbar = keyword;
  }

}
