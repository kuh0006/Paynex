import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../../models/merchant.model';

@Injectable({
  providedIn: 'root',
})
export class CrudService { 
   private readonly logPrefix = '[CrudService]';

  constructor(
    private _http: HttpClient,
    private _utilityService: UtilityService
  ) {}

  getAll<T>(route: string): Observable<HttpResponse<T[]>> {
    return this.makeUnwrappedRequest<T[]>('GET', route);
  }

  getById<T>(route: string, id: string | number): Observable<HttpResponse<T>> {
    return this.makeUnwrappedRequest<T>('GET', `${route}/${id}`);
  }

  create<TRequest, TResponse>(
    route: string,
    data: TRequest
  ): Observable<HttpResponse<TResponse>> {
    return this.makeUnwrappedRequest<TResponse>('POST', route, data);
  }

  update<TRequest, TResponse>(
    route: string,
    data: TRequest
  ): Observable<HttpResponse<TResponse>> {
    return this.makeUnwrappedRequest<TResponse>('PUT', route, data);
  }

  delete(route: string, id: string | number): Observable<HttpResponse<void>> {
    return this.makeUnwrappedRequest<void>('DELETE', `${route}/${id}`);
  }

  getAllWrapped<T>(route: string): Observable<ApiResponse<T[]>> {
    return this.makeWrappedRequest<T[]>('GET', route);
  }

  getByIdWrapped<T>(
    route: string,
    id: string | number
  ): Observable<ApiResponse<T>> {
    return this.makeWrappedRequest<T>('GET', `${route}/${id}`);
  }

  createWrapped<TRequest, TResponse>(
    route: string,
    data: TRequest
  ): Observable<ApiResponse<TResponse>> {
    return this.makeWrappedRequest<TResponse>('POST', route, data);
  }

  updateWrapped<TRequest, TResponse>(
    route: string,
    data: TRequest
  ): Observable<ApiResponse<TResponse>> {
    return this.makeWrappedRequest<TResponse>('PUT', route, data);
  }

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
  ): (error: HttpErrorResponse) => Observable<never> {
    return (error: HttpErrorResponse) => {
      const message = context
        ? `${this.logPrefix} ${operation} ${context} failed:`
        : `${this.logPrefix} ${operation} failed:`;
      
      // Log the error
      // console.error(message, error);
      
      // Extract a user-friendly error message if available
      let errorMessage = 'An unknown error occurred';
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Error Code: ${error.status}, Message: ${error.message}`;
      }
      
      return throwError(() => new Error(errorMessage));
    };
  }

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
