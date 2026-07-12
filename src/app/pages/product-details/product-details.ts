import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgClass, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { WhatsappService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgClass, CurrencyPipe],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  idProduto!: string;
  product: any;
  private readonly API_URL = 'http://localhost:8080';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private whatsappService: WhatsappService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.idProduto = this.route.snapshot.paramMap.get('id')!;

    this.productService.getProductById(Number(this.idProduto)).subscribe((product) => {
      console.log('Produto recebido:', product);
      this.product = product;
      this.cd.detectChanges();
    });
  }

  getUrlImagem(fotoNome: string): string {
    return fotoNome ? `${this.API_URL}/uploads/${fotoNome}` : 'assets/placeholder.jpg';
  }

  verContato(): void {
    if (this.product) {
      this.whatsappService.abrirConversa(this.product.vendedorTelefone, this.product.nome);
    }
  }
}
