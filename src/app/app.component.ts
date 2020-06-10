import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-chat';
  showExtended = false;
  data = ['hello', 'hello2', 'hello3'];
  share = () => {
    if (this.showExtended == true) {
      this.showExtended = false;
    } else {
      this.showExtended = true;
    }
  };
}
