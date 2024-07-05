import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { io, Socket } from 'socket.io-client';

export interface queryParam {
    userId: string
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: Socket;

  constructor() { }

  connect(query: queryParam){
    this.socket = io('http://localhost:3000', { query }); // URL of your NestJS server
  }
  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
