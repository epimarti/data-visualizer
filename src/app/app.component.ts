import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService} from './services/auth.service';
import { DataService} from './services/data.service';
import { Subject } from 'rxjs/Subject';
import { NgxChartsModule } from '@swimlane/ngx-charts'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dataset: any[];

  constructor(private auth: AuthService, private data: DataService) {
    this.dataset = [];
  }

  ngOnInit() {
    this.data.getBandwidth(new Date(0), new Date())
    .subscribe(bw => {
      this.dataset= [
        {name: 'P2p', series: bw.p2p.map((x) => { return { name: new Date(x[0]), value: x[1]}; } )},
        {name: 'Cdn', series: bw.cdn.map((x) => { return { name: new Date(x[0]), value: x[1]}; } )}
    ];
    })
  }

  getInfo() {
    this.data.getInfo().subscribe(r => r = r);
  }
}
