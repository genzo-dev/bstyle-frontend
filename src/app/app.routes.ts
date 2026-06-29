import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { User } from './pages/user/user';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'user/:slug',
    component: User,
    canActivate: [authGuard],
  },
];
