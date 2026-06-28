import { Component } from '@angular/core';
import { userSchema } from '../../schemas/user/user.schema';
import { getZodErrorMessages } from '../../utils/get-zod-error-messages';
import { ZodError } from 'zod';
import { CommonModule } from '@angular/common';
import { RegisterForm } from '../../components/register-form/register-form';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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
      const parsed = userSchema.parse(data);

      localStorage.removeItem('auth');

      await firstValueFrom(this.http.register(parsed));

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
