import { Injectable, NgZone, signal } from '@angular/core';
import api from '../../../libs/axios-config';
import { User } from '../types/user.type';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private ngZone: NgZone) {}

  private _user = signal<User | null>(null);
  user = this._user.asReadonly();

  setUser(user: User) {
    this.ngZone.run(() => {
      this._user.set(user);
    });
  }

  async loadUser() {
    const token = localStorage.getItem('auth');
    if (!token) return null;

    try {
      const res = await api.get('/usuarios/perfil');
      this.setUser(res.data);
      return res.data;
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
    this.ngZone.run(() => {
      this._user.set(null);
    });
  }
}
