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
  platforms: any[];
  audience: any[];
  bwScheme =     {
    name: 'bwScheme',
    selectable: true,
    group: 'Ordinal',
    domain: [
      '#B2125C', '#4FBCF2', '#E65F00', '#511883', '#458741'
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
      this.platforms = [];
    }

    ngOnInit() {
      this.initData();
    }

    initData() {
      this.dataset = [];
      this.platforms = [];

      this.auth.getUserToken().subscribe(session => {
        this.getBandwidth(session.session_token);
        this.getAudience(session.session_token);
        this.getPlatforms(session.session_token);
        this.data.getIsps(session.session_token).subscribe(x => console.log(x));
        this.data.getCountries(session.session_token).subscribe(x => console.log(x));
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

    private getPlatforms(token: string) {
      this.data.getPlatforms(token).subscribe(x => {
        this.platforms = [
          {name: x[0].platform, series: this.formatPlatformData(x[0])},
          {name: x[1].platform, series: this.formatPlatformData(x[1])},
          {name: x[2].platform, series: this.formatPlatformData(x[2])},
          {name: x[3].platform, series: this.formatPlatformData(x[3])},
          {name: x[4].platform, series: this.formatPlatformData(x[4])},
        ];
        console.log(this.platforms);
      });
    }

    private formatPlatformData(data) {
      return [
        {name: 'max_viewers', value: data.max_viewers },
        {name: 'p2p', value: data.p2p },
        {name: 'cdn', value: data.cdn },
        {name: 'upload', value: data.upload },
      ]
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
