import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  startWith,
  map,
  finalize,
} from 'rxjs/operators';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';

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

  // Observable approach
  private merchants$ = new BehaviorSubject<Merchant[]>([]);
  private filteredMerchants$: Observable<Merchant[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private merchantService: MerchantService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    // Reactive filtering
    this.filteredMerchants$ = combineLatest([
      this.merchants$.asObservable(),
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.categoryFilter.valueChanges.pipe(
        startWith(''),
        distinctUntilChanged()
      ),
    ]).pipe(
      map(([merchants, searchTerm, category]) => {
        return this.filterMerchantsLocally(
          merchants,
          searchTerm || '',
          category || ''
        );
      })
    );
  }

  ngOnInit(): void {
    this.loadMerchants();
    this.setupObservableSubscription();
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

    this.merchantService
      .getAllMerchants()
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (merchants) => {
          this.merchants$.next(merchants); //
        },
        error: (error) => {
          console.error('Error loading merchants:', error);
          this.error = 'Failed to load merchants. Please try again.';
        },
      });
  }

  private setupObservableSubscription(): void {
    this.filteredMerchants$
      .pipe(takeUntil(this.destroy$))
      .subscribe((filteredMerchants) => {
        this.dataSource.data = filteredMerchants;
      });
  }

  private filterMerchantsLocally(
    merchants: Merchant[],
    searchTerm: string,
    category: string
  ): Merchant[] {
    return merchants.filter((merchant) => {
      const matchesSearch =
        !searchTerm ||
        merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !category || merchant.category === category;

      return matchesSearch && matchesCategory;
    });
  }

  private updateLocalMerchant(updatedMerchant: Merchant): void {
    const currentMerchants = this.merchants$.value;
   
    const index = currentMerchants.findIndex(
      (m) => m.id === updatedMerchant.id
    );

    if (index >= 0) {
      currentMerchants[index] = updatedMerchant;
      this.merchants$.next([...currentMerchants]);
    }

  }
  private addLocalMerchant(newMerchant: Merchant): void {
    const currentMerchants = this.merchants$.value;
    this.merchants$.next([...currentMerchants, newMerchant]);
  }

  private removeLocalMerchant(merchantId: number): void {
    const currentMerchants = this.merchants$.value;
    const filteredMerchants = currentMerchants.filter(
      (m) => m.id !== merchantId
    );
    this.merchants$.next(filteredMerchants);
  }

  confirmDelete(merchant: Merchant): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      maxWidth: '90vw',
      disableClose: true,
      panelClass: 'confirm-dialog-panel',
      data: {
        title: 'Delete Merchant',
        message: `Are you sure you want to permanently delete "${merchant.name}"? This action cannot be undone.`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteMerchant(merchant.id!);
      }
    });
  }

  private deleteMerchant(id: number): void {
    this.isLoading = true;
    this.merchantService
      .deleteMerchant(id)
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.removeLocalMerchant(id);
          this.snackBar.open('Merchant deleted successfully', 'Close', {
            duration: 3000,
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
          .pipe(
            finalize(() => (this.isLoading = false)),
            takeUntil(this.destroy$)
          )
          .subscribe({
            next: (createdMerchant) => {
              this.addLocalMerchant(createdMerchant);
              this.snackBar.open('Merchant created successfully', 'Close', {
                duration: 3000,
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
          .pipe(
            finalize(() => (this.isLoading = false)),
            takeUntil(this.destroy$)
          )          .subscribe({
            next: (updatedMerchant) => {
              this.updateLocalMerchant(updatedMerchant);
              this.snackBar.open('Merchant updated successfully', 'Close', {
                duration: 3000,
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
