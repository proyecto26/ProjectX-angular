import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutContainerComponent } from '../../containers/layout/layout-container.component';

@Component({
  selector: 'webapp-account',
  standalone: true,
  imports: [RouterModule, CommonModule, LayoutContainerComponent],
  templateUrl: './account.page.html',
  styleUrl: './account.page.css',
  providers: [],
})
export class AccountPage {
  links = [
    { path: 'wallet', label: 'Wallet' },
    { path: 'send', label: 'Send Tokens' },
  ];
}
