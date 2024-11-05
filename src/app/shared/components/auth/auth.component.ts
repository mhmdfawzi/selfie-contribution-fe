import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  code: string[] = ['', '', '', '', ''];
  boxes = Array(5);

  constructor(private router: Router){}

  get isButtonDisabled() {
    return this.code.some(value => value === '');
  }

  onInputChange(index: number, event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    const nextIndex = index + 1;
    const previousIndex = index - 1;

    if (event.key >= '0' && event.key <= '9' && inputElement.value.length === 1 && nextIndex < this.code.length) {
      document.getElementById('input-' + nextIndex)?.focus();
    }

    if (event.key === 'Backspace' && inputElement.value === '' && previousIndex >= 0) {
      document.getElementById('input-' + previousIndex)?.focus();
    }
  }

  navigateToCollage() {
    this.router.navigateByUrl('/collage')
  }

}
