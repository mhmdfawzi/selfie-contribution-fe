import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphaMaskComponent } from './alpha-mask.component';

describe('AlphaMaskComponent', () => {
  let component: AlphaMaskComponent;
  let fixture: ComponentFixture<AlphaMaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlphaMaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlphaMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
