import { Injectable, signal } from '@angular/core';
import api from '../../../libs/axios-config';
import { User } from '../types/user.type';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = signal<User | null>(null);

  setUser(user: User) {
    this.user.set(user);
  }

  async loadUser() {
    const token = localStorage.getItem('auth');
    if (!token) return null;

    try {
      const res = await api.get('/usuarios/perfil');
      this.user.set(res.data);
      return this.user;
    } catch {
      this.logout();
      return null;
    }
  }

  isLogged() {
    return this.user() !== null;
  }

  logout() {
    localStorage.removeItem('auth');
    this.user.set(null);
  }
}
