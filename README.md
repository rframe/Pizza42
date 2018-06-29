# Pizza42

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Project Requirements
- [Yarn](https://yarnpkg.com/lang/en/)
- [Angular CLI](https://cli.angular.io/)

## Configure App
 - update the environemtn files `(src\environments\environment.ts, src\environments\environment.prod.ts)`
 - Files should have the following values set
 - auth0_clientID
 - auth0_domain
 - auth0_audience
 - auth0_redirectUri, angular application url that the user will be redirected to after login `already set`
 - api_location, this is the location of the companion api `already set`

## Run Project Locally
 - open command prompt to root directory
 - Run `yarn` to install package dependencies
 - Run 'ng serve'
 - Open web browser to `https://localhost:4200`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
