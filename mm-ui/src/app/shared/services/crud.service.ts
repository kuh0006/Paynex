import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../../models/merchant.model';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private logPrefix = '[CrudService]';

  constructor(private _http: HttpClient, private _utilityService: UtilityService) {}

  // ===== UNWRAPPED METHODS (return direct data) =====

  /**
   * Get all items without ApiResponse wrapper
   */
  getAll<T>(route: string): Observable<HttpResponse<T[]>> {
    return this.makeUnwrappedRequest<T[]>('GET', route);
  }

  /**
   * Get item by ID without ApiResponse wrapper
   */
  getById<T>(route: string, id: string | number): Observable<HttpResponse<T>> {
    return this.makeUnwrappedRequest<T>('GET', `${route}/${id}`);
  }

  /**
   * Create record without ApiResponse wrapper
   */
  create<TRequest, TResponse>(route: string, data: TRequest): Observable<HttpResponse<TResponse>> {
    return this.makeUnwrappedRequest<TResponse>('POST', route, data);
  }

  /**
   * Update record without ApiResponse wrapper
   */
  update<TRequest, TResponse>(route: string, data: TRequest): Observable<HttpResponse<TResponse>> {
    return this.makeUnwrappedRequest<TResponse>('PUT', route, data);
  }

  /**
   * Delete item without ApiResponse wrapper
   */
  delete(route: string, id: string | number): Observable<HttpResponse<void>> {
    return this.makeUnwrappedRequest<void>('DELETE', `${route}/${id}`);
  }

  // ===== WRAPPED METHODS (return ApiResponse<T>) =====

  /**
   * Get all items with ApiResponse wrapper
   */
  getAllWrapped<T>(route: string): Observable<ApiResponse<T[]>> {
    return this.makeWrappedRequest<T[]>('GET', route);
  }

  /**
   * Get item by ID with ApiResponse wrapper
   */
  getByIdWrapped<T>(
    route: string,
    id: string | number
  ): Observable<ApiResponse<T>> {
    return this.makeWrappedRequest<T>('GET', `${route}/${id}`);
  }

  /**
   * Create record with ApiResponse wrapper
   */
  createWrapped<TRequest, TResponse>(route: string, data: TRequest): Observable<ApiResponse<TResponse>> {
    return this.makeWrappedRequest<TResponse>('POST', route, data);
  }

  /**
   * Update record with ApiResponse wrapper
   */
  updateWrapped<TRequest, TResponse>(route: string, data: TRequest): Observable<ApiResponse<TResponse>> {
    return this.makeWrappedRequest<TResponse>('PUT', route, data);
  }

  /**
   * Delete item with ApiResponse wrapper
   */
  deleteWrapped(
    route: string,
    id: string | number
  ): Observable<ApiResponse<boolean>> {
    return this.makeWrappedRequest<boolean>('DELETE', `${route}/${id}`);
  }

  // ===== PRIVATE HELPER METHODS =====
  private handleError(
    operation: string,
    context?: string
  ): (error: any) => Observable<never> {
    return (error: any) => {
      const message = context
        ? `${this.logPrefix} ${operation} ${context} failed:`
        : `${this.logPrefix} ${operation} failed:`;
      console.error(message, error);
      return throwError(() => error);
    };
  }

  /**
   * Makes HTTP request expecting direct data (no ApiResponse wrapper)
   */
  private makeUnwrappedRequest<TResponse>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: any
  ): Observable<HttpResponse<TResponse>> {
    const completeUrl = this._utilityService.createCompleteRoute(url);
    const options = { observe: 'response' as const };

    let request$: Observable<HttpResponse<TResponse>>;

    switch (method) {
      case 'GET':
        request$ = this._http.get<TResponse>(completeUrl, options);
        break;
      case 'POST':
        request$ = this._http.post<TResponse>(completeUrl, data, options);
        break;
      case 'PUT':
        request$ = this._http.put<TResponse>(completeUrl, data, options);
        break;
      case 'DELETE':
        request$ = this._http.delete<TResponse>(completeUrl, options);
        break;
    }

    return request$.pipe(
      catchError(this.handleError(method.toLowerCase(), url))
    );
  }

  /**
   * Makes HTTP request expecting ApiResponse<T> wrapper
   */
  private makeWrappedRequest<TResponse>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: any
  ): Observable<ApiResponse<TResponse>> {
    const completeUrl = this._utilityService.createCompleteRoute(url);

    let request$: Observable<ApiResponse<TResponse>>;

    switch (method) {
      case 'GET':
        request$ = this._http.get<ApiResponse<TResponse>>(completeUrl);
        break;
      case 'POST':
        request$ = this._http.post<ApiResponse<TResponse>>(completeUrl, data);
        break;
      case 'PUT':
        request$ = this._http.put<ApiResponse<TResponse>>(completeUrl, data);
        break;
      case 'DELETE':
        request$ = this._http.delete<ApiResponse<TResponse>>(completeUrl);
        break;
    }

    return request$.pipe(
      catchError(this.handleError(method.toLowerCase(), url))
    );
  }
}
