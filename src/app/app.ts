import { Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Link } from './components/link/link';
import { AuthService } from './services/auth.service';
import { Button } from './components/button/button';
import { createSlug } from './utils/create-slug';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Link, Button],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(public auth: AuthService) {}

  createSlug = createSlug;

  openProfileMenu = signal(false);

  toggleMenu() {
    this.openProfileMenu.set(!this.openProfileMenu());
  }

  closeMenu() {
    this.openProfileMenu.set(false);
  }

  @ViewChild('menuContainer') menuContainer!: ElementRef;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (
      this.openProfileMenu() &&
      this.menuContainer &&
      !this.menuContainer.nativeElement.contains(event.target)
    ) {
      this.closeMenu();
    }
  }

  protected readonly title = signal('bstyle-frontend');

  ngOnInit() {
    this.auth.loadUser();
  }
}
