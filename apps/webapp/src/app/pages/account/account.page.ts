import { Component, inject, OnInit } from '@angular/core';
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
export class AccountPage implements OnInit {
  readonly walletStore = inject(WalletStore);
  readonly account$ = this.walletStore.account();
  readonly transactions = this.walletStore.transactions;
  readonly error = this.walletStore.error;

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.walletStore.loadTransactions(10);
  }
}
