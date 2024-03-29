import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { heroArrowUp, heroArrowDown } from '@ng-icons/heroicons/outline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

import { WalletStore } from '../../../store';

@Component({
  selector: 'webapp-account-wallet',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatProgressSpinnerModule, NgIconComponent],
  templateUrl: './wallet.component.html',
  providers: [WalletStore, provideIcons({ heroArrowUp, heroArrowDown })],
})
export class WalletComponent implements OnInit {
  readonly walletStore = inject(WalletStore);
  readonly account$ = this.walletStore.account();
  readonly connected$ = this.walletStore.wallet().connected$;
  readonly transactions = this.walletStore.transactions;
  readonly isTransactionsLoading = this.walletStore.isLoading;
  readonly error = this.walletStore.error;

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.walletStore.loadTransactions(10);
  }
}
