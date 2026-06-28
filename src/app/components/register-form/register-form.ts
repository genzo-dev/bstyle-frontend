import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Button } from '../button/button';
import { asyncDelay } from '../../utils/async-delay';
import { InputComponent } from '../input/input';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, Button, InputComponent],
  templateUrl: './register-form.html',
})
export class RegisterForm {
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
      return;
    }

    this.isLoading = true;

    try {
      await asyncDelay(2000);
      this.form.disabled;
      this.onSubmit.emit(this.form.value);
    } finally {
      this.isLoading = false;
      this.form.enable;
    }
  }
}
