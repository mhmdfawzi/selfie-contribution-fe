import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/socket.service';

@Component({
  selector: 'app-nick-name',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nick-name.component.html',
  styleUrl: './nick-name.component.css',
})
export class NickNameComponent implements OnInit {
  form: FormGroup = new FormGroup({
    nickname: new FormControl('', Validators.required),
    nationality: new FormControl(['', Validators.required]),
  });
  nationalities: string[] = [
    'Afghan',
    'Albanian',
    'Algerian',
    'American',
    'Andorran',
    'Angolan',
    'Argentinian',
    'Armenian',
    'Australian',
    'Austrian',
    'Bangladeshi',
    'Belgian',
    'Bolivian',
    'Brazilian',
    'British',
    'Bulgarian',
    'Canadian',
    'Chilean',
    'Chinese',
    'Colombian',
    'Croatian',
    'Cuban',
    'Czech',
    'Danish',
    'Dominican',
    'Dutch',
    'Egyptian',
    'Estonian',
    'Ethiopian',
    'Finnish',
    'French',
    'German',
    'Greek',
    'Hungarian',
    'Icelandic',
    'Indian',
    'Indonesian',
    'Iranian',
    'Iraqi',
    'Irish',
    'Israeli',
    'Italian',
    'Japanese',
    'Jordanian',
    'Kenyan',
    'Kuwaiti',
    'Latvian',
    'Lebanese',
    'Libyan',
    'Lithuanian',
    'Malaysian',
    'Mexican',
    'Moroccan',
    'Nepalese',
    'New Zealander',
    'Nigerian',
    'Norwegian',
    'Pakistani',
    'Palestinian',
    'Peruvian',
    'Philippine',
    'Polish',
    'Portuguese',
    'Qatari',
    'Romanian',
    'Russian',
    'Saudi',
    'Singaporean',
    'Slovakian',
    'South African',
    'South Korean',
    'Spanish',
    'Sri Lankan',
    'Sudanese',
    'Swedish',
    'Swiss',
    'Syrian',
    'Thai',
    'Tunisian',
    'Turkish',
    'Ukrainian',
    'Emirati',
    'Venezuelan',
    'Vietnamese',
    'Yemeni',
    'Zambian',
    'Zimbabwean',
  ];

  filteredNationalities: string[] = []; // Ensure it's always initialized

  constructor(
    private router: Router,
    private socketService: WebSocketService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.filteredNationalities = [...this.nationalities];

    this.form = this.fb.group({
      nickname: ['', Validators.required], // Nickname is required
      nationality: ['', Validators.required], // Nationality is required
    });
  }

  filterNationalities(value: string): void {
    const filterValue = value.toLowerCase();
    this.filteredNationalities = this.nationalities.filter((nationality) =>
      nationality.toLowerCase().includes(filterValue)
    );
  }

  selectNationality(nationality: string): void {
    this.form.get('nationality')?.setValue(nationality);
    this.filteredNationalities = []; // Close the dropdown
  }

  // navToBurjEvent(){
  //   if(this.form.valid){
  //     this.router.navigate(['collage'])
  //   }
  // }
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement | null;

    // Safely check for null or undefined before accessing the value
    if (inputElement && inputElement.value !== null) {
      this.filterNationalities(inputElement.value);
    }
  }

  navToUploadPhotoView() {
    if (this.form.valid) {
      const nickname = this.form.get('nickname')?.value;
      const nationality = this.form.get('nationality')?.value;

      this.socketService
        .updateUserProfile({ name: nickname, nationality: nationality })
        ?.subscribe((res) => {
          this.router.navigate(['photo_upload']);
        });
    }
  }
}
