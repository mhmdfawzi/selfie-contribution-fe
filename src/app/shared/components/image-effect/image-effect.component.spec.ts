import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEffectComponent } from './image-effect.component';

describe('ImageEffectComponent', () => {
  let component: ImageEffectComponent;
  let fixture: ComponentFixture<ImageEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageEffectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
