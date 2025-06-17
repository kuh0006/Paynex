import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/material-module';
import { Merchant, MERCHANT_CATEGORIES } from '../../models/merchant.model';

@Component({
  selector: 'app-merchant-dialog',
  templateUrl: './merchant-dialog.component.html',
  styleUrls: ['./merchant-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class MerchantDialogComponent implements OnInit {
  merchantForm!: FormGroup;
  isEditMode = false;
  categories = MERCHANT_CATEGORIES;
  dialogTitle = 'Add Merchant';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MerchantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { merchant?: Merchant }
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data?.merchant;

    if (this.isEditMode) {
      this.dialogTitle = 'Edit Merchant';
    }

    this.initializeForm();
  }

  initializeForm(): void {
    this.merchantForm = this.fb.group({
      id: [this.data?.merchant?.id || null],
      name: [
        this.data?.merchant?.name || '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      email: [
        this.data?.merchant?.email || '',
        [Validators.required, Validators.email],
      ],
      category: [this.data?.merchant?.category || '', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.merchantForm.valid) {
      const merchant: Merchant = this.merchantForm.value;
      this.dialogRef.close(merchant);
    } else {
      this.markFormGroupTouched(this.merchantForm);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // Helper to mark all controls in a form group as touched
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if ((control as FormGroup).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
