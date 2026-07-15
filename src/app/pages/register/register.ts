import { Component } from '@angular/core';
import { userCreateSchema } from '../../schemas/user/user.schema';
import { getZodErrorMessages } from '../../utils/get-zod-error-messages';
import { ZodError } from 'zod';
import { CommonModule } from '@angular/common';
import { RegisterForm } from '../../components/register-form/register-form';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [RegisterForm, CommonModule],
  templateUrl: './register.html',
})
export class Register {
  constructor(
    private router: Router,
    private http: UserService,
  ) {}

  errors: string[] = [];

  async handleSubmit(data: any) {
    this.errors = [];

    try {
      const { fotoPerfil, ...formData } = data;
      const parsed = userCreateSchema.parse(formData);

      const formDataObj = new FormData();
      formDataObj.append('login', parsed.login);
      formDataObj.append('nome', parsed.nome);
      formDataObj.append('senha', parsed.senha);
      if (parsed.telefone) formDataObj.append('telefone', parsed.telefone);
      if (parsed.cidade) formDataObj.append('cidade', parsed.cidade);
      if (parsed.estado) formDataObj.append('estado', parsed.estado);
      if (parsed.rua) formDataObj.append('rua', parsed.rua);
      if (parsed.numero) formDataObj.append('numero', parsed.numero);
      if (fotoPerfil) formDataObj.append('foto', fotoPerfil);

      localStorage.removeItem('auth');

      await firstValueFrom(this.http.register(formDataObj));

      this.router.navigate(['/login']);
    } catch (err) {
      if (err instanceof ZodError) {
        this.errors = getZodErrorMessages(err.format());
        return;
      }

      if (err instanceof HttpErrorResponse) {
        console.log('ERRO HTTP:', err.error);
        this.errors = ['Erro ao registrar usuário'];
      }
    }
  }
}
