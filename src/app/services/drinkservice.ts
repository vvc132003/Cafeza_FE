import { Injectable, TemplateRef } from '@angular/core';
import { API_URLS } from '../config/api-urls';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DrinkService {
    private apiUrl = API_URLS.api + '/Drink';
    constructor(private http: HttpClient) {
    }
    // Phương thức GET
    getData(): Observable<any> {
        return this.http.get<any[]>(this.apiUrl);
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
