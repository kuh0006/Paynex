import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../material-module';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule],  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <h2 mat-dialog-title>{{ data.title }}</h2>
      </div>
      
      <mat-dialog-content>
        <p class="dialog-message">{{ data.message }}</p>
      </mat-dialog-content>
      
      <mat-dialog-actions align="end">
        <button mat-button class="cancel-button" (click)="onCancel()">
          {{ data.cancelText || 'Cancel' }}
        </button>
        <button mat-raised-button color="warn" class="confirm-button" (click)="onConfirm()">
          <mat-icon>delete</mat-icon>
          {{ data.confirmText || 'Confirm' }}
        </button>
      </mat-dialog-actions>
    </div>
  `,  styles: [`
    .dialog-container {
      padding: 8px;
    }
    
    .dialog-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    
    .warning-icon {
      color: #ff9800;
      font-size: 28px;
      width: 28px;
      height: 28px;
    }
    
    h2[mat-dialog-title] {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
      color: #333;
    }
    
    mat-dialog-content {
      margin: 0;
      padding: 0 40px 20px 40px;
      min-height: auto;
    }
    
    .dialog-message {
      margin: 0;
      font-size: 16px;
      line-height: 1.5;
      color: #555;
    }
    
    mat-dialog-actions {
      margin: 0;
      padding: 16px 0 8px 0;
      gap: 8px;
    }
    
    .cancel-button {
      color: #666;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 8px 16px;
      transition: all 0.2s ease;
    }
    
    .cancel-button:hover {
      background-color: #f5f5f5;
      border-color: #bbb;
    }
    
    .confirm-button {
      background-color: #f44336;
      color: white;
      border-radius: 4px;
      padding: 8px 16px;
      box-shadow: 0 2px 4px rgba(244, 67, 54, 0.3);
      transition: all 0.2s ease;
    }
    
    .confirm-button:hover {
      background-color: #d32f2f;
      box-shadow: 0 4px 8px rgba(244, 67, 54, 0.4);
    }
    
    .confirm-button mat-icon {
      margin-right: 8px;
      font-size: 18px;
      width: 18px;
      height: 18px;
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
