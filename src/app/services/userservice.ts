import { Injectable, TemplateRef } from '@angular/core';
import { API_URLS } from '../config/api-urls';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
@Injectable({
    providedIn: 'root'
})
export class Userservice implements CanActivate {
    private apiUrl = API_URLS.api + '/User';
    private token = this.cookieService.get('access_token');

    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, { email, password });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const token = this.cookieService.get('access_token');
        if (token) {
            const decoded: any = jwt_decode(token);
            const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            if (role === "admin") {
                return true;
            }

            const currentRoutePath = route.url.map(segment => segment.path).join('/');

            if (role === "employee") {
                if (currentRoutePath === 'staff/bartending/1006') {
                    return true;
                } else {
                    return this.router.parseUrl(currentRoutePath);
                }
            }

        }

        return this.router.parseUrl('/');
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
    updateData(id: string, data: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, data);
    }

    // Phương thức DELETE
    deleteData(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

}
