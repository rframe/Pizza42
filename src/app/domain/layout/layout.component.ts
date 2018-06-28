import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Observable, Subscription} from 'rxjs/index';
import {PingService} from '../../service/ping/ping.service';
import {map, take} from 'rxjs/internal/operators';
import {AuthenticatedUser} from '../../models/interfaces/authenticated-user';
import {logValue} from '../../models/rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  isAuthenticated$: Observable<AuthenticatedUser>;
  private _subscriptions: Array<Subscription> = [];

  constructor(private _authenticationService: AuthenticationService, private _ping: PingService, private _toastr: ToastrService) {
  }

  /**
   * Angular Lifecycle hook onit
   */
  ngOnInit() {
    this.isAuthenticated$ = this._authenticationService.authenticatedUser$;
  }

  /**
   * Angular Lifecycle Hook On Destroy
   */
  ngOnDestroy() {
    this._subscriptions.forEach((sub) => sub && sub.unsubscribe && sub.unsubscribe());
  }

  /**
   * Log in button clicked, open login page
   */
  login() {
    this._authenticationService.login();
  }

  /**
   * logout button was clicked, log the user out
   */
  logout() {
    this._authenticationService.logout();
  }

  /**
   * Show the Successful server response as a toast message
   * @param serverRespons
   */
  serverResultToast(serverRespons) {
    if (!!serverRespons) {
      this._toastr.success(`Result: ${typeof serverRespons === 'string' ? serverRespons : JSON.stringify(serverRespons)}`);
    }
  }

  /**
   * Test a call to the server that is not secured with authorization
   */
  testInsecureCall() {

    this._ping.ping()
      .pipe(
        take(1),
        // logValue
      )
      .toPromise()
      .then((result) => this.serverResultToast(result));
  }

  /**
   * Test a call to the server that is secured with authorization
   */
  testSecureCall() {
    this._ping.pingSecure()
      .pipe(
        take(1),
        // logValue
      )
      .toPromise()
      .then((result) => this.serverResultToast(result));
  }

  /**
   * List Claims for the currently logged in user
   */
  listClaims() {
    this._ping.claims()
      .pipe(
        take(1),
        // logValue,
        map((result: Array<any>) => `You have ${result.length} claims`)
      )
      .toPromise()
      .then((result) => this.serverResultToast(result));
  }
}
