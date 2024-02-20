import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { map, of, timeout } from 'rxjs';
import { PublicKey } from '@solana/web3.js';

import { environment } from '../../../environments/environment';
import {
  TokenBalanceResponse,
  Transaction,
  TransactionHistoryResponse,
  Transactions,
} from './models';

const isInvalidTransaction = (transaction: Transaction) => {
  return (
    transaction.type !== 'TOKEN_TRANSFER' || transaction.actions.length !== 2
  );
};

@Injectable({ providedIn: 'root' })
export class ShyftApiService {
  private readonly http = inject(HttpClient);

  getAccount(publicKey?: string) {
    if (!publicKey) {
      return of(null);
    }

    const url = new URL(
      '/sol/v1/wallet/token_balance',
      environment.shyftApiUrl
    );
    url.searchParams.append('network', environment.walletNetwork);
    url.searchParams.append('wallet', publicKey);
    url.searchParams.append('token', environment.mintUSDC);

    return this.http
      .get<TokenBalanceResponse>(url.toString(), {
        headers: {
          'x-api-key': environment.shyftApiKey,
        },
      })
      .pipe(
        timeout(5000),
        map((res) => res.result));
  }

  getTransactions(publicKey: PublicKey, limit = 100) {
    const account = getAssociatedTokenAddressSync(
      new PublicKey(environment.mintUSDC),
      publicKey
    );
    const url = new URL('/sol/v1/transaction/history', environment.shyftApiUrl);
    url.searchParams.append('network', environment.walletNetwork);
    url.searchParams.append('account', account.toBase58());
    url.searchParams.append('tx_num', limit.toString());

    const wallet = publicKey.toBase58();

    return this.http
      .get<TransactionHistoryResponse>(url.toString(), {
        headers: {
          'x-api-key': environment.shyftApiKey,
        },
      })
      .pipe(
        timeout(5000),
        map((res) =>
          res.result.map<Transactions[0]>((transaction) => ({
            ...(isInvalidTransaction(transaction)
              ? {
                  timestamp: new Date(transaction.timestamp),
                  type: 'unknown',
                }
              : {
                  timestamp: new Date(transaction.timestamp),
                  memo: transaction.actions[1].info.message,
                  amount: transaction.actions[1].info.amount,
                  sign: transaction.actions[0].info.sender === wallet ? -1 : 1,
                  type: 'transfer',
                }),
          }))
        )
      );
  }
}
