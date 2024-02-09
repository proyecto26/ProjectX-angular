import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as ionicons from '@ng-icons/ionicons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

export type NavigationLink = {
  label: string;
  href: string;
  icon: string;
};

@Component({
  selector: 'projectx-footer',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  providers: [provideIcons(ionicons)],
})
export class FooterComponent {
  @Input() navigation?: NavigationLink[] = [];

  currentYear = new Date().getFullYear();
}
