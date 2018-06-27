import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {AuthenticatedUser} from '../models/interfaces/authenticated-user';
import {map, take} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class VerifiedEmailGuard implements CanActivate, CanActivateChild {

  constructor(private _authenticationService: AuthenticationService, private _router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this._authenticationService
      .updateAuthenticatedUser$();

    return this._authenticationService
      .authenticatedUser$
      .pipe(
        map((x: AuthenticatedUser) => {
          const verified = x && x.emailAddressVerified;
          if (!verified) {
            // notify the user to verify their email address
            this._router.navigate(['/', 'Home']);
          } else {
            return true;
          }
        }),
        take(1)
      );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
