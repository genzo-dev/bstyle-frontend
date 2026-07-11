import { Component } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';
import { CommonModule } from '@angular/common';
import { loginSchema } from '../../schemas/auth/auth.schema';
import { ZodError } from 'zod';
import { getZodErrorMessages } from '../../utils/get-zod-error-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [LoginForm, CommonModule],
  templateUrl: './login.html',
})
export class Login {
  constructor(
    private router: Router,
    public auth: AuthService,
    private http: UserService,
  ) {}

  errors: string[] = [];

  async handleSubmit(data: any) {
    this.errors = [];

    try {
      const parsed = loginSchema.parse(data);

      const token = btoa(`${parsed.login}:${parsed.senha}`);
      localStorage.setItem('auth', token);

      const getUsers = await firstValueFrom(this.http.getUsers());
      console.log('Usuários encontrados:', getUsers);

      await this.auth.loadUser();

      const ok = await this.router.navigate(['/']);

      console.log("navigate:", ok);
    } catch (err) {
      if (err instanceof ZodError) {
        this.errors = getZodErrorMessages(err.format());
      } else {
        this.errors = ['Login ou senha inválidos'];
      }
    }
  }
}
