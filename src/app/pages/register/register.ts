import { Component } from '@angular/core';
import api from '../../../../libs/axios-config';
import { UserForm } from '../../components/user-form/user-form';
import { userSchema } from '../../schemas/user/user.schema';
import { getZodErrorMessages } from '../../utils/get-zod-error-messages';
import { ZodError } from 'zod';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [UserForm, CommonModule],
  templateUrl: './register.html',
})
export class Register {
  errors: string[] = [];

  async handleSubmit(data: any) {
    this.errors = [];

    try {
      const parsed = userSchema.parse(data);

      await api.post('/auth/registrar', parsed);
      console.log('DEU BOM');
      alert('Usuário criado com sucesso!');
    } catch (err) {
      if (err instanceof ZodError) {
        console.log('ERRO AQUI', err);

        this.errors = getZodErrorMessages(err.format());
      }
    }
  }
}
