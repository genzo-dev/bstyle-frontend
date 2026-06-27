import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

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

  constructor(public controlContainer: ControlContainer) {}

  get control() {
    return this.controlContainer.control?.get(this.controlName);
  }
}
