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
  finalize,
  switchMap,
  map,
} from 'rxjs/operators';
import {
  Subject,
  Observable,
  combineLatest,
  BehaviorSubject,
  merge,
} from 'rxjs';

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

  private merchants$ = new BehaviorSubject<Merchant[]>([]);
  private filteredMerchants$: Observable<Merchant[]>;
  private destroy$ = new Subject<void>();
  private manualRefresh$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private merchantService: MerchantService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    const formFilters$ = combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged()
      ),
      this.categoryFilter.valueChanges.pipe(
        startWith(''),
        distinctUntilChanged()
      ),
    ]);

    const manualFilters$ = this.manualRefresh$.pipe(
      map(
        () =>
          [this.searchControl.value || '', this.categoryFilter.value || ''] as [
            string,
            string
          ]
      )
    );

    this.filteredMerchants$ = merge(formFilters$, manualFilters$).pipe(
      switchMap(([searchTerm, category]) => {
        const search = (searchTerm || '').trim();
        const cat = (category || '').trim();

        if (!search && !cat) return this.merchants$.asObservable();

        this.isLoading = true;
        this.error = null;
        return this.merchantService
          .filterByAsync(search, cat)
          .pipe(finalize(() => (this.isLoading = false)));
      })
    );
  }
  ngOnInit(): void {
    this.loadMerchants();
    this.setupFilteringSubscription();
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
          this.merchants$.next(merchants);
        },
        error: (error) => {
          console.error('Error loading merchants:', error);
          this.error = 'Failed to load merchants. Please try again.';
        },
      });
  }

  private setupFilteringSubscription(): void {
    this.filteredMerchants$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (merchants) => {
        this.dataSource.data = merchants;
      },
      error: (error) => {
        console.error('Error loading merchants:', error);
        this.error = 'Failed to load merchants. Please try again.';
        this.isLoading = false;
      },
    });
  }

  private updateLocalMerchant(updatedMerchant: Merchant): void {
    const currentMerchants = this.merchants$.value;
    const index = currentMerchants.findIndex(
      (m: Merchant) => m.id === updatedMerchant.id
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
      (m: Merchant) => m.id !== merchantId
    );
    this.merchants$.next(filteredMerchants);
  }

  private refreshFilters(): void {
    const currentSearch = (this.searchControl.value || '').trim();
    const currentCategory = (this.categoryFilter.value || '').trim();

    if (!currentSearch && !currentCategory) 
      return;

    this.manualRefresh$.next();
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
          this.refreshFilters(); 
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
              this.refreshFilters();
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
          )
          .subscribe({
            next: (updatedMerchant) => {
              this.updateLocalMerchant(updatedMerchant);
              this.refreshFilters();
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
