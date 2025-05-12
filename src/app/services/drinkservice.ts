import { Injectable, TemplateRef } from '@angular/core';
import { API_URLS } from '../config/api-urls';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class DrinkService {
    private apiUrl = API_URLS.api + '/Drink';
    private token = this.cookieService.get('access_token');

    constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    }
    // Phương thức GET
    // getData(): Observable<any> {
    // return this.http.get<any[]>(this.apiUrl, { withCredentials: true });
    // }

    getData(): Observable<any> {

        if (!this.checkTokenExpiration()) {
            return of(null);  // Nếu token hết hạn, không thực hiện request và dừng lại
        }

        if (!this.token) {
            // console.error('Token not found');
        }
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/json',
        });
        return this.http.get<any[]>(this.apiUrl, { headers });

    }

    checkTokenExpiration() {
        const token = this.cookieService.get('access_token');

        if (!token) {
            this.router.navigateByUrl('/login');
            return false; // Không có token, yêu cầu phải đăng nhập lại
        }

        const decoded: any = jwt_decode(token);
        const expireTimestamp = decoded.exp * 1000; // exp trong token là thời gian hết hạn, tính bằng giây
        const currentTimestamp = new Date().getTime(); // Thời gian hiện tại

        // Kiểm tra nếu token đã hết hạn
        if (expireTimestamp < currentTimestamp) {
            this.router.navigateByUrl('/login'); // Điều hướng về trang login nếu token hết hạn
            return false; // Token hết hạn
        }

        return true; // Token còn hiệu lực
    }


    getDataDrink_list(): Observable<any> {
        return this.http.get<any[]>(`${this.apiUrl}/drink-list`);
    }

    // Phương thức POST
    postData(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, data);
    }

    // Phương thức PUT
    updateData(data: any): Observable<any> {
        return this.http.put<any>(this.apiUrl, data);
    }

    // Phương thức DELETE
    deleteData(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }


    /// chia sẽ dữ liệu

    private selectedDrink: any;

    setDrink(drink: any): void {
        this.selectedDrink = drink;
        localStorage.setItem('selectedDrink', JSON.stringify(drink));
    }

    getDrink(): any {
        if (!this.selectedDrink) {
            const stored = localStorage.getItem('selectedDrink');
            if (stored) {
                this.selectedDrink = JSON.parse(stored);
            }
        }
        return this.selectedDrink;
    }


}
