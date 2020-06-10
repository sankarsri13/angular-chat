import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket;
  users = [];

  constructor() {}
  setupSocketConnection() {
    this.socket = io('http://localhost:8000');
    return this.socket;
  }
  emitService(title: string, name: string) {
    this.socket.emit(title, { name });
  }
}
