import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Link } from './components/link/link';
import { AuthService } from './services/auth.service';
import { Button } from './components/button/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Link, Button],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(public auth: AuthService) {}

  protected readonly title = signal('bstyle-frontend');

  ngOnInit() {
    this.auth.loadUser();
  }
}
