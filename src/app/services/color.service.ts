import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Color } from '../types/product.type';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private apiUrl = 'http://localhost:8080/cores';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Color[]> {
    return this.http.get<Color[]>(this.apiUrl);
  }
}
