import { Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SwalComponent, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PublicKey } from '@solana/web3.js';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { WalletStore } from '../../../store';
import {
  TransferForm,
  TransferFormComponent,
} from '../../forms/transfer/transfer.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'webapp-account-send',
  standalone: true,
  imports: [
    CommonModule,
    TransferFormComponent,
    SweetAlert2Module,
    MatProgressSpinnerModule,
  ],
  templateUrl: './send.component.html',
  providers: [WalletStore],
})
export class SendComponent implements OnInit {
  readonly walletStore = inject(WalletStore);
  readonly isSendTransactionLoading = this.walletStore.isLoading;
  readonly publicKey$ = this.walletStore.wallet().publicKey$;
  readonly connected$ = this.walletStore.wallet().connected$;
  errorMessage = '';
  @ViewChild('errorSwal')
  public readonly errorSwal!: SwalComponent;
  @ViewChild('confirmationSwal')
  public readonly confirmationSwal!: SwalComponent;

  constructor(private router: Router) {
    effect(() => {
      if (this.walletStore.error && this.walletStore.error()) {
        console.log('error', this.walletStore.error());
        this.errorMessage =
          this.walletStore.error() || 'An error occurred while sending transaction';
        this.errorSwal.fire();
      }
    });
    effect(() => {
      if (this.walletStore.signature && this.walletStore.signature()) {
        console.warn('signature', this.walletStore.signature())
        this.confirmationSwal.fire();
      }
    });
  }

  ngOnInit() {
    this.walletStore.clearSignature();
  }

  async onSubmitForm(payload: TransferForm, publicKey: PublicKey) {
    console.log('onSubmitForm', payload);
    this.walletStore.sendTransaction({
      amount: payload.amount,
      memo: payload.memo,
      tokenAddress: environment.mintUSDC,
      senderAddress: publicKey.toBase58(),
      receiverAddress: payload.receiver,
    });
  }

  onGoToTransactionHistory() {
    this.router.navigate(['/account']);
  }
}
