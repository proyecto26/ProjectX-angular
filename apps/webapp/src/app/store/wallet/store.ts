import { computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { WalletStore as WalletAdapterStore } from '@heavy-duty/wallet-adapter';
import { combineLatest, of, pipe, switchMap, tap } from 'rxjs';

import { ShyftApiService } from './service';
import { Transactions } from './models';

type WalletState = {
  wallet: WalletAdapterStore;
  transactions: Transactions;
  isLoading?: boolean;
  error?: string;
};

export const WalletStore = signalStore(
  withState(
    () =>
      <WalletState>{
        wallet: inject(WalletAdapterStore),
        transactions: [],
        error: '',
      }
  ),
  withHooks({
    onInit(store) {
      const wallet = store.wallet();
      wallet.connected$.pipe(takeUntilDestroyed()).subscribe((connected) => {
        connected && localStorage.setItem('autoConnect', 'true');
      });
      wallet.disconnecting$
        .pipe(takeUntilDestroyed())
        .subscribe((disconnected) => {
          disconnected && localStorage.removeItem('autoConnect');
        });
    },
  }),
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
  })),
  withMethods((store, walletService = inject(ShyftApiService)) => ({
    loadTransactions: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((limit) =>
          combineLatest([store.wallet().publicKey$, of(limit)])
        ),
        switchMap(([publicKey, limit]) => {
          if (!publicKey) return [];
          return walletService.getTransactions(publicKey, limit).pipe(
            tapResponse({
              next: (transactions) => patchState(store, { transactions }),
              error: (error: Error) => {
                console.error('error', error);
                patchState(store, { error: error.message });
              },
              complete: () =>
                patchState(store, { isLoading: false, error: '' }),
            })
          );
        })
      )
    ),
  }))
);
