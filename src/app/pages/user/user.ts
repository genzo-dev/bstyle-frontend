import { Component } from '@angular/core';
import { UserUpdateForm } from '../../components/user-update-form/user-update-form';
import { AuthService } from '../../services/auth.service';
import { userUpdateSchema } from '../../schemas/user/user.schema';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../services/user.service';
import { getZodErrorMessages } from '../../utils/get-zod-error-messages';
import { ZodError } from 'zod';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-user',
  imports: [UserUpdateForm, CommonModule, RouterLink],
  templateUrl: './user.html',
})
export class User {
  constructor(
    public auth: AuthService,
    private user: UserService,
  ) {}

  errors: string[] = [];
  editando: boolean = false;

  get urlFotoPerfil(): string {
    const nomeArquivo = this.auth.user()?.fotoPerfilUrl;
    return nomeArquivo ? `${environment.apiUrl}/uploads/${nomeArquivo}` : '';
  }

  alternarEdicao(): void {
    this.editando = !this.editando;
    this.errors = [];
  }

  async handleSubmit(data: any) {
    this.errors = [];

    try {
      const { fotoPerfil, ...formValues } = data;
      const parsed = userUpdateSchema.parse(formValues);

      const formData = new FormData();
      if (parsed.nome) formData.append('nome', parsed.nome);
      if (parsed.telefone) formData.append('telefone', parsed.telefone);
      if (parsed.cidade) formData.append('cidade', parsed.cidade);
      if (parsed.estado) formData.append('estado', parsed.estado);
      if (parsed.rua) formData.append('rua', parsed.rua);
      if (parsed.numero) formData.append('numero', parsed.numero);
      if (fotoPerfil) formData.append('foto', fotoPerfil);

      await firstValueFrom(this.user.updateUser(formData));
      await this.auth.loadUser();
      
      this.editando = false;
    } catch (err) {
      if (err instanceof ZodError) {
        this.errors = getZodErrorMessages(err.format());
        return;
      }

      if (err instanceof HttpErrorResponse) {
        console.log('ERRO HTTP:', err.error);
        this.errors = ['Erro ao atualizar usuário'];
      }
    }
  }
}