import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { TokenBalanceResponse } from './model';

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
      .pipe(map((res) => res.result));
  }
}
