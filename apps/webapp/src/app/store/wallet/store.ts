import { computed, inject } from '@angular/core';
import { signalStore, withComputed, withState } from '@ngrx/signals';
import { WalletStore as WalletAdapterStore } from '@heavy-duty/wallet-adapter';

import { ShyftApiService } from './service';
import { switchMap } from 'rxjs';

type WalletState = {
  isLoading: boolean;
  wallet: WalletAdapterStore;
  error?: string;
};

export const WalletStore = signalStore(
  withState(
    () =>
      <WalletState>{
        wallet: inject(WalletAdapterStore),
      }
  ),
  withComputed((store, walletService = inject(ShyftApiService)) => ({
    account: computed(() => {
      return store
        .wallet()
        .publicKey$.pipe(
          switchMap((publicKey) =>
            walletService.getAccount(publicKey?.toBase58())
          )
        );
    }),
  }))
);
