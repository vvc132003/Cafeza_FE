import { Injectable, TemplateRef } from '@angular/core';
import { API_URLS } from '../config/api-urls';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private apiUrl = API_URLS.api + '/Cart';

    constructor(private http: HttpClient, private cookieService: CookieService) {
    }
    // Phương thức GET
    getData(): Observable<any> {
        return this.http.get<any[]>(this.apiUrl);
    }

    getCurrentCartByUserIdAsync(): Observable<any> {
        const token = this.cookieService.get('access_token');
        if (!token) {
            return of(null);
        }
        const decoded: any = jwt_decode(token);
        return this.http.get<any>(`${this.apiUrl}/getCurrentCartByUserIdAsync/${decoded.id}`);
    }


    updateCancelOrder(data: any): Observable<any> {
        // return this.http.get<any>(`${this.apiUrl}/updateCancelOrder/${orderId}`);
        const token = this.cookieService.get('access_token');
        if (token) {
            const decoded: any = jwt_decode(token);
            data.employeeId = decoded.id;
        }
        // console.log(data);
        return this.http.post<any>(`${this.apiUrl}/updateCancelOrder`, data);

    }

    decreaseQuantity(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/decreaseQuantity/${id}`);
    }

    increaseQuantity(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/increaseQuantity/${id}`);
    }
    /// hàm decreaseQuantity và increaseQuantity gộp thành hàm changeQuantity

    changeQuantity(drinkId: string, cartId: string, change: number): Observable<any> {
        // console.log(drinkId, cartId, change);
        return this.http.get<any>(`${this.apiUrl}/changeQuantity/${drinkId}/${cartId}?change=${change}`);
    }


    ///
    updateStatus(id: string, status: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/updateStatus/${id}/${status}`);
    }

    updateStatusMultiple(ids: string[], status: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/updateStatusMultiple`, { ids, status });
    }


    changeTable(data: any): Observable<any> {
        const token = this.cookieService.get('access_token');
        if (token) {
            const decoded: any = jwt_decode(token);
            data.employeeId = decoded.id;
        }
        // console.log(data);
        return this.http.post<any>(`${this.apiUrl}/changeTable`, data);
    }

    pay(data: any): Observable<any> {
        // const token = this.cookieService.get('access_token');
        // if (token) {
        //     const decoded: any = jwt_decode(token);
        //     data.employeeId = decoded.id;
        // }
        // // console.log(data);
        return this.http.post<any>(`${this.apiUrl}/pay`, data);
    }



    // Phương thức POST
    postData(data: any): Observable<any> {
        const token = this.cookieService.get('access_token');
        if (token) {
            const decoded: any = jwt_decode(token);
            data.userId = decoded.id;
        }
        return this.http.post<any>(`${this.apiUrl}`, data);
    }

    // Phương thức PUT
    updateData(data: any): Observable<any> {
        return this.http.put<any>(this.apiUrl, data);
    }

    // Phương thức DELETE
    deleteData(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }


    private cartCountSubject = new BehaviorSubject<number>(0);
    cartCount$ = this.cartCountSubject.asObservable();

    updateCartCount(count: number) {
        this.cartCountSubject.next(count);
    }

    // getCartCount(): number {
    //     return this.cartCountSubject.value;
    // }

}
