import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpinLoader } from '../spin-loader/spin-loader';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.html',
  imports: [NgClass, SpinLoader],
})
export class Button {
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Output() clicked = new EventEmitter<Event>();

  getClasses() {
    const base =
      'cursor-pointer transition px-4 py-2 rounded flex items-center justify-center gap-2';

    switch (this.variant) {
      case 'secondary':
        return `${base} bg-white text-black hover:brightness-75 disabled:opacity-50 disabled:cursor-not-allowed`;
      case 'danger':
        return `${base} bg-red-500 text-black hover:brightness-75 disabled:opacity-50 disabled:cursor-not-allowed`;
      case 'ghost':
        return `${base} bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed`;
      default:
        return `${base} bg-black text-white hover:brightness-75 disabled:opacity-50 disabled:cursor-not-allowed`;
    }
  }
}
