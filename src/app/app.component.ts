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
  audience: any[];
  bwScheme =     {
    name: 'bwScheme',
    selectable: true,
    group: 'Ordinal',
    domain: [
      '#B2125C', '#4FBCF2'
    ]
  };
  audienceScheme =     {
    name: 'audienceScheme',
    selectable: true,
    group: 'Ordinal',
    domain: [ '#E65F00', '#E65F00']
  };

  constructor(private auth: AuthService,
    private data: DataService,
    private bits: BitsPipe) {
      this.dataset = [];
      this.audience = [];
    }

    ngOnInit() {
      this.initData();
    }

    initData() {
      this.dataset = [];

      this.auth.getUserToken().subscribe(session => {
        this.getBandwidth(session.session_token);
        this.getAudience(session.session_token);
        this.data.getIsps(session.session_token).subscribe(x => console.log(x));
        this.data.getCountries(session.session_token).subscribe(x => console.log(x));
        this.data.getPlatforms(session.session_token).subscribe(x => console.log(x));
        this.data.getStreams(session.session_token).subscribe(x => console.log(x));
      });
    }

    format(value) {
      const pipe = new BitsPipe();
      return pipe.transform(value, 2, 'speed');
    }

    switchUser(user: number) {
      this.auth.setUser(user).subscribe(_ => this.initData());
    }

    private getBandwidth(token: string) {
      this.data.getBandwidth(token, new Date(0), new Date())
      .subscribe(bw => {
        this.dataset = [
          {name: 'HTTP', series: bw.cdn.map((x) => ({ name: new Date(x[0]), value: x[1] }) )},
          {name: 'P2P', series: bw.p2p.map((x) => ({ name: new Date(x[0]), value: x[1] }) )}
        ];
      });
    }

    private getAudience(token: string) {
      this.data.getAudience(token, new Date(0), new Date())
      .subscribe(audience => {
        this.audience = [{
          name: 'Audience',
          series: audience.audience.map(x => ({ name: new Date(x[0]), value: x[1] }))
        }];
      });
    }

    private getInfo(token: string) {
      this.data.getInfo(token).subscribe();
    }
  }
