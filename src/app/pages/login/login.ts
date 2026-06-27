import { Component } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';
import { CommonModule } from '@angular/common';
import { loginSchema } from '../../schemas/auth/auth.schema';
import api from '../../../../libs/axios-config';
import { ZodError } from 'zod';
import { getZodErrorMessages } from '../../utils/get-zod-error-messages';

@Component({
  selector: 'app-login',
  imports: [LoginForm, CommonModule],
  templateUrl: './login.html',
})
export class Login {
  errors: string[] = [];

  async handleSubmit(data: any) {
    this.errors = [];

    try {
      const parsed = loginSchema.parse(data);

      const token = btoa(`${parsed.login}:${parsed.senha}`);

      localStorage.setItem('auth', token);

      // Confirma usuário logado via requisição autenticada
      const getUsers = await api.get('/usuarios/perfil');
      console.log('Usuários encontrados:', getUsers);
    } catch (err) {
      if (err instanceof ZodError) {
        this.errors = getZodErrorMessages(err.format());
      } else {
        this.errors = ['Login ou senha inválidos'];
      }
    }
  }
}
