import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NikeNameComponent } from './nick-name.component';

describe('NikeNameComponent', () => {
  let component: NikeNameComponent;
  let fixture: ComponentFixture<NikeNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NikeNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NikeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
