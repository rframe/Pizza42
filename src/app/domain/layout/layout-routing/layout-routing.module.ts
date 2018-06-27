import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from '../layout.component';
import {NotFoundComponent} from '../../../feature/not-found/not-found.component';
import {AuthenticatedUserGuard} from '../../../guard/authenticated-user.guard';
import {VerifiedEmailGuard} from '../../../guard/verified-email.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'Home'
      },
      {
        path: 'Home',
        loadChildren: '../../../feature/home/home.module#HomeModule'
      },
      {
        path: 'Profile',
        loadChildren: '../../../feature/profile/profile.module#ProfileModule',
        canActivate: [AuthenticatedUserGuard]
      },
      {
        path: 'Order',
        loadChildren: '../../../feature/order/order.module#OrderModule',
        canActivate: [AuthenticatedUserGuard, VerifiedEmailGuard]
      },
      {
        path: 'callback',
        loadChildren: '../../../feature/auth0-callback/auth0-callback.module#Auth0CallbackModule'
      },
      {path: '**', pathMatch: 'full', component: NotFoundComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
