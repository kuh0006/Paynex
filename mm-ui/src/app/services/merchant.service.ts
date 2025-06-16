import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CrudService } from '../shared/services/crud.service';
import { Merchant } from '../models/merchant.model';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  private endpoint = 'merchants';

  constructor(private crudService: CrudService) { }
  /**
   * Gets all merchants.
   * @returns Observable of merchant array
   */
  getAllMerchants(): Observable<Merchant[]> {
    return this.crudService.getAll<Merchant>(this.endpoint).pipe(
      map((response: HttpResponse<Merchant[]>) => {
        return response.body || [];
      })
    );
  }

  /**
   * Gets a merchant by ID.
   * @param id The merchant ID
   * @returns Observable of merchant
   */
  getMerchantById(id: number): Observable<Merchant> {
    return this.crudService.getItemById<Merchant>(this.endpoint, id).pipe(
      map((response: HttpResponse<Merchant>) => {
        return response.body as Merchant;
      })
    );
  }

  /**
   * Creates a new merchant.
   * @param merchant The merchant data
   * @returns Observable of the created merchant
   */
  createMerchant(merchant: Merchant): Observable<Merchant> {
    return this.crudService.createRecord<Merchant>(this.endpoint, merchant).pipe(
      map((response: HttpResponse<Merchant>) => {
        return response.body as Merchant;
      })
    );
  }

  /**
   * Updates an existing merchant.
   * @param id The merchant ID
   * @param merchant The updated merchant data
   * @returns Observable of the updated merchant
   */
  updateMerchant(id: number, merchant: Merchant): Observable<Merchant> {
    const route = `${this.endpoint}/${id}`;
    return this.crudService.edit<Merchant>(route, merchant).pipe(
      map((response: HttpResponse<Merchant>) => {
        return response.body as Merchant;
      })
    );
  }

  /**
   * Deletes a merchant by ID.
   * @param id The merchant ID
   * @returns Observable of void
   */
  deleteMerchant(id: number): Observable<void> {
    return this.crudService.deleteItem(this.endpoint, id);
  }
  /**
   * Searches merchants by name.
   * @param name The name to search for
   * @returns Observable of merchant array
   */
  searchMerchantsByName(name: string): Observable<Merchant[]> {
    const route = `${this.endpoint}/search?name=${encodeURIComponent(name)}`;
    return this.crudService.getAll<Merchant>(route).pipe(
      map((response: HttpResponse<Merchant[]>) => {
        return response.body || [];
      })
    );
  }
  /**
   * Filters merchants by category.
   * @param category The category to filter by
   * @returns Observable of merchant array
   */
  filterMerchantsByCategory(category: string): Observable<Merchant[]> {
    const route = `${this.endpoint}/filter?category=${encodeURIComponent(category)}`;
    return this.crudService.getAll<Merchant>(route).pipe(
      map((response: HttpResponse<Merchant[]>) => {
        return response.body || [];
      })
    );
  }
}
