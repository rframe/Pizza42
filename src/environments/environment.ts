// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // auth0 related environment variables
  auth0_clientID: '',
  auth0_domain: '',
  auth0_audience: '',
  auth0_redirectUri: 'http://localhost:4200/callback',
  api_location: 'http://localhost:57744',
  // api_location: 'http://localhost:5000',
  // api_location: 'https://pizza42api.azurewebsites.net',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
