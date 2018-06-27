import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {filter, map, take} from 'rxjs/operators';

@Injectable()
export class ProfileResolver implements Resolve<any> {

  constructor(private _authenticationService: AuthenticationService, private _router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this._authenticationService.getUserProfile()
      .pipe(
        filter((profile) => typeof profile !== 'undefined'),
        map((profile) => {
          if (!profile) {
            // redirect to home page
            this._router.navigate(['/', 'Home']);
          }
          return profile;
        }),
        take(1)
      );
  }

}
