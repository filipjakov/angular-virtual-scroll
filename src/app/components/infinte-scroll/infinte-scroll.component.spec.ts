import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfinteScrollComponent } from './infinte-scroll.component';

describe('InfinteScrollComponent', () => {
  let component: InfinteScrollComponent;
  let fixture: ComponentFixture<InfinteScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfinteScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfinteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
