import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../types/product.type';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private apiUrl = 'http://localhost:8080/tags';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl);
  }
}
