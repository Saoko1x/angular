import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListedApiService {
  private apiKey = 'HM1koDVmNfOizeRYAcMBgvYs0pc213Wp';
  private baseUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${this.apiKey}&limit=10`;

  constructor(private http: HttpClient) {}

  getGifs(): Observable<any[]> {
    return this.http
      .get<any>(this.baseUrl)
      .pipe(map((response: any) => response.data));
  }
}
