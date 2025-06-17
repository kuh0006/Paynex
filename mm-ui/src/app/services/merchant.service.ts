import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { CrudService } from '../shared/services/crud.service';
import { Merchant, ApiResponse } from '../models/merchant.model';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  private readonly endpoint = 'merchant';
  private readonly logPrefix = '[MerchantService]';

  constructor(private crudService: CrudService) {}

  getAllMerchants(): Observable<Merchant[]> {
    return this.crudService
      .getAllWrapped<Merchant>(`${this.endpoint}/all`)
      .pipe(
        map((response) => this.extractDataFromResponse<Merchant[]>(response)),
        catchError(this.handleError<Merchant[]>('getAllMerchants', []))
      );
  }

  getMerchantById(id: number): Observable<Merchant> {
    return this.crudService.getByIdWrapped<Merchant>(this.endpoint, id).pipe(
      map((response) => this.extractDataFromResponse<Merchant>(response)),
      catchError(this.handleError<Merchant>(`getMerchantById(${id})`))
    );
  }

  createMerchant(merchant: Merchant): Observable<boolean> {
    return this.crudService
      .createWrapped<Merchant, boolean>(this.endpoint, merchant)
      .pipe(
        map((response: ApiResponse<boolean>) =>
          this.extractDataFromResponse<boolean>(response)
        ),
        catchError(this.handleError<boolean>(`createMerchant: ${merchant.name}`))
      );
  }

  updateMerchant(id: number, merchant: Merchant): Observable<boolean> {
    const route = `${this.endpoint}/${id}`;
    return this.crudService
      .updateWrapped<Merchant, boolean>(route, merchant)
      .pipe(
        map((response: ApiResponse<boolean>) =>
          this.extractDataFromResponse<boolean>(response)
        ),
        catchError(this.handleError<boolean>(`updateMerchant(${id})`))
      );
  }

  deleteMerchant(id: number): Observable<boolean> {
    return this.crudService.deleteWrapped(this.endpoint, id).pipe(
      map((response: ApiResponse<boolean>) =>
        this.extractDataFromResponse<boolean>(response)
      ),
      catchError(this.handleError<boolean>(`deleteMerchant(${id})`, false))
    );
  }

  filterByAsync(name?: string, category?: string): Observable<Merchant[]> {
    const filterDto = {
      name: name || '',
      category: category || '',
    };

    return this.crudService
      .createWrapped<{name: string, category: string}, Merchant[]>(`${this.endpoint}/filter`, filterDto)
      .pipe(
        map((response: ApiResponse<Merchant[]>) => {
          if (response && response.success) 
            return response.data || [];
          
          return [];
        }),
        catchError((error: unknown) => {
          // console.error(
          //   `${this.logPrefix} Error filtering merchants:`,
          //   error
          // );
          return of([]);
        })
      );
  }

  //#region Private Helper Methods
  private extractDataFromResponse<T>(response: ApiResponse<T>): T {
    if (response && response.success) 
      return response.data;
    
    throw new Error(response?.message || 'API request failed');
  }

  private handleError<T>(operation: string, fallbackValue?: T) {
    return (error: unknown): Observable<T> => {
      // console.error(`${this.logPrefix} ${operation} failed:`, error);
      
      // Generate a user-friendly error message
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      // Log detailed error for debugging
      // console.error(`${errorMessage} (${operation})`);
      
      // Return fallback value if provided, otherwise re-throw
      if (fallbackValue !== undefined) {
        return of(fallbackValue);
      }

      throw error;
    };
  }
  //#endregion
}
