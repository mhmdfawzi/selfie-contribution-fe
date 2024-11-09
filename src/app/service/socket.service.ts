import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private serverUrl: string = 'http://localhost:4200'; // Replace with your server URL

  constructor() {
    this.socket = io(this.serverUrl);
  }

  // Method to listen for events
  listen(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
    });
  }

  // Method to emit events to the server
  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  // Disconnect the socket
  disconnect() {
    this.socket.disconnect();
  }
}
