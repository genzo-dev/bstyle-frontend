import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Button } from '../button/button';
import { InputComponent } from '../input/input';
import { MultiSelectComponent } from '../multi-select/multi-select';
import { ColorService } from '../../services/color.service';
import { TagService } from '../../services/tag.service';
import { Color, Tag } from '../../types/product.type';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, Button, InputComponent, MultiSelectComponent],
  templateUrl: './create-product-form.html',
})
export class CreateProductForm implements OnInit {
  @Input() initialData: any;
  @Input() loading = false;
  @Output() onSubmit = new EventEmitter<any>();

  form: FormGroup;
  fotosSelecionadas: File[] = [];
  cores: Color[] = [];
  tags: Tag[] = [];

  constructor(
    private fb: FormBuilder,
    private colorService: ColorService,
    private tagService: TagService,
  ) {
    this.form = this.fb.group({
      nome: [''],
      descricao: [''],
      preco: [0],
      quantidade: [1],
      tipoId: [1],
      coresIds: [[]],
      tagsIds: [[]],
    });
  }

  async ngOnInit() {
    await Promise.all([this.loadCores(), this.loadTags()]);
    if (this.initialData) {
      this.form.patchValue(this.initialData);
    }
  }

  async loadCores() {
    try {
      this.cores = await firstValueFrom(this.colorService.getAll());
    } catch {
      this.cores = [];
    }
  }

  async loadTags() {
    try {
      this.tags = await firstValueFrom(this.tagService.getAll());
    } catch {
      this.tags = [];
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
