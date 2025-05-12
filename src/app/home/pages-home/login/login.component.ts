import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EmployeeService } from 'src/app/services/employee.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private router: Router, private employeeService: EmployeeService, private cookieService: CookieService) { }
  onLogin() {

    this.employeeService.login(this.email, this.password).subscribe((res: any) => {
      const expireDate = new Date();
      expireDate.setMinutes(expireDate.getMinutes() + 1);
      this.cookieService.set('access_token', res.token, {
        path: '/',
        expires: expireDate,
        secure: false,
        sameSite: 'Strict'
      });

      if (res.token) {
        const token = res.token;
        const decoded: any = jwt_decode(token);
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        if (role === 'Admin') {
          this.router.navigate(['/admin/tables/1002']);
        } else if (role === 'Staff') {
          this.router.navigate(['/admin/categories/1001']);
        } else if (role === 'Customer') {
          this.router.navigate(['/']);
        }
      } else {
        console.error('Đăng nhập không thành công: Không có token');
      }
    })

  }


}
