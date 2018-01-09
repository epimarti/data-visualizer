import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() switchedUser = new EventEmitter();

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  switchUser(user: number) {
    this.auth.setUser(user).subscribe(_ => this.switchedUser.emit());
  }
}
