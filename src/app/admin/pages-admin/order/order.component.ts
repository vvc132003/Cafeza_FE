import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { DrinkService } from 'src/app/services/drinkservice';
import { NotificationService } from 'src/app/services/notification';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetailService } from 'src/app/services/orderdetail.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  showButtonsnone: any[] = [];
  pendingActions: any[] = [];
  id: string = "";
  order: any = {};
  private subscription = new Subscription();

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute,
    private drinkService: DrinkService, private categoryService: CategoryService,
    private orderService: OrderService, private notificationService: NotificationService,
    private orderdeatilService: OrderDetailService
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.orderService.getOrderByTableId(this.id).subscribe((data: any) => {
      this.order = data[0];
      this.fetOrderdetail();
    })
  }

  evetnbuttons(actions: any[]) {
    this.showButtonsnone = actions.map(action => {
      if (action.id != '110' && action.id != '111' && action.id != '112' && action.id != '113' && action.id != '114' && action.id != '115') {
        return { ...action, display: 'none' };
      }
      return action;
    });
    this.cdr.detectChanges();
  }

  // maHoaDon = 'HD00123';
  // ngayTao = new Date();
  // nhanVien = 'Nguyễn Văn A';
  // tenBan = 'Bàn 05';

  orderdetails: any[] = [
    // { tenSanPham: 'Cà phê sữa', soLuong: 2, donGia: 25000 },
    // { tenSanPham: 'Trà đào', soLuong: 1, donGia: 30000 }
  ];
  // orderdetail: any[] = [];
  drinks: any[] = [
    // { ten: 'Cà phê sữa', gia: 25000, loai: 'Cà phê', hinhAnh: 'assets/images/caphe-sua.jpg' },
    // { ten: 'Trà đào', gia: 30000, loai: 'Trà', hinhAnh: 'assets/images/tra-dao.jpg' },
    // { ten: 'Sinh tố bơ', gia: 40000, loai: 'Sinh tố', hinhAnh: 'assets/images/sinh-to-bo.jpg' }
  ];

  categorys: any[] = [{ name: 'Tất cả', id: '0' }];

  ngOnInit(): void {
    this.fetCategory();
    this.fetDrinks();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetDrinks() {
    this.subscription.add(
      this.drinkService.getData().subscribe((data: any) => {
        this.drinks = data;
        // console.log(this.drinks);
      })
    );
  }

  fetCategory() {
    this.subscription.add(
      this.categoryService.getData().subscribe((data: any) => {
        this.categorys = [{ name: 'Tất cả', id: '0' }, ...data.filter((c: any) => c.parentId === null)];
      })
    );
  }

  fetOrderdetail() {
    this.subscription.add(
      this.orderdeatilService.getOrderDetailByOrderId(this.order.orderId).subscribe((data: any) => {
        // console.log("ok");
        this.orderdetails = data;
        console.log(data)
      })
    )
  }

  timKiemTen: string = '';
  loaiDuocChon: string = '0';

  get sanPhamLoc(): any[] {
    return this.drinks.filter(sp => {
      return (this.loaiDuocChon === '0' || sp.categoryId === this.loaiDuocChon) &&
        sp.name.toLowerCase().includes(this.timKiemTen.toLowerCase());
    });
  }

  tienKhachTra: number = 0;
  tinhTienThoi(): number {
    const tong = this.tinhTongTien();
    return this.tienKhachTra > tong ? this.tienKhachTra - tong : 0;
  }


  giamGia = 10000;
  thue = 5000;


  formatCurrency(amount: number) {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }


  tinhTongTien() {
    return this.orderdetails.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }

  tongThanhToan() {
    return this.tinhTongTien();
  }

  xoaSanPham(item: any) {
    this.orderdetails = this.orderdetails.filter(i => i !== item);
  }
  orderdetail: any = {};
  addOrderDetail(sp: any) {
    // console.log(sp);
    this.orderdetail.quantity = 1;
    this.orderdetail.note = "No sugar";
    this.orderdetail.orderId = this.order.orderId;
    this.orderdetail.drinkId = sp.id;
    this.orderdetail.unitPrice = sp.price;
    this.orderdetail.total = sp.price * this.orderdetail.quantity;
    const requestData = {
      orderDetailDto: this.orderdetail,
      drinkDTO: sp,
    };
    this.subscription.add(
      this.orderdeatilService.postData(requestData).subscribe((data: any) => {
        this.newOrderdetail(data);
      })
    )
  }

  newOrderdetail(data: any) {
    const index = this.orderdetails.findIndex(c => c.orderdetailId === data.orderdetailId);
    if (index === -1) {
      this.orderdetails.unshift(data);
    } else {
      this.orderdetails[index] = data;
    }
  }


  thanhToan() {
    alert('Đã thanh toán thành công!');
  }

}
