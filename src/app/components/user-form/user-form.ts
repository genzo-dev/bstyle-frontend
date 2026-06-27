import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Button } from '../button/button';
import { asyncDelay } from '../../utils/async-delay';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, Button],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  @Input() initialData: any;
  @Output() onSubmit = new EventEmitter<any>();

  isLoading = false;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      login: [''],
      senha: [''],
      nome: [''],
      telefone: [''],
      cidade: [''],
      estado: [''],
      rua: [''],
      numero: [''],
      fotoPerfilUrl: [''],
    });
  }

  ngOnInit() {
    if (this.initialData) {
      this.form.patchValue(this.initialData);
    }
  }

  async submit() {
    if (this.isLoading) return;

    this.form.markAllAsTouched();

    if (!this.form.valid) {
      console.log('FORM INVÁLIDO');
      return;
    }

    this.isLoading = true;

    try {
      console.log('SUBMIT OK');

      await asyncDelay(2000);
      this.form.disabled;
      this.onSubmit.emit(this.form.value);
    } finally {
      this.isLoading = false;
      this.form.enable;
    }
  }
}
