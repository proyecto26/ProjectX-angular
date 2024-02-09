import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutContainerComponent } from '../containers/layout/layout-container.component';

@Component({
  selector: 'webapp-home',
  standalone: true,
  imports: [CommonModule, LayoutContainerComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {}
