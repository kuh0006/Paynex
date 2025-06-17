import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Merchant, MERCHANT_CATEGORIES } from '../models/merchant.model';
import { MerchantService } from '../services/merchant.service';
import { MaterialModule } from '../shared/material-module';
import { MerchantDialogComponent } from './merchant-dialog/merchant-dialog.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class MerchantsComponent implements OnInit, AfterViewInit, OnDestroy {
  // Table configuration
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'category',
    'createdAt',
    'actions',
  ];

  dataSource = new MatTableDataSource<Merchant>([]);
  categories = MERCHANT_CATEGORIES;

  searchControl = new FormControl('');
  categoryFilter = new FormControl('');
  isLoading = false;
  error: string | null = null;
  
  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private merchantService: MerchantService, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    this.loadMerchants();
    this.setupCombinedFilter();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  loadMerchants(): void {
    this.isLoading = true;
    this.error = null;    
    
    this.merchantService.getAllMerchants()
      .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (merchants) => {
            this.dataSource.data = merchants;
          },
          error: (error) => {
            console.error('Error loading merchants:', error);
            this.error = 'Failed to load merchants. Please try again.';
          },
      });
  }

    setupCombinedFilter(): void {
    // Set up search with debounce
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400), 
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.applyFilters();
      });
      
    // Set up category filter
    this.categoryFilter.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.applyFilters();
      });
  }
  
  /**
   * Applies both name and category filters simultaneously
   */
  applyFilters(): void {
    const name = this.searchControl.value || '';
    const category = this.categoryFilter.value || '';
    
    // If both filters are empty, load all merchants
    if (!name && !category) {
      this.loadMerchants();
      return;
    }
    
    this.isLoading = true;
    this.error = null;
    
    this.merchantService
      .filterByAsync(name, category)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({        next: (merchants) => {
          this.dataSource.data = merchants;
          // Optional: this.snackBar.open(`Found ${merchants.length} merchants`, 'Close', { duration: 2000 });
        },
        error: (error) => {
          console.error('Error filtering merchants:', error);
          this.error = 'Failed to filter merchants. Please try again.';
        },
      });
  }
  
  confirmDelete(merchant: Merchant): void {    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      maxWidth: '90vw',
      disableClose: true,
      panelClass: 'confirm-dialog-panel',
      data: {
        title: 'Delete Merchant',
        message: `Are you sure you want to permanently delete "${merchant.name}"? This action cannot be undone.`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMerchant(merchant.id!);
      }
    });
  }
  
  private deleteMerchant(id: number): void {
    this.isLoading = true;
    this.merchantService
      .deleteMerchant(id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.loadMerchants();
          this.snackBar.open('Merchant deleted successfully', 'Close', {
            duration: 3000
          });
        },
        error: (error) => {
          console.error('Error deleting merchant:', error);
          this.error = 'Failed to delete merchant. Please try again.';
        },
      });
  }
  

  openAddMerchantDialog(): void {
    const dialogRef = this.dialog.open(MerchantDialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.merchantService
          .createMerchant(result)
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe({            next: () => {
              this.loadMerchants();
              this.snackBar.open('Merchant created successfully', 'Close', {
                duration: 3000
              });
            },
            error: (error) => {
              console.error('Error creating merchant:', error);
              this.error = 'Failed to create merchant. Please try again.';
            },
          });
      }
    });
  }

  openEditMerchantDialog(merchant: Merchant): void {
    const dialogRef = this.dialog.open(MerchantDialogComponent, {
      width: '400px',
      data: { merchant },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.merchantService
          .updateMerchant(merchant.id as number, result)
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe({            next: () => {
              this.loadMerchants();
              this.snackBar.open('Merchant updated successfully', 'Close', {
                duration: 3000
              });
            },
            error: (error) => {
              console.error('Error updating merchant:', error);
              this.error = 'Failed to update merchant. Please try again.';
            },
          });
      }
    });
  }
}
