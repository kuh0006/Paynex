import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { CrudService } from '../shared/services/crud.service';
import { Merchant, ApiResponse } from '../models/merchant.model';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  private endpoint = 'merchant';
  private logPrefix = '[MerchantService]';

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
        catchError(this.handleError<boolean>(`createMerchant (${merchant})`))
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

  searchMerchantsByName(name: string): Observable<Merchant[]> {
    const route = `${this.endpoint}/name/${encodeURIComponent(name)}`;

    return this.crudService.getAllWrapped<Merchant>(route).pipe(
      map((response: ApiResponse<Merchant[]>) => {
        if (response && response.success) {
          return response.data || [];
        }
        return [];
      }),
      catchError((error: any) => {
        console.error(
          `${this.logPrefix} Error searching merchants by name "${name}":`,
          error
        );
        return of([]);
      })
    );
  }

  //#region Private Helper Methods
  private extractDataFromResponse = <T>(response: ApiResponse<T>): T => {
    if (response && response.success) return response.data;

    throw new Error(response?.message || 'API request failed');
  };

  private handleError = <T>(operation: string, fallbackValue?: T) => {
    return (error: any): Observable<T> => {
      console.error(`${this.logPrefix} ${operation} failed:`, error);

      if (fallbackValue !== undefined) return of(fallbackValue);

      throw error;
    };
  };
  //#endregion
}
