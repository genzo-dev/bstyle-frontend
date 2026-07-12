import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './edit-product.html',
})
export class EditProduct implements OnInit {
  productForm!: FormGroup;
  productId!: number;
  loading: boolean = true;
  submitting: boolean = false;
  errorMessage: string = '';
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.initForm();
    this.loadProductData();
  }

  initForm() {
    this.productForm = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      preco: [0, [Validators.required, Validators.min(0)]],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      tipoId: [1, [Validators.required]]
    });
  }

  async loadProductData() {
    try {
      this.loading = true;
      const product = await firstValueFrom(this.productService.getProductById(this.productId));
      
      this.productForm.patchValue({
        nome: product.nome,
        descricao: product.descricao,
        preco: product.preco,
        quantidade: product.quantidade,
        tipoId: product.tipoId
      });

      if (product.fotos) {
        this.imagePreview = `http://localhost:8080/uploads/${product.fotos}`;
      }
    } catch (err) {
      this.errorMessage = 'Erro ao carregar dados do produto.';
      console.error(err);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    if (this.productForm.invalid) return;

    try {
      this.submitting = true;
      this.errorMessage = '';
      this.cdr.detectChanges(); 
      const formData = new FormData();
      formData.append('nome', this.productForm.get('nome')?.value);
      formData.append('descricao', this.productForm.get('descricao')?.value);
      formData.append('preco', this.productForm.get('preco')?.value);
      formData.append('quantidade', this.productForm.get('quantidade')?.value);
      formData.append('tipoId', this.productForm.get('tipoId')?.value);
      
      if (this.selectedFile) {
        formData.append('fotos', this.selectedFile);
      }

      await firstValueFrom(this.productService.updateProduct(this.productId, formData));
      
      this.router.navigate(['/meus-produtos']);
    } catch (err) {
      this.errorMessage = 'Erro ao atualizar o produto. Verifique os campos.';
      console.error(err);
    } finally {
      this.submitting = false;
      this.cdr.detectChanges();
    }
  }
}