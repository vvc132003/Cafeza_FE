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
export class EmployeeService implements CanActivate {
    private apiUrl = API_URLS.api + '/Employee';
    private token = this.cookieService.get('access_token');

    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, { email, password });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const token = this.cookieService.get('access_token'); // bạn nên lấy token ở đây
        if (token) {
            const decoded: any = jwt_decode(token);
            const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

            if (role === "Admin") {
                return true;
            }

            const currentRoutePath = route.url.map(segment => segment.path).join('/');

            if (role === "Staff") {
                if (currentRoutePath === 'admin/categories/1001') {
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
    updateData(data: any): Observable<any> {
        return this.http.put<any>(this.apiUrl, data);
    }

    // Phương thức DELETE
    deleteData(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

}
