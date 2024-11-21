import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nick-name',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule],
  templateUrl: './nick-name.component.html',
  styleUrl: './nick-name.component.css'
})
export class NickNameComponent {

  form: FormGroup = new FormGroup({
    nickname: new FormControl('', Validators.required)
  })

  constructor(private router: Router){}

  // navToBurjEvent(){
  //   if(this.form.valid){
  //     this.router.navigate(['collage'])
  //   }
  // }

  navToUploadPhotoView(){
    if(this.form.valid){
      this.router.navigate(['photo_upload'])
    }
  }

}
