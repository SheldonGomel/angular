import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteringBlockComponent } from './filtering-block.component';

describe('FilteringBlockComponent', () => {
  let component: FilteringBlockComponent;
  let fixture: ComponentFixture<FilteringBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteringBlockComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FilteringBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
