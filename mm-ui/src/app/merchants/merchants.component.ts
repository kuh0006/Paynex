import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Merchant, MERCHANT_CATEGORIES } from '../models/merchant.model';
import { MaterialModule } from '../shared/material-module';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterLink],
})
export class MerchantsComponent implements OnInit {
  // Table configuration
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'category',
    'createdAt',
    'actions',
  ];

  // Sample merchant data
  merchants: Merchant[] = [
    {
      id: 1,
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      category: 'Retail',
      createdAt: new Date('2025-01-15'),
    },
    {
      id: 2,
      name: 'Fresh Eats Cafe',
      email: 'info@fresheats.com',
      category: 'Food',
      createdAt: new Date('2025-02-23'),
    },
    {
      id: 3,
      name: 'Tech Solutions Inc',
      email: 'support@techsolutions.com',
      category: 'Services',
      createdAt: new Date('2025-03-10'),
    },
    {
      id: 4,
      name: 'Bookworm Bookstore',
      email: 'orders@bookworm.com',
      category: 'Retail',
      createdAt: new Date('2025-04-05'),
    },
    {
      id: 5,
      name: 'Cloud Nine Spa',
      email: 'appointments@cloudninespa.com',
      category: 'Services',
      createdAt: new Date('2025-05-18'),
    },
  ];

  categories = MERCHANT_CATEGORIES;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}
  ngOnInit(): void {
    // Initialize component
    console.log(
      'Merchants component initialized with',
      this.merchants.length,
      'merchants'
    );
  }
}
