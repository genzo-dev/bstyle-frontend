import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WhatsappService } from '../../services/whatsapp.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, CurrencyPipe, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  produtos: any[] = [];
  loading = true;
  filtroSelecionado: string | number | null = null;
  searchTerm = '';

  tipos = [
    { id: 1, nome: 'Roupas' },
    { id: 2, nome: 'Calçados' },
    { id: 3, nome: 'Acessórios' },
  ];

  private readonly API_URL = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private whatsappService: WhatsappService,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.carregarTodosProdutos();
  }

  carregarTodosProdutos(): void {
    this.loading = true;
    this.filtroSelecionado = null;
    this.searchTerm = '';

    this.productService.getProductsBySearch().subscribe({
      next: (dados) => {
        this.produtos = dados.map((produto) => ({
          ...produto,
          urlCompletaFoto: produto.fotos
            ? `${this.API_URL}/uploads/${produto.fotos}`
            : 'assets/placeholder.jpg',
        }));

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  filtrarPorTipo(tipoId: number): void {
    this.loading = true;
    this.filtroSelecionado = tipoId;

    this.http.get<any[]>(`${this.API_URL}/produtos/tipo/${tipoId}`).subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  filtrarDoacoes(): void {
    this.loading = true;
    this.filtroSelecionado = 'doacoes';

    this.http.get<any[]>(`${this.API_URL}/produtos/doacoes`).subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  realizarBusca(): void {
    this.loading = true;
    this.filtroSelecionado = null;

    this.productService.getProductsBySearch(this.searchTerm).subscribe({
      next: (dados) => {
        this.produtos = dados.map((produto) => ({
          ...produto,
          urlCompletaFoto: produto.fotos
            ? `${this.API_URL}/uploads/${produto.fotos}`
            : 'assets/placeholder.jpg',
        }));

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  verContato(produto: any): void {
    if (produto) {
      this.whatsappService.abrirConversa(produto.vendedorTelefone, produto.nome);
    }
  }

  getUrlImagem(fotoNome: string): string {
    return fotoNome ? `${this.API_URL}/uploads/${fotoNome}` : 'assets/placeholder.jpg';
  }
}
