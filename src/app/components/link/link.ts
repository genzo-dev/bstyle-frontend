import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link',
  standalone: true,
  templateUrl: './link.html',
  imports: [RouterLink, NgClass],
})
export class Link {
  @Input() to: string = '';
  @Input() class: string = '';
}
