import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile;
  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {

    this.profile = this._route.snapshot.data['profile'];
  }

}
