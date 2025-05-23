import { Injectable, TemplateRef } from '@angular/core';
import { API_URLS } from '../config/api-urls';
import { BehaviorSubject, Observable, EMPTY, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import * as signalR from '@microsoft/signalr';

@Injectable({
    providedIn: 'root'
})
export class ConversationService {
    private hubUrl = API_URLS.hub;
    private apiUrl = API_URLS.api + '/Conversation';
    private hubConnection1: signalR.HubConnection;
    private hubConnection2: signalR.HubConnection;



    constructor(private http: HttpClient, private cookieService: CookieService) {
        this.hubConnection1 = new signalR.HubConnectionBuilder()
            .withUrl(this.hubUrl)
            .configureLogging(signalR.LogLevel.Error)
            .build();
        this.hubConnection2 = new signalR.HubConnectionBuilder()
            .withUrl(this.hubUrl)
            .configureLogging(signalR.LogLevel.Error)
            .build();
    }


    /// mở kết nối đến websoket
    startConnection1(conversationId: string): Observable<void> {
        return new Observable<void>((observer) => {
            this.hubConnection1
                .start()
                .then(() => {
                    // console.log('Connection established with SignalR hub');
                    this.hubConnection1.invoke('JoinGropsChat', conversationId);
                    observer.next();
                    observer.complete();
                })
                .catch((error) => {
                    // console.error('Error connecting to SignalR hub:', error);
                    observer.error(error);
                });
        });
    }

    startConnection2(userId: string): Observable<void> {
        return new Observable<void>((observer) => {
            this.hubConnection2
                .start()
                .then(() => {
                    // console.log('Connection established with SignalR hub');
                    this.hubConnection2.invoke('JoinGropsChatConversation', userId);
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
    stopConnection1(): void {
        if (this.hubConnection1) {
            this.hubConnection1.off("LoadMessage");
            this.hubConnection1.stop();
        }
    }

    // stopConnection1(): void {
    //     if (this.hubConnection1) {
    //         this.hubConnection1.stop().catch();
    //     }
    // }

    stopConnection2(): void {
        if (this.hubConnection2) {
            this.hubConnection1.off("LoadConversation");
            this.hubConnection2.stop()
        }
    }


    /// lắng nghe sự kiện LoadMessage từ server
    onaddupChat(): Observable<any> {
        return new Observable((observer) => {
            this.hubConnection1.on('LoadMessage', (data: any) => {
                observer.next(data);
                // console.log(data);
            });
        });
    }

    loadConversation(): Observable<any> {
        return new Observable((observer) => {
            this.hubConnection2.on('LoadConversation', (data: any) => {
                observer.next(data);
                // console.log(data);
            });
        });
    }

    logTyping(): Observable<any> {
        return new Observable((observer) => {
            this.hubConnection2.on('ReceiveTypingStatus', (data: any) => {
                observer.next(data);
                // console.log(data);
            });
        });
    }


    postlogTyping(data: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/log-typing`, data);
    }


    // Phương thức GET
    getData(): Observable<any> {
        return this.http.get<any[]>(this.apiUrl);
    }

    // Phương thức POST

    postData(): Observable<any> {
        const token = this.cookieService.get('access_token');
        // if (!token) {
        //     return EMPTY;
        // }

        const decoded: any = jwt_decode(token);
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        // if (role === "customer") {
        //     return EMPTY; 
        // }

        const data = {
            userId2: decoded.id,
            role: role
        };

        return this.http.post<any>(`${this.apiUrl}/createConverstation`, data);
    }

    postChat(data: any): Observable<any> {
        const token = this.cookieService.get('access_token');
        const decoded: any = jwt_decode(token);
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        // const data = {
        //     userId2: decoded.id,
        //     role: role
        // };

        return this.http.post<any>(`${this.apiUrl}/createChat`, data);
    }

      postChatReply(data: any): Observable<any> {
        const token = this.cookieService.get('access_token');
        const decoded: any = jwt_decode(token);
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        // const data = {
        //     userId2: decoded.id,
        //     role: role
        // };

        return this.http.post<any>(`${this.apiUrl}/replyMessage`, data);
    }



    getConversations(): Observable<any> {
        const token = this.cookieService.get('access_token');
        const decoded: any = jwt_decode(token);
        return this.http.get<any>(`${this.apiUrl}/getConversations/${decoded.id}`);
    }

    getMessages(conversationId: string): Observable<any> {
        const token = this.cookieService.get('access_token');
        const decoded: any = jwt_decode(token);
        return this.http.get<any>(`${this.apiUrl}/getMessages/${conversationId}/${decoded.id}`);
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
