import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SocketioService } from '../socketio.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  test = [1, 2, 3, 45, 6];
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private socketService: SocketioService
  ) {}
  id: string;
  message: string;
  users_detail;
  socket;
  messages = [];
  temp = {};
  value: string;
  intros = [];
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('name');
    this.socket = this.socketService.setupSocketConnection();
    this.socket.on('all_users', (ids) => {
      this.users_detail = ids;
      console.log(this.users_detail);
    });
    this.socket.on('welcome', ({ name }) => {
      console.log(name);
      this.users_detail.ids.forEach((element, index) => {
        if (element.name == name) {
          this.users_detail.ids.splice(index, 1);
        }
      });
      this.intros.push(name);
    });
    this.socket.on('new_message', ({ message, username }) => {
      this.temp = { message: message, username: username };
      this.messages.push(this.temp);
      console.log(this.messages);
    });
    this.socketService.emitService('new_user', this.id);
  }
  sendMessage() {
    console.log(this.id);

    this.socket.emit('new_message', { message: this.value, username: this.id });
  }
}
