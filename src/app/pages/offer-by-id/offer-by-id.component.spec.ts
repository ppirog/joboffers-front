import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferByIdComponent } from './offer-by-id.component';

describe('OfferByIdComponent', () => {
  let component: OfferByIdComponent;
  let fixture: ComponentFixture<OfferByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfferByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
