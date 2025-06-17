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
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private merchantService: MerchantService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadMerchants();

    // Set up search with debounce
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        if (value) {
          this.searchMerchants(value);
        } else {
          this.loadMerchants();
        }
      });
      
    // Set up category filter
    this.categoryFilter.valueChanges
      .subscribe((value) => {
        if (value) {
          this.filterByCategory(value);
        } else {
          this.loadMerchants();
        }
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Loads all merchants from the API
   */
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

  /**
   * Searches merchants by name
   */
  searchMerchants(name: string): void {
    this.isLoading = true;
    this.error = null;

    this.merchantService
      .searchMerchantsByName(name)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (merchants) => {
          this.dataSource.data = merchants;
          console.log('Search results:', merchants.length);
        },
        error: (error) => {
          console.error('Error searching merchants:', error);
          this.error = 'Failed to search merchants. Please try again.';
        },
      });
  }
  
  /**
   * Filters merchants by category
   */
  filterByCategory(category: string): void {
    this.isLoading = true;
    this.error = null;
    
    this.merchantService
      .searchMerchantsByCategory(category)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (merchants) => {
          this.dataSource.data = merchants;
          console.log('Category filter results:', merchants.length);
        },
        error: (error) => {
          console.error('Error filtering merchants by category:', error);
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
  
  /**
   * Opens dialog to add a new merchant
   */
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
              // We could add a snackbar notification here
            },
            error: (error) => {
              console.error('Error creating merchant:', error);
              this.error = 'Failed to create merchant. Please try again.';
            },
          });
      }
    });
  }

  /**
   * Opens dialog to edit a merchant
   */
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
              // We could add a snackbar notification here
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
