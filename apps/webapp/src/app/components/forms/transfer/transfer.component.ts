import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { WalletStore } from '../../../store';

@Component({
  selector: 'webapp-forms-transfer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatError
  ],
  templateUrl: './transfer.component.html',
  providers: [WalletStore],
})
export class TransferFormComponent implements OnInit {
  readonly walletStore = inject(WalletStore);
  readonly form = new FormGroup({
    memo: new FormControl('', Validators.required),
    amount: new FormControl<number | undefined>(undefined, Validators.required),
    receiver: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.form.setValue({
      memo: '',
      amount: 0,
      receiver: '',
    });
  }

  onSubmit() {
    alert('Transfer submitted');
  }
}
