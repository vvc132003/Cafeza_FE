import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrinkService } from 'src/app/services/drinkservice';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
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
  private subscription = new Subscription();
  constructor(private drinkService: DrinkService) { }

  ngOnInit(): void {
    this.fetDrink_list();
  }

  fetDrink_list() {
    this.subscription.add(
      this.drinkService.getDataDrink_list().subscribe((response: any) => {  
        this.categoryDrinks = response; 
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.tableService.stopConnection();
  }


}
