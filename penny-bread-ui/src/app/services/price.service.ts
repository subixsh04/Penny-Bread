import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { appConfig } from "../app.config";

@Injectable({
    providedIn: 'root'
})
export class PriceService {
    private apiUrl = appConfig.apiUrl;

    constructor(private http: HttpClient) {}

    getPrices(item: string, location: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/search`, {
            params: { item, location }
        });
    }
}