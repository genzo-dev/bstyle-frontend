import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CreateProductForm } from '../../components/create-product-form/create-product-form';
import { ProductService } from '../../services/product.service';
import { productCreateSchema } from '../../schemas/product/product.schema';
import { getZodErrorMessages } from '../../utils/get-zod-error-messages';
import { ZodError } from 'zod';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, RouterLink, CreateProductForm],
  templateUrl: './create-product.html',
})
export class CreateProduct {
  loading = false;
  errors: string[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
  ) {}

  async handleSubmit(data: any) {
    if (this.loading) return;
    this.errors = [];

    try {
      const dataNumerico = {
        ...data,
        preco: Number(data.preco),
        quantidade: Number(data.quantidade),
        tipoId: Number(data.tipoId),
      };
      const parsed = productCreateSchema.parse(dataNumerico);

      this.loading = true;

      const formData = new FormData();
      formData.append('nome', parsed.nome);
      formData.append('descricao', parsed.descricao);
      formData.append('preco', String(parsed.preco));
      formData.append('quantidade', String(parsed.quantidade));
      formData.append('tipoId', String(parsed.tipoId));

      if (parsed.coresIds) {
        formData.append('coresIds', parsed.coresIds);
      }
      if (parsed.tagsIds) {
        formData.append('tagsIds', parsed.tagsIds);
      }

      const fotos: File[] = data.fotos ?? [];
      for (const foto of fotos) {
        formData.append('fotos', foto);
      }

      await firstValueFrom(this.productService.registerProduct(formData));

      this.router.navigate(['/meus-produtos']);
    } catch (err) {
      if (err instanceof ZodError) {
        this.errors = getZodErrorMessages(err.format());
        return;
      }
      if (err instanceof HttpErrorResponse) {
        this.errors = ['Erro ao cadastrar produto. Tente novamente.'];
        return;
      }
      this.errors = ['Ocorreu um erro inesperado.'];
    } finally {
      this.loading = false;
    }
  }
}
