import { Component } from '@angular/core';
import { AuthService} from './auth.service';
import { DataService} from './data.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService, private data: DataService) {}
  title = 'app';

  getInfo() {
    this.data.getInfo().subscribe(r => r = r);
  }
}
