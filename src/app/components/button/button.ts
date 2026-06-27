import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.html',
  imports: [NgClass],
})
export class Button {
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Output() clicked = new EventEmitter<Event>();

  getClasses() {
    switch (this.variant) {
      case 'secondary':
        return 'cursor-pointer bg-white text-white hover:brightness-75';
      case 'danger':
        return 'cursor-pointer bg-red-500 text-black hover:brightness-75';
      case 'ghost':
        return 'bg-gray-700 text-white disabled:opacity-50';
      default:
        return 'cursor-pointer bg-black text-white hover:brightness-75';
    }
  }
}
