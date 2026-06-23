import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  @Input() initialData: any;
  @Output() onSubmit = new EventEmitter<any>();

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

  submit() {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      console.log('FORM INVÁLIDO');
      return;
    }

    console.log('SUBMIT OK');
    this.onSubmit.emit(this.form.value);
  }
}
