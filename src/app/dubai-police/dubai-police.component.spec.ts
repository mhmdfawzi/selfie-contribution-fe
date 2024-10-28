import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DubaiPoliceComponent } from './dubai-police.component';

describe('DubaiPoliceComponent', () => {
  let component: DubaiPoliceComponent;
  let fixture: ComponentFixture<DubaiPoliceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DubaiPoliceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DubaiPoliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
