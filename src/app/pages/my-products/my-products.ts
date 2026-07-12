import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { firstValueFrom } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-products.html',
})
export class MyProducts implements OnInit {
  products: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      this.loading = true;
      this.products = await firstValueFrom(this.productService.getMyProducts());
    } catch (err) {
      this.errorMessage = 'Erro ao carregar seus produtos.';
      console.error(err);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  async handleDelete(id: number, productName: string) {
    if (confirm(`Tem certeza que deseja excluir o produto "${productName}"?`)) {
      try {
        await firstValueFrom(this.productService.deleteProduct(id));
        this.products = this.products.filter(p => p.id !== id);
        this.cdr.detectChanges();
      } catch (err) {
        alert('Erro ao deletar o produto. Tente novamente.');
        console.error(err);
      }
    }
  }
}