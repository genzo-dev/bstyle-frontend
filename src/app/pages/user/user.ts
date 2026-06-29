import { Component } from '@angular/core';
import { UserUpdateForm } from '../../components/user-update-form/user-update-form';
import { AuthService } from '../../services/auth.service';
import { userUpdateSchema } from '../../schemas/user/user.schema';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../services/user.service';
import { getZodErrorMessages } from '../../utils/get-zod-error-messages';
import { ZodError } from 'zod';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  imports: [UserUpdateForm],
  templateUrl: './user.html',
})
export class User {
  constructor(
    public auth: AuthService,
    private user: UserService,
  ) {}

  errors: string[] = [];

  async handleSubmit(data: any) {
    this.errors = [];

    try {
      const parsed = userUpdateSchema.parse(data);

      await firstValueFrom(this.user.updateUser(parsed));

      await this.auth.loadUser();
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
