import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Button } from '../button/button';
import { InputComponent } from '../input/input';

@Component({
  selector: 'app-create-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, Button, InputComponent],
  templateUrl: './create-product-form.html',
})
export class CreateProductForm {
  @Input() initialData: any;
  @Input() loading = false;
  @Output() onSubmit = new EventEmitter<any>();

  form: FormGroup;
  fotosSelecionadas: File[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: [''],
      descricao: [''],
      preco: [0],
      quantidade: [1],
      tipoId: [1],
      coresIds: [''],
      tagsIds: [''],
    });
  }

  ngOnInit() {
    if (this.initialData) {
      this.form.patchValue(this.initialData);
    }
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.fotosSelecionadas = Array.from(input.files);
    }
  }

  submit() {
    if (this.loading) return;
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    this.onSubmit.emit({
      ...this.form.value,
      fotos: this.fotosSelecionadas,
    });
  }
}
