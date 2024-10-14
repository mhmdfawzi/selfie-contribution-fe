import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurjKhalifaShapeComponent } from './burj-khalifa-shape.component';

describe('BurjKhalifaShapeComponent', () => {
  let component: BurjKhalifaShapeComponent;
  let fixture: ComponentFixture<BurjKhalifaShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurjKhalifaShapeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BurjKhalifaShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
