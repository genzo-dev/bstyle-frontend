import { Component, Input, HostListener, ElementRef } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './multi-select.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class MultiSelectComponent {
  @Input() label = '';
  @Input() controlName = '';
  @Input() options: { id: number; nome: string }[] = [];

  isOpen = false;

  constructor(
    public controlContainer: ControlContainer,
    private elementRef: ElementRef,
  ) {}

  get control() {
    return this.controlContainer.control?.get(this.controlName);
  }

  get selectedIds(): number[] {
    return this.control?.value ?? [];
  }

  get selectedLabels(): string {
    const selected = this.options.filter((o) => this.selectedIds.includes(o.id));
    if (selected.length === 0) return '';
    return selected.map((s) => s.nome).join(', ');
  }

  toggle(id: number) {
    const current = [...this.selectedIds];
    const idx = current.indexOf(id);
    if (idx === -1) {
      current.push(id);
    } else {
      current.splice(idx, 1);
    }
    this.control?.setValue(current);
    this.control?.markAsDirty();
  }

  isSelected(id: number): boolean {
    return this.selectedIds.includes(id);
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
