import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(
    private _http: HttpClient,
    private _utilityService: UtilityService
  ) {}

  postRequest<T>(url: string, data: T): Observable<HttpResponse<T>> {
    const route = this._utilityService.createCompleteRoute(url);

    return this._http.post<T>(route, data, { observe: 'response' }).pipe(
      map((response) => response as HttpResponse<T>),
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  /**
   * Retrieves all items from the specified route.
   *
   * @template T - The type of the items to retrieve.
   * @param {string} route - The route to retrieve the items from.
   * @returns {Observable<HttpResponse<T[]>>} - An observable that emits an HTTP response containing an array of items.
   */
  getAll<T>(route: string): Observable<HttpResponse<T[]>> {
    const url = this._utilityService.createCompleteRoute(route);
    return this._http.get<T[]>(url, { observe: 'response' });
  }

  /**
   * Retrieves an item by its ID from the specified route.
   *
   * @template T - The type of the item to be retrieved. T must implement the Identifiable interface.
   * @param {string} route - The route to fetch the item from.
   * @param {string | number} id - The ID of the item to retrieve.
   * @returns {Observable<HttpResponse<T>>} - An Observable that emits the HTTP response containing the retrieved item.
   * @throws {any} - Throws an error if there was an issue fetching the item.
   */
  getItemById<T>(
    route: string,
    id: string | number
  ): Observable<HttpResponse<T>> {
    const url = this._utilityService.createCompleteRoute(`${route}/${id}`);

    return this._http.get<T>(url, { observe: 'response' }).pipe(
      map((response) => response),
      catchError((error) => {
        console.error(`Error fetching item with ID ${id}:`, error);
        throw error;
      })
    );
  }

  /**
   * Creates a record by sending a POST request to the specified route with the provided data.
   *
   * @param route - The route to send the POST request to.
   * @param data - The data to be sent in the request body.
   * @returns An Observable that emits an HttpResponse containing the response data.
   * @throws If an error occurs during the request.
   */
  createRecord<T>(route: string, data: T): Observable<HttpResponse<T>> {
    const url = this._utilityService.createCompleteRoute(route);

    return this._http.post<T>(url, data, { observe: 'response' }).pipe(
      map((response) => response as HttpResponse<T>),
      catchError((error) => {
        console.error('Error creating record:', error);
        throw error;
      })
    );
  }

  /**
   * Edits an item by sending a PUT request to the specified route with the provided data.
   *
   * @param route - The route to send the PUT request to.
   * @param data - The data to be sent in the request body.
   * @returns An Observable that emits an HttpResponse containing the edited item.
   * @throws If an error occurs during the request.
   */
  edit<T>(
    route: string,
    data: T
  ): Observable<HttpResponse<T>> {
    const url = this._utilityService.createCompleteRoute(route);

    return this._http.put<T>(url, data, { observe: 'response' }).pipe(
      map((response) => response as HttpResponse<T>),
      catchError((error) => {
        console.error('Error editing item:', error);
        throw error;
      })
    );
  }

  /**
   * Deletes an item from the specified route using the provided ID.
   *
   * @param route - The route to delete the item from.
   * @param id - The ID of the item to delete.
   * @returns A promise that resolves to a boolean indicating whether the deletion was successful.
   */
  deleteItem(route: string, id: string | number): Observable<void> {
    const url = this._utilityService.createCompleteRoute(`${route}/${id}`);
    return this._http.delete<void>(url, { observe: 'response' }).pipe(
      map((response) => {
        if (!response.ok) {
          throw new Error('Deletion was not successful');
        }
      })
    );
  }
}
