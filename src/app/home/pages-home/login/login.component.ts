import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Userservice } from 'src/app/services/Userservice';
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
  constructor(private router: Router, private employeeService: Userservice, private cookieService: CookieService) { }
  onLogin() {

    this.employeeService.login(this.email, this.password).subscribe((res: any) => {
      const expireDate = new Date();
      expireDate.setMinutes(expireDate.getMinutes() + 1000000);
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
        if (role === 'admin') {
          this.router.navigate(['/admin/dashboard/1000']);
        } else if (role === 'employee') {
          this.router.navigate(['/staff/bartending/1006']);
        } else if (role === 'customer') {
          this.router.navigate(['/']);
        }
      } else {
      }
    })

  }


}
