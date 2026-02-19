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

    searchProducts(query: string) {
        const q = query.trim();
        return this.http.get<any[]>('/api/search', { params: { q } });
    }
}