import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {ProfileRoutingModule} from './profile-routing/profile-routing.module';
import {ProfileResolver} from '../../resolver/profile-resolver';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
  ],
  declarations: [ProfileComponent],
  providers: [ProfileResolver]
})
export class ProfileModule { }
