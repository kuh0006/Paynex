import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';

/**
 * Utility service for common functions.
 */
@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(private _env: EnvironmentUrlService) {}

  /**
   * Creates a complete route by combining the base URL address and the provided route.
   * Throws an error if the URL address or route is not defined or empty.
   *
   * @param route - The route to be appended to the base URL.
   * @returns The complete route formed by combining the base URL and the provided route.
   * @throws Error if the URL address or route is not defined or empty.
   */
  createCompleteRoute(route: string): string {
    // If the URL address is not defined or empty, throw an error
    if (!this._env.urlAddress || this._env.urlAddress.trim() === '') {
      throw new Error('URL address is not defined or empty.');
    }

    // If the route is not defined or empty, throw an error
    if (!route || route.trim() === '') {
      throw new Error('Route is not defined or empty.');
    }

    // If the URL address ends with a '/', remove it
    const baseUrl = this._env.urlAddress.endsWith('/')
      ? this._env.urlAddress.slice(0, -1)
      : this._env.urlAddress;

    // If the route starts with a '/', remove it
    const formattedRoute = route.startsWith('/') ? route.slice(1) : route;

    return `${baseUrl}/api/${formattedRoute}`;
  }
}
