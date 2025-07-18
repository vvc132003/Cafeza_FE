import { Injectable, TemplateRef } from '@angular/core';
import { API_URLS } from '../config/api-urls';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import * as signalR from '@microsoft/signalr';

@Injectable({
    providedIn: 'root'
})
export class OrderDetailService {
    private apiUrl = API_URLS.api + '/OrderDetail';
    private hubUrl = API_URLS.hub;
    private hubConnection: signalR.HubConnection;


    constructor(private http: HttpClient, private cookieService: CookieService) {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(this.hubUrl)
            .configureLogging(signalR.LogLevel.Error)
            .build();
    }

    /// mở kết nối đến websoket
    startConnection(orderId: string): Observable<void> {
        return new Observable<void>((observer) => {
            this.hubConnection
                .start()
                .then(() => {
                    // console.log('Connection established with SignalR hub');
                    this.hubConnection.invoke('JoinOrderDetailOrderId', orderId);
                    observer.next();
                    observer.complete();
                })
                .catch((error) => {
                    // console.error('Error connecting to SignalR hub:', error);
                    observer.error(error);
                });
        });
    }

    /// ngắt kết nối websoket 
    stopConnection(): void {
        if (this.hubConnection) {
            this.hubConnection.stop()
                .catch();
        }
    }


    /// lắng nghe sự kiện LoadOrderId từ server
    onaddupOrderDetailLoaded(): Observable<any> {
        return new Observable((observer) => {
            this.hubConnection.on('LoadOrderId', (data) => {
                observer.next(data);
                // console.log(data);
            });
        });
    }

    ondeleteOrderDetailLoaded(): Observable<any> {
        return new Observable((observer) => {
            this.hubConnection.on('RemoveOrderDetailId', (data) => {
                observer.next(data);
                // console.log(data);
            });
        });
    }

    // Phương thức GET
    getData(): Observable<any> {
        return this.http.get<any[]>(this.apiUrl);
    }

    getOrderDetailByOrderId(orderId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/orderId/${orderId}`);
    }

    getAllOrdersDetail(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getAllOrdersDetail`);
    }

    getExportInvoice(orderId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/exportInvoice/${orderId}`);
    }

    updateOrderDetailStatus(orderdetailId: number, status: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/updateStatusdetail/${orderdetailId}/${status}`);
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
