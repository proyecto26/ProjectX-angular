import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ThemeButtonComponent } from '../theme-button/theme-button.component';

@Component({
  selector: 'projectx-header',
  standalone: true,
  imports: [CommonModule, ThemeButtonComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() title?: string;
  @Input() links?: Array<{ label: string; href: string }> = [];
  @Output() setTheme = new EventEmitter<string>();

  onSetTheme(theme: string) {
    this.setTheme.emit(theme);
  }
}
