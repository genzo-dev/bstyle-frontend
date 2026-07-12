import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { User } from './pages/user/user';
import { HomeComponent } from './pages/home/home';
import { MyProducts } from './pages/my-products/my-products';
import { EditProduct } from './pages/edit-product/edit-product';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
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
  {
    path: 'meus-produtos',
    component: MyProducts,
    canActivate: [authGuard],
  },
  {
    path: 'produtos/editar/:id',
    component: EditProduct,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: ''
  }
];