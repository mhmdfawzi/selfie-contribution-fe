// src/app/components/auth/auth.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  code: string[] = ['', '', '', '', ''];
  boxes = Array<string>(5);

  showError: boolean = false;

  constructor(
    private router: Router,
    private dataService: DataService,
    private spinner: NgxSpinnerService
  ) {}

  get isButtonDisabled() {
    return this.code.some((value) => value === '');
  }

  onInputChange(index: number, event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    const nextIndex = index + 1;
    const previousIndex = index - 1;

    if (
      event.key >= '0' &&
      event.key <= '9' &&
      inputElement.value.length === 1 &&
      nextIndex < this.code.length
    ) {
      document.getElementById('input-' + nextIndex)?.focus();
    }

    if (
      event.key === 'Backspace' &&
      inputElement.value === '' &&
      previousIndex >= 0
    ) {
      document.getElementById('input-' + previousIndex)?.focus();
    }
  }

  validateCodeDigits() {
    // Show the spinner before making the request
    this.spinner.show();
    
    this.dataService.getCodeDigits().subscribe((res) => {
      // Hide the spinner once the response is received
      this.spinner.hide();
      
      console.log('El valu', this.code);
      this.showError = false;

      if (res) {
        // this.navigateToCollage();
        this.navigateToNicknameSetter();
      } else {
        this.showError = true;
      }
    });
  }

  // navigateToCollage() {
  //   this.router.navigateByUrl('/collage');
  // }
  navigateToNicknameSetter(){
    this.router.navigateByUrl('/nick-name');
  }
}
