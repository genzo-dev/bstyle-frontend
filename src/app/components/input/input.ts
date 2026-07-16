import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { cleanPhone, formatPhone } from '../../utils/masks/phone-mask';

@Component({
  selector: 'app-input',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './input.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class InputComponent {
  @Input() label = '';
  @Input() type: 'text' | 'password' | 'email' = 'text';
  @Input() placeholder = '';
  @Input() controlName = '';
  @Input() customClass = '';
  @Input() mask: 'phone' | '' = '';

  onInput(event: Event): void {
    if (this.mask !== 'phone') return;
    const input = event.target as HTMLInputElement;
    const formatted = formatPhone(input.value);
    const cleaned = cleanPhone(input.value);
    if (input.value !== formatted) input.value = formatted;
    this.control?.setValue(cleaned, {
      emitModelToViewChange: false,
    });
  }

  constructor(public controlContainer: ControlContainer) {}

  get control() {
    return this.controlContainer.control?.get(this.controlName);
  }
}
