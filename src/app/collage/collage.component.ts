import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BurjKhalifaShapeComponent } from '../burj-khalifa-shape/burj-khalifa-shape.component';
import { ImageService } from '../image.service';
import { DubaiPoliceComponent } from '../dubai-police/dubai-police.component';
import { WebSocketService } from '../shared/services/socket.service';
import { environment } from '../../environment/environment';
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

  private api: string = environment.apiUrl;

  constructor(
    private socketService: WebSocketService
  ) {}
  ngOnInit(): void {
    // this.selfieURLs = Array(500).fill('assets/selfie.jpg');
    this.socketService.connect();
    // this.socketService.getExistingImages().subscribe((res) => {
    //   console.log("Got pics of :", res)
    //   for(let img of res){
    //   console.log("pic url :", this.api + img.url)
    //   // this.Burj.onImageUrlReceived(this.api + img.url)
    //   this.Burj.onImageUrlReceived("https://images.unsplash.com/photo-1695927621677-ec96e048dce2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VsZmllJTIwbWFufGVufDB8fDB8fHww")
    //   }
    // })

    this.socketService.getExistingImages().subscribe((res) => {
      const imagePromises = res.map((img) => this.preloadImage("https://images.unsplash.com/photo-1695927621677-ec96e048dce2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VsZmllJTIwbWFufGVufDB8fDB8fHww"));
      Promise.all(imagePromises).then((loadedUrls) => {
        console.log('All images loaded:', loadedUrls);
        for (const url of loadedUrls) {
          this.Burj.onImageUrlReceived(url);
        }
      });
    });


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

  private preloadImage(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(url);
      img.onerror = (err) => reject(err);
    });
  }
  
  // sendPhoto(link: string): void {
  //   if (link.trim()) {
  //     this.socketService.sendPhotoToEvent(1, link);
  //     console.log(`Photo sent: ${link}`);
  //   }
  // }
}

