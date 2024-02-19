import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutContainerComponent } from '../../containers/layout/layout-container.component';
import { WalletStore } from '../../store';

@Component({
  selector: 'webapp-account',
  standalone: true,
  imports: [CommonModule, LayoutContainerComponent],
  templateUrl: './account.page.html',
  styleUrl: './account.page.css',
  providers: [WalletStore],
})
export class AccountPage {
  
  readonly walletStore = inject(WalletStore);
  readonly account$ = this.walletStore.account()
}
