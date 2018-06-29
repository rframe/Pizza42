import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthPingService} from '../../service/ping/auth.ping.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile;
  connections$;
  constructor(private _route: ActivatedRoute, private _ping: AuthPingService) { }

  ngOnInit() {
    this.profile = this._route.snapshot.data['profile'];
    this.connections$ = this._ping.googleConnections$;
  }

}
