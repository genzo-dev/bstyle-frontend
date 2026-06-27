import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-link',
  standalone: true,
  templateUrl: './link.html',
  imports: [Link],
})
export class Link {
  @Input() to: string = '';
  @Input() class: string = '';
}
