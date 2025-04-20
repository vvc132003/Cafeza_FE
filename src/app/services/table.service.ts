import { Injectable, TemplateRef } from '@angular/core';
import { API_URLS } from '../config/api-urls';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';

@Injectable({
    providedIn: 'root'
})
export class TableService {
    private apiUrl = API_URLS.api + '/Table';
    private hubUrl = API_URLS.hub;
    private hubConnection: signalR.HubConnection;

    constructor(private http: HttpClient) {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(this.hubUrl)
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
    onTableLoaded(): Observable<any> {
        return new Observable((observer) => {
            this.hubConnection.on('loadTable', (data) => {
                observer.next(data);
                // console.log(data);
            });
        });
    }


    // Phương thức GET
    getData(): Observable<any> {
        return this.http.get<any[]>(this.apiUrl);
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

}
