import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Chart,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  PieController,
  BarController,
  LineController,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { DrinkService } from 'src/app/services/drinkservice';

Chart.register(
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  PieController,
  BarController,
  LineController,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-counter-staff',
  templateUrl: './counter-staff.component.html',
  styleUrls: ['./counter-staff.component.scss']
})
export class CounterStaffComponent implements OnInit {

  @ViewChild('radarCanvas', { static: true }) radarCanvas!: ElementRef;

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































 





}
