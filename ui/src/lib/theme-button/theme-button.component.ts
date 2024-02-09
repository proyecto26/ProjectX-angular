import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { heroMoon, heroSun } from '@ng-icons/heroicons/outline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'projectx-theme-button',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './theme-button.component.html',
  styleUrl: './theme-button.component.css',
  providers: [provideIcons({ heroMoon, heroSun })],
})
export class ThemeButtonComponent {
  @Input() theme: 'light' | 'dark' = 'light';
  @Output() setTheme = new EventEmitter<string>();

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.setTheme.emit(this.theme);
  }
}
