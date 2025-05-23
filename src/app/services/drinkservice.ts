import { Injectable, TemplateRef } from '@angular/core';
import { API_URLS } from '../config/api-urls';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import * as signalR from '@microsoft/signalr';

@Injectable({
    providedIn: 'root'
})
export class DrinkService {
    private apiUrl = API_URLS.api + '/Drink';
    private hubUrl = API_URLS.hub;
    private hubConnection: signalR.HubConnection;
    // private token = this.cookieService.get('access_token');

    constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(this.hubUrl)
            .configureLogging(signalR.LogLevel.Error)
            .build();
    }

    /// mở kết nối đến websoket
    startConnection(): Observable<void> {
        return new Observable<void>((observer) => {
            this.hubConnection
                .start()
                .then(() => {
                    // console.log('Connection established with SignalR hub');
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

    /// lắng nghe sự kiện loadTable từ server
    onLoadDrink(): Observable<any> {
        return new Observable((observer) => {
            this.hubConnection.on('loadDrink', (data) => {
                observer.next(data);
                // console.log(data);
            });
        });
    }

    // Phương thức GET
    // getData(): Observable<any> {
    // return this.http.get<any[]>(this.apiUrl, { withCredentials: true });
    // }

    getData(): Observable<any> {
        const token = this.cookieService.get('access_token');
        if (!this.checkTokenExpiration()) {
            return of(null);  // Nếu token hết hạn, không thực hiện request và dừng lại
        }

        if (!token) {
            // console.error('Token not found');
        }
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        });
        return this.http.get<any[]>(this.apiUrl, { headers });

    }

    checkTokenExpiration() {
        const token = this.cookieService.get('access_token');

        if (!token) {
            this.router.navigate(['/login']);
            return false;
        }

        const decoded: any = jwt_decode(token);
        const expireTimestamp = decoded.exp * 100000; // exp trong token là thời gian hết hạn, tính bằng giây
        const currentTimestamp = new Date().getTime(); // Thời gian hiện tại

        // Kiểm tra nếu token đã hết hạn
        if (expireTimestamp < currentTimestamp) {
            this.router.navigate(['/login']); // iều hướng về trang login nếu token hết hạn
            return false;
        }

        return true;
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
