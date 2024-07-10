import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private websocketService: WebsocketService) {
    this.websocketService.connect({userId: '1'})
  }

  ngOnInit(): void {
    this.websocketService.listen('message').subscribe((data) => {
      console.log('Message from server:', data);
    });

    // Example of emitting a message
    this.websocketService.emit('message', 'Hello from Angular');
  }
}
