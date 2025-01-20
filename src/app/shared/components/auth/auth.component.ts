// src/app/components/auth/auth.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { DataService } from '../../services/data.service';
import { WebSocketService } from 'src/app/shared/services/socket.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  code: string[] = ['', '', '', ''];
  boxes = Array<string>(4);

  showError: boolean = false;
  @Input() userPhoneNumber!: string;
  receivedOTP!: string;

  constructor(
    private router: Router,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private socketService: WebSocketService
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

  navigateToNicknameSetter() {
    this.router.navigateByUrl('/nick-name');
  }

  // validateCodeDigits() {
  //   this.spinner.show();

  //   this.dataService.getCodeDigits().subscribe((res) => {
  //     this.spinner.hide();
  //     this.showError = false;
  //     if (res) {
  //       this.navigateToNicknameSetter();
  //     } else {
  //       this.showError = true;
  //     }
  //   });
  // }

  // navigateToCollage() {
  //   this.verifyOTP();
  // }

  verifyOTP() {
    this.socketService
      .verifyOtp({
        mobileNumber: this.userPhoneNumber,
        otp: this.receivedOTP.toString(),
      })
      .subscribe({
        next: (res) => {
          console.log('Success otp');
          this.dataService.setToken(res.token);
          if (this.dataService.getName()) {
            this.router.navigateByUrl('/photo_upload');
          } else {
            this.router.navigateByUrl('/nick-name');
          }
        },
        error: () => {
          console.log('wrong otp');
        },
      });
  }

  getOTP() {
    this.socketService.tempGetOTP(this.userPhoneNumber).subscribe((res) => {
      console.log('El res of OTP', res);
      this.receivedOTP = res;
    });
  }
}
