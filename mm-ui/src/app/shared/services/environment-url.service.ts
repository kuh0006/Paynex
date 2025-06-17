import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentUrlService {
  /**
   * The base URL of the API
   */
  public get urlAddress(): string {
    return environment.apiUrl;
  }
}
