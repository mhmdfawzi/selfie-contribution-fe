import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BurjKhalifaShapeComponent } from '../burj-khalifa-shape/burj-khalifa-shape.component';
import { ImageService } from '../image.service';
import { DubaiPoliceComponent } from '../dubai-police/dubai-police.component';
import { WebSocketService } from '../shared/services/socket.service';
// import { AlphaMaskComponent } from '../alpha-mask/alpha-mask.component';

@Component({
  selector: 'app-collage',
  templateUrl: './collage.component.html',
  styleUrls: ['./collage.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    BurjKhalifaShapeComponent,
    DubaiPoliceComponent,
    // AlphaMaskComponent,
  ],
})
export class CollageComponent implements OnInit {
  // selfieURLs: string[] = [];

  @ViewChild('burjComp', { static: false }) Burj!: BurjKhalifaShapeComponent;
  
  tilesCount: number = 0;
  collageShape: string = 'assets/burj-khalifa-800h.png';
  messages: { type: string; data: any }[] = [];

  constructor(
    private socketService: WebSocketService
  ) {}
  ngOnInit(): void {
    // this.selfieURLs = Array(500).fill('assets/selfie.jpg');
    this.socketService.connect();

    // Listen for WebSocket messages
    this.socketService.listen().subscribe((message) => {
      console.log("Very first message:", message)
      if (message.type === 'contribute') {
        console.log('New contribution:', message.data);
        this.messages.push({ type: 'contribute', data: message.data });
        this.Burj.onImageUrlReceived(message.data)
      } else if (message.type === 'sendPhotoToEvent') {
        console.log('Photo from server:', message.data);
        this.messages.push({ type: 'sendPhotoToEvent', data: message.data });
      }
    });

    this.tilesCount = 3000;
  }

  // sendPhoto(link: string): void {
  //   if (link.trim()) {
  //     this.socketService.sendPhotoToEvent(1, link);
  //     console.log(`Photo sent: ${link}`);
  //   }
  // }
}

