import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlextableComponent } from './flextable.component';

describe('FlextableComponent', () => {
  let component: FlextableComponent;
  let fixture: ComponentFixture<FlextableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlextableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlextableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
