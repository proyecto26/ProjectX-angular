import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

export type TransferForm = {
  memo: string;
  amount: number;
  receiver: string;
};

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
    MatError,
  ],
  templateUrl: './transfer.component.html',
})
export class TransferFormComponent implements OnInit {
  @Input() isLoading = false;
  @Output() readonly submitForm = new EventEmitter<TransferForm>();

  readonly form = new FormGroup({
    memo: new FormControl('', Validators.required),
    amount: new FormControl<number | undefined>(undefined, Validators.required),
    receiver: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.form.setValue({
      memo: '',
      amount: null,
      receiver: '',
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.submitForm.emit({
      memo: this.form.value.memo || '',
      amount: this.form.value.amount || 0,
      receiver: this.form.value.receiver || '',
    });
  }
}
