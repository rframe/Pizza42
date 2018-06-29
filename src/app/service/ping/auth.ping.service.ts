import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/internal/operators';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {AuthenticationService} from '../authentication/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {environment} from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthPingService {
  undefined;
  googleConnections$ = new BehaviorSubject<number>(null);

  /**
   * Class Constructor Function
   * @param {HttpClient} _http - Angualr http service
   * @param {AuthenticationService} _authentication - Auth0 Authentication service
   */
  constructor(private _http: HttpClient,
              private _toastr: ToastrService) { }

  /**
   * Update Google Connections
   * TODO: Move this method out of this file
   * This is in this file becuase when it was in the ping service it causes a circular dependency
   */
  updateGoogleConnections(bearerToken) {
    return this.get<number>('/api/connections', bearerToken, { responseType: 'text' })
      .pipe(
        map(x => {
          let connections = null;
          if (typeof x !== 'undefined' && x !== null) {
            connections = +x;
          }
          this.googleConnections$.next(connections);
          return connections;
        })
      );
  }

  /**
   * Base get method, this should be moved to a base http method for the application
   * @param {string} url
   * @param {HttpOptions} options
   * @returns {Observable<t>}
   */
  private get<t>(url: string, bearerToken: string, options = null) {
    let path = environment.api_location;
    if (url.indexOf('/') !== 0) {
      path += '/';
    }
    path += url;
    const defaultOptions = this.defaultOptions(bearerToken, options);
    return this._http.get<t>(`${path}`, defaultOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            this._toastr.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            this._toastr.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
          }

          return Observable.create(y => { y.next(this.undefined); });
        })
      );
  }

  /**
   * Default Options for the request to the server
   * @param {{headers: HttpHeaders}} options
   * @returns {{headers: HttpHeaders}}
   */
  private defaultOptions(bearerToken: string, options)  {

    options = options || {  };
    if (!options.headers) {
      options.headers = new HttpHeaders();
    }

    options.headers = options.headers.set('authorization',
      bearerToken
    );
    return options;
  }
}
