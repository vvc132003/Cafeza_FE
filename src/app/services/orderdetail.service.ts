import { Injectable, TemplateRef } from '@angular/core';
import { API_URLS } from '../config/api-urls';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class OrderDetailService {
    private apiUrl = API_URLS.api + '/OrderDetail';

    constructor(private http: HttpClient, private cookieService: CookieService) {
    }
    // Phương thức GET
    getData(): Observable<any> {
        return this.http.get<any[]>(this.apiUrl);
    }

    getOrderDetailByOrderId(orderId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/orderId/${orderId}`);
    }


    // Phương thức POST
    postData(data: any): Observable<any> {
        // const token = this.cookieService.get('access_token');
        // if (token) {
        //     const decoded: any = jwt_decode(token);
        //     data.orderDto.employeeId = decoded.id;
        // }
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

}
