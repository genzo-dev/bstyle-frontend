import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Link } from './components/link/link';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Link],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('bstyle-frontend');
}
