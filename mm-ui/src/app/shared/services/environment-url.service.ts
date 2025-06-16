import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentUrlService {
  /*
   * This is the base url of the API
   */
  public urlAddress: string = 'https://localhost:7085/';
}
