import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeButtonComponent } from '../theme-button/theme-button.component';

@Component({
  selector: 'projectx-header',
  standalone: true,
  imports: [CommonModule, ThemeButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() title?: string;
}
