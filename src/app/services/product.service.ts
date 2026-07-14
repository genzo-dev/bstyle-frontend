import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) {}

  getMyProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/meus-produtos`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getProductsBySearch(nome?: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      map((products) => {
        if (!nome) return products;
        return products.filter((p) => p.nome.toLowerCase().includes(nome.toLowerCase()));
      }),
    );
  }

  registerProduct(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, formData);
  }

  updateProduct(id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
