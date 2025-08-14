import { Component, OnInit } from '@angular/core';
import { DrinkService } from 'src/app/services/drinkservice';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss'],
})
export class DashboardOverviewComponent implements OnInit {


  constructor(private drinkService: DrinkService) { }

  reportData: any[] = [];
  revenueData: any[] = [];
  orderCountData: any[] = [];

  ngOnInit() {
    this.loadDrinkRevenueReport();
    this.loadRevenueByMonth();
    this.loadOrderCount();
  }

  loadDrinkRevenueReport() {
    this.drinkService.generateDrinkRevenueReport().subscribe((data: any) => {
      const top5 = data.slice(0, 5);
      this.reportData = top5;
    })
  }

  loadOrderCount() {
    this.drinkService.getMonthlyOrderCount().subscribe((data: any) => {
      this.orderCountData = data;
    })
  }


  loadRevenueByMonth() {
    this.drinkService.monthlyRevenue().subscribe((data: any) => {
      this.revenueData = data;
    })
  }

  fromDate: string = '';
  toDate: string = '';

  onFilter() {
    console.log('Lọc từ:', this.fromDate, 'đến:', this.toDate);
    // Gọi API hoặc lọc dữ liệu ở đây
  }

}