import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket!: Socket;
  private serverUrl: string =
    'https://selfie-contribution-bk-production.up.railway.app/realtime'; // WebSocket URL

  private api: string = environment.apiUrl;
  private messagesSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) {}

  connect(): void {
    const token = localStorage.getItem('burj_token');
    if (!token) {
      console.error('Token not found in local storage!');
      return;
    }
    // console.log("la token", localStorage.getItem("burj_token"))

    this.socket = io(this.serverUrl, {
      auth: {
        token: `Bearer ${token}`,
      },
    });

    // Listen for connection error events
    this.socket.on('connect_error', (error: any) => {
      console.error('Socket connection error:', error);

      if (error.message.includes('400')) {
        // Navigate to /login if the error is due to invalid token
        this.router.navigate(['/login']);
      }
    });

    this.socket.on('connect', () => {
      console.log('Connected to the WebSocket server');
      this.joinEvent(1); // Automatically join the channel
    });

    this.socket.on('contribute', (data) => {
      console.log('Contribution to event:', data);
      this.messagesSubject.next({ type: 'contribute', data });
    });

    this.socket.on('sendPhotoToEvent', (data) => {
      console.log('Photo from server:', data);
      this.messagesSubject.next({ type: 'sendPhotoToEvent', data });
    });
  }

  // Join a specific event
  joinEvent(channelId: number): void {
    this.socket.emit('joinEvent', channelId);
  }

  // Send a photo link to the server
  sendPhotoToEvent(channelId: number, link: string): void {
    this.socket.emit('sendPhotoToEvent', { channelId, link });
  }

  // Listen to messages from the server
  listen(): Observable<any> {
    return this.messagesSubject.asObservable();
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  sendMessage(message: any): void {
    this.socket.send(JSON.stringify(message));
  }

  // Emit socket events
  emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  // HTTP method to send OTP
  sendOtp(mobileNumber: string): Observable<any> {
    const api = `${this.api}/users/login`;
    // This sends an HTTP POST request to send OTP to the mobile number
    return this.http.post<any>(api, { mobileNumber });
  }

  // HTTP method to verify OTP
  verifyOtp(verificationForm: { mobileNumber: string; otp: string }) {
    const api = `${this.api}/users/verify-otp`;
    return this.http.post<any>(api, verificationForm); // POST the OTP for verification
  }

  // Temporary method to get OTP based on the number
  tempGetOTP(number: string) {
    const api = `${this.api}/users/otp/${number}`;
    return this.http.get<any>(api); // GET request to fetch OTP
  }

  // Upload an image to the server
  uploadImage(
    // file: File,
    // eventId: string = '1',
    // lat?: number,
    // long?: number
  ): any  { //Observable<any>
    
    // const formData = new FormData();
    // formData.append('file', file);

    // let api = `${this.api}/images/upload?eventId=${eventId}`;
    // if (lat !== undefined && long !== undefined) {
    //   api += `&lat=${lat}&long=${long}`;
    // }

    // return this.http.post(api, formData); // HTTP POST for image upload

    this.sendPhotoToEvent(1, 'ay url test')
  }

  getExistingImages(): Observable<{url: string, filename: string}[]>{

    const api = `${this.api}/images/event/1`
    return this.http.get<{url: string, filename: string}[]>(api)
  }
}
