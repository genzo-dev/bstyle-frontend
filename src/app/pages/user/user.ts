import { Component } from '@angular/core';
import { UserUpdateForm } from '../../components/user-update-form/user-update-form';
import { AuthService } from '../../services/auth.service';
import { userUpdateSchema } from '../../schemas/user/user.schema';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../services/user.service';
import { getZodErrorMessages } from '../../utils/get-zod-error-messages';
import { ZodError } from 'zod';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Garanta a importação para diretivas e classes estruturais se necessário
import { RouterLink } from '@angular/router';

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

  alternarEdicao(): void {
    this.editando = !this.editando;
    this.errors = [];
  }

  async handleSubmit(data: any) {
    this.errors = [];

    try {
      const parsed = userUpdateSchema.parse(data);

      await firstValueFrom(this.user.updateUser(parsed));
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