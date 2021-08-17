import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    constructor(private http: HttpClient) { }

    saveClient(name: string) {
        return this.http.post(`${environment.api}/api/clients`, {
            name
        });
    }
}
