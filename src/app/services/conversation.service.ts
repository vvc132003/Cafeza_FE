import { Injectable, TemplateRef } from '@angular/core';
import { API_URLS } from '../config/api-urls';
import { BehaviorSubject, Observable, EMPTY } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class ConversationService {
    private apiUrl = API_URLS.api + '/Conversation';
    constructor(private http: HttpClient, private cookieService: CookieService) {
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

    getConversations(): Observable<any> {
        const token = this.cookieService.get('access_token');
        const decoded: any = jwt_decode(token);
        return this.http.get<any>(`${this.apiUrl}/getConversations/${decoded.id}`);
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
