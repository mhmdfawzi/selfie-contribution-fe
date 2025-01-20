import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  activeIcon: number = 0;
  selectedTab = 'tab1';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  setActiveIcon(index: number) {
    this.activeIcon = index; 
  }
}
