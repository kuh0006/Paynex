import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';

import { Merchant, MERCHANT_CATEGORIES } from '../models/merchant.model';
import { MerchantService } from '../services/merchant.service';
import { MaterialModule } from '../shared/material-module';
import { MerchantDialogComponent } from './merchant-dialog/merchant-dialog.component';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class MerchantsComponent implements OnInit, AfterViewInit {
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private merchantService: MerchantService, private dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.loadMerchants();

    this.setupCombinedFilter();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  
  loadMerchants(): void {
    this.isLoading = true;
    this.error = null;

    this.merchantService.getAllMerchants()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (merchants) => {
          this.dataSource.data = merchants;
          console.log('Loaded merchants:', merchants.length);
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
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.applyFilters();
      });
      
    // Set up category filter
    this.categoryFilter.valueChanges
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
      .subscribe({
        next: (merchants) => {
          this.dataSource.data = merchants;
          console.log('Combined filter results:', merchants.length);
        },
        error: (error) => {
          console.error('Error filtering merchants:', error);
          this.error = 'Failed to filter merchants. Please try again.';
        },
      });
  }

  /**
   * Deletes a merchant
   */
  deleteMerchant(id: number): void {
    if (confirm('Are you sure you want to delete this merchant?')) {
      this.isLoading = true;
      this.merchantService
        .deleteMerchant(id)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: () => {
            this.loadMerchants();
            console.log('Merchant deleted successfully');
            // We could add a snackbar notification here
          },
          error: (error) => {
            console.error('Error deleting merchant:', error);
            this.error = 'Failed to delete merchant. Please try again.';
          },
        });
    }
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
          .subscribe({
            next: () => {
              this.loadMerchants();
              console.log('Merchant created successfully');
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
          .subscribe({
            next: () => {
              this.loadMerchants();
              console.log('Merchant updated successfully');
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
