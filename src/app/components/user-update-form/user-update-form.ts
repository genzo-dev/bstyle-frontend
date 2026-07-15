import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { asyncDelay } from '../../utils/async-delay';
import { Button } from '../button/button';
import { InputComponent } from '../input/input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-update-form',
  imports: [ReactiveFormsModule, Button, InputComponent],
  templateUrl: './user-update-form.html',
})
export class UserUpdateForm {
  @Input() initialData: any;
  @Output() onSubmit = new EventEmitter<any>();

  isLoading = false;
  form: FormGroup;

  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
  ) {
    this.form = this.fb.group({
      nome: [''],
      telefone: [''],
      cidade: [''],
      estado: [''],
      rua: [''],
      numero: [''],
    });
  }

  ngOnChanges() {
    const user = this.auth.user();

    if (user) {
      this.form.patchValue({
        nome: user.nome,
        telefone: user.telefone,
        cidade: user.cidade,
        estado: user.estado,
        rua: user.rua,
        numero: user.numero,
      });
      if (user.fotoPerfilUrl) {
        this.imagePreview = user.fotoPerfilUrl;
      }
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async submit() {
    if (this.isLoading) return;

    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;

    try {
      await asyncDelay(2000);
      this.form.disabled;
      this.onSubmit.emit({
        ...this.form.value,
        fotoPerfil: this.selectedFile,
      });
    } finally {
      this.isLoading = false;
      this.form.enable;
    }
  }
}
