import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationStatusComponent } from './publication-status.component';

describe('PublicationStatusComponent', () => {
  let component: PublicationStatusComponent;
  let fixture: ComponentFixture<PublicationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicationStatusComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PublicationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
