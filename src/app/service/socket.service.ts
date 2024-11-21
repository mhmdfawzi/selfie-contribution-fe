import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<any> | null = null;

  private api: string = environment.apiUrl;

  constructor(private http: HttpClient){}

  // Initialize WebSocket connection
  connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(this.api);
    }
  }

  // Send a message to the server
  sendMessage(message: any): void {
    if (this.socket$) {
      console.log("socket true")
      this.socket$.next(message);
    }else{
      console.log("socket is false so will connect !")
      this.connect();
      this.sendMessage(message)
    }
  }

  // Listen for messages from the server
  onMessage(): Observable<any> {
    if (!this.socket$) {
      throw new Error('WebSocket connection is not established.');
    }
    return this.socket$.asObservable();
  }

  // Close the WebSocket connection
  close(): void {
    this.socket$?.complete();
  }

  sendOtp(mobileNumber: string): Observable<any> {
    const api = `${this.api}users/login`;
    // this.sendMessage({
    //   url: api,
    //   body: {
    //     mobileNumber: number,
    //   },
    // });

    // console.log("El REACH:")

    // return this.onMessage()

    return this.http.post<any>(api, {mobileNumber});
  }

  verifyOtp(verificationForm: {mobileNumber: string, otp: string}){

    const api = `${this.api}users/verify-otp`;
    return this.http.post<any>(api, verificationForm);
    
  }

  tempGetOTP(number: string){
    const api = `${this.api}users/otp/${number}`;
    return this.http.get<any>(api);
  }
}
