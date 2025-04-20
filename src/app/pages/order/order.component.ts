import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { DrinkService } from 'src/app/services/drinkservice';
import { NotificationService } from 'src/app/services/notification';
import { OrderService } from 'src/app/services/order.service';

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
    private orderService: OrderService,private notificationService: NotificationService
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.orderService.getOrderByTableId(this.id).subscribe((data: any) => {
      console.log(data);
      this.order = data[0];
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

  maHoaDon = 'HD00123';
  ngayTao = new Date();
  nhanVien = 'Nguyễn Văn A';
  tenBan = 'Bàn 05';

  chiTietHoaDon = [
    { tenSanPham: 'Cà phê sữa', soLuong: 2, donGia: 25000 },
    { tenSanPham: 'Trà đào', soLuong: 1, donGia: 30000 }
  ];
  // chiTietHoaDon: any[] = [];
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

  tinhTongTien() {
    return this.chiTietHoaDon.reduce((sum, item) => sum + item.soLuong * item.donGia, 0);
  }

  tongThanhToan() {
    return this.tinhTongTien() - this.giamGia + this.thue;
  }

  xoaSanPham(item: any) {
    this.chiTietHoaDon = this.chiTietHoaDon.filter(i => i !== item);
  }

  themVaoHoaDon(sp: any) {
    const found = this.chiTietHoaDon.find(i => i.tenSanPham === sp.name);
    if (found) {
      found.soLuong += 1;
    } else {
      // this.chiTietHoaDon.push({ tenSanPham: sp.name, soLuong: 1, donGia: sp.price });
      this.chiTietHoaDon.unshift({ tenSanPham: sp.name, soLuong: 1, donGia: sp.price });
    }
  }

  thanhToan() {
    alert('Đã thanh toán thành công!');
  }

}
