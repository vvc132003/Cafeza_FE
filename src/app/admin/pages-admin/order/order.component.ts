import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  showoffcanvas = false;
  isorderdetailOpen = false;

  private subscription = new Subscription();

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router,
    private drinkService: DrinkService, private categoryService: CategoryService,
    private orderService: OrderService, private notificationService: NotificationService,
    private orderdeatilService: OrderDetailService
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.orderService.getOrderByTableId(this.id).subscribe((data: any) => {
      this.order = data[0];
      this.orderdeatilService.startConnection(this.order.orderId).subscribe(() => {
        this.fetOrderdetail();
      })
      this.drinkService.startConnection().subscribe(() => {
        this.fetDrinks();
      })
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

  //#region  load
  ngOnInit(): void {
    this.fetCategory();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.orderdeatilService.stopConnection();
    this.drinkService.stopConnection();
  }

  fetDrinks() {
    this.subscription.add(
      this.drinkService.getData().subscribe((data: any) => {
        this.drinks = data;
        // console.log(this.drinks);
        this.drinkService.onLoadDrink().subscribe((data: any) => {
          this.newDataDrink(data);
        })
      })
    );
  }

  newDataDrink(data: any) {
    console.log(data);
    const index = this.drinks.findIndex(drink => drink.id === data.id);
    if (index === -1) {
      this.drinks.unshift(data);
    } else {
      this.drinks[index] = data;
    }
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
        // console.log(data);
        this.orderdeatilService.onaddupOrderDetailLoaded().subscribe((newd: any) => {
          this.newOrderdetail(newd);
        })
        this.orderdeatilService.ondeleteOrderDetailLoaded().subscribe((deleted: any) => {
          // console.log(deleted);
          this.orderdetails = this.orderdetails.filter(i => i.orderdetailId !== deleted.orderdetailId);
        })
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

  //#region  event
  data: any = {};
  drinkUpdate: any = {};
  clickAdd() {
    this.showoffcanvas = true;
    this.drinkUpdate = {};
    this.data = {
      action: 'add',
      text: 'Thêm món'
    };
  }
  showModal = false;

  click(data: any) {
    switch (data) {
      case '112':
        this.showModal = true;
        break;
      default:
        break;
    }
  }

  confirmCancel() {
    this.orderService.updateCancelOrder(this.order.orderId).subscribe((data) => {
      this.showModal = false;
      this.router.navigate(['/admin/tables/1002']);
      this.notificationService.showSuccess('1010');
    })
  }

  close() {
    this.showoffcanvas = false;
    this.isorderdetailOpen = false;
  }

  deleteor(data: any) {
    this.subscription.add(
      this.orderdeatilService.deleteData(data.orderdetailId).subscribe(() => {
        // thông báo nhé
      })
    )
  }
  dataupdateorderdetail: any = {};
  updateor(data: any) {
    this.dataupdateorderdetail = data;
    this.isorderdetailOpen = true;
  }

  updateQuantity(data: any) {
    // console.log(data);
    // console.log(this.dataupdateorderdetail);
    const requestData = {
      quantity: data.quantity,
      note: data.note ?? "",
      extenOrderDetail: this.dataupdateorderdetail
    };
    if (data.quantity === this.dataupdateorderdetail.quantity) {
      this.notificationService.showWarning('1007');
      return;
    }
    this.subscription.add(
      this.orderdeatilService.updateData(requestData).subscribe((data) => {
        // console.log('ok');
        this.notificationService.showSuccess('1008');
        this.close();
      })
    )

  }


  orderdetail: any = {};
  addOrderDetail(sp: any) {
    // console.log(sp);
    this.orderdetail.quantity = 1;
    // this.orderdetail.note = null;
    this.orderdetail.orderId = this.order.orderId;
    this.orderdetail.drinkId = sp.id;
    this.orderdetail.unitPrice = sp.price;
    this.orderdetail.total = sp.price * this.orderdetail.quantity;
    const requestData = {
      orderDetailDto: this.orderdetail,
      drinkDTO: sp,
    };

    if (sp != null && sp.quantity == 0) {
      this.notificationService.showWarning('1006');
      return;
    }

    this.subscription.add(
      this.orderdeatilService.postData(requestData).subscribe((data: any) => {
        // this.newOrderdetail(data);
        this.notificationService.showSuccess('1009');
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
