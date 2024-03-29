import { InjectionToken, computed, inject } from '@angular/core';
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
import {
  ConnectionStore,
  WalletStore as WalletAdapterStore,
  injectTransactionSender,
} from '@heavy-duty/wallet-adapter';
import { createTransferInstructions } from '@heavy-duty/spl-utils';
import { combineLatest, of, pipe, switchMap, tap } from 'rxjs';

import { ShyftApiService } from './service';
import { Transactions } from './models';

type WalletState = {
  wallet: WalletAdapterStore;
  connection: ConnectionStore;
  transactions: Transactions;
  isLoading?: boolean;
  error?: string;
  signature?: string;
};

const WALLET_STATE = new InjectionToken<WalletState>('WalletState', {
  factory: () => ({
    wallet: inject(WalletAdapterStore),
    connection: inject(ConnectionStore),
    transactions: [],
    error: '',
    signature: '',
  }),
});

export const WalletStore = signalStore(
  withState(() => inject(WALLET_STATE)),
  withHooks({
    onInit(store) {
      const wallet = store.wallet();
      // Connect the wallet to the RPC endpoint
      const walletService = inject(ShyftApiService);
      store.connection().setEndpoint(walletService.getRpcUrl());
      // Auto connect the wallet if it was connected before
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
            publicKey
              ? walletService.getAccount(publicKey.toBase58())
              : of(null)
          )
        );
    }),
  })),
  withMethods(
    (
      store,
      walletService = inject(ShyftApiService),
      transactionSender = injectTransactionSender()
    ) => ({
      clearSignature(): void {
        patchState(store, { signature: undefined });
      },
      loadTransactions: rxMethod<number>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((limit) =>
            combineLatest([store.wallet().publicKey$, of(limit)])
          ),
          switchMap(([publicKey, limit]) => {
            if (!publicKey) return of([]);
            return walletService.getTransactions(publicKey, limit)
          }),
          tapResponse({
            next: (transactions) => patchState(store, { transactions }),
            error: (error: Error) => {
              console.error('error', error);
              patchState(store, { error: error.message });
            },
            complete: () =>
              patchState(store, { isLoading: false, error: undefined }),
          })
        )
      ),
      sendTransaction: rxMethod<{
        amount: number;
        memo: string;
        tokenAddress: string;
        senderAddress: string;
        receiverAddress: string;
      }>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((payload) =>
            combineLatest([
              walletService.getTokenInfo(payload.tokenAddress),
              of(payload),
            ])
          ),
          switchMap(([tokenInfo, payload]) => {
            return transactionSender.send(
              createTransferInstructions({
                amount: payload.amount * 10 ** tokenInfo.decimals,
                memo: payload.memo,
                mintAddress: payload.tokenAddress,
                senderAddress: payload.senderAddress,
                receiverAddress: payload.receiverAddress,
                fundReceiver: true,
              })
            );
          }),
          tapResponse({
            next: (signature) => {
              return patchState(store, { signature });
            },
            error: (error: Error) => {
              console.error('error', error);
              patchState(store, { error: error.message });
            },
            complete: () => {
              console.log('completed');
              patchState(store, { isLoading: false, error: undefined });
            },
          })
        )
      ),
    })
  )
);
