import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Subject } from 'rxjs/Subject';

import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { BitsPipe } from './pipes/bits.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dataset: any[];
  _self: AppComponent;

  constructor(private auth: AuthService,
    private data: DataService,
    private bits: BitsPipe) {
      this.dataset = [];
      this._self = this;
    }

    ngOnInit() {
      this.initData();
    }

    initData() {
      this.dataset = [];

      this.data.getBandwidth(new Date(0), new Date())
      .subscribe(bw => {
        this.dataset = [
          {name: 'HTTP', series: bw.cdn.map((x) => ({ name: new Date(x[0]), value: x[1] }) )},
          {name: 'P2P', series: bw.p2p.map((x) => ({ name: new Date(x[0]), value: x[1] }) )}
        ];
      });
    }

    format(value) {
      const pipe = new BitsPipe();
      return pipe.transform(value, 2, 'speed');
    }

    switchUser(user: number) {
      this.auth.setUser(user).subscribe(_ => this.initData());
    }

    getInfo() {
      this.data.getInfo().subscribe(r => r = r);
    }
  }
