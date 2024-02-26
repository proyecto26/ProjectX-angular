import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletStore } from '../../../store';
import { TransferFormComponent } from '../../forms/transfer/transfer.component';

@Component({
  selector: 'webapp-account-send',
  standalone: true,
  imports: [CommonModule, TransferFormComponent],
  templateUrl: './send.component.html',
  providers: [WalletStore],
})
export class SendComponent implements OnInit {
  readonly walletStore = inject(WalletStore);

  ngOnInit() {
    console.log('SendComponent initialized')
  }
}