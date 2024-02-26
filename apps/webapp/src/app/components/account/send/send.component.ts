import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createTransferInstructions } from '@heavy-duty/spl-utils';
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
  imports: [CommonModule, TransferFormComponent, SweetAlert2Module, MatProgressSpinnerModule],
  templateUrl: './send.component.html',
  providers: [WalletStore],
})
export class SendComponent implements OnInit {
  readonly walletStore = inject(WalletStore);
  readonly isSendTransactionLoading = this.walletStore.isLoading;
  readonly publicKey$ = this.walletStore.wallet().publicKey$;
  readonly connected$ = this.walletStore.wallet().connected$;
  message = '';
  @ViewChild('msgSwal')
  public readonly msgSwal!: SwalComponent;

  ngOnInit() {
    console.log('SendComponent initialized');
  }

  async onSubmitForm(payload: TransferForm, publicKey: PublicKey) {
    console.log('onSubmitForm', payload);
    const instructions = createTransferInstructions({
      amount: payload.amount,
      memo: payload.memo,
      mintAddress: environment.mintUSDC,
      senderAddress: publicKey.toBase58(),
      receiverAddress: payload.receiver,
      fundReceiver: true,
    });

    return this.walletStore.sendTransaction(instructions);
  }
}
