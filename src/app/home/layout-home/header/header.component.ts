import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DrinkService } from 'src/app/services/drinkservice';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges {
  heroSlides = [
    {
      title: "Chào mừng đến với Cafeza",
      subtitle: "Thưởng thức hương vị cà phê tuyệt hảo mỗi ngày",
      button1: { text: "Xem Menu", link: "/menu" },
      button2: { text: "Đặt bàn", link: "/booking" },
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1950&q=80"
    },
    {
      title: "Hương vị cà phê nguyên bản",
      subtitle: "Từ hạt cà phê rang xay thủ công",
      button1: { text: "Sản phẩm", link: "/products" },
      button2: null,
      image: "https://classiccoffee.com.vn/files/common/cafe-ngon-da-nang-luu-giu-huong-vi-ca-phe-nguyen-ban-1j6sv.jpg"
    },
    {
      title: "Không gian ấm cúng, hiện đại",
      subtitle: "Thư giãn và làm việc cùng ly cà phê đậm đà",
      button1: { text: "Về chúng tôi", link: "/about" },
      button2: { text: "Liên hệ", link: "/contact" },
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1950&q=80"
    }
  ];

  // category: string = "";
  // drinks: any[] = [];
  categoryDrinks: any[] = [];
  originalCategoryDrinks: any[] = [];
  private subscription = new Subscription();
  constructor(private drinkService: DrinkService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetDrink_list();
  }

  fetDrink_list() {
    this.subscription.add(
      this.drinkService.getDataDrink_list().subscribe((response: any) => {
        this.categoryDrinks = response;
        this.originalCategoryDrinks = response;
        this.categoryDrinks.forEach(category => {
          category.visibleDrinks = category.drinks.slice(0, 5);
        });
      })
    );
  }

  showMore(category: any) {
    const currentLength = category.visibleDrinks.length;
    const moreDrinks = category.drinks.slice(currentLength, currentLength + 5);
    category.visibleDrinks = [...category.visibleDrinks, ...moreDrinks];
  }

  @Input() keyword: string = '';
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['keyword']) {
      // console.log(this.keyword);
      this.onSearch(this.keyword);
    }
  }

  onSearch(keyword: string): void {
    const lowerKeyword = keyword.toLowerCase().trim();

    if (!lowerKeyword) {
      this.categoryDrinks = this.originalCategoryDrinks;
      this.categoryDrinks.forEach(category => {
        category.visibleDrinks = category.drinks.slice(0, 5);
      });
      return;
    }

    this.categoryDrinks = this.originalCategoryDrinks
      .map(category => {
        const matchedDrinks = category.drinks.filter((drink: any) =>
          drink.name.toLowerCase().includes(lowerKeyword)
        );

        if (matchedDrinks.length > 0) {
          return {
            ...category,
            drinks: matchedDrinks,
            visibleDrinks: matchedDrinks.slice(0, 5)
          };
        }
        return null;
      })
      .filter(category => category !== null);
  }

  onTableDoubleClick(drink: any): void {
    this.drinkService.setDrink(drink);
    this.router.navigate([`/drinks/drink-detail/${drink.slug}-${drink.sku}`]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.tableService.stopConnection();
  }


}
