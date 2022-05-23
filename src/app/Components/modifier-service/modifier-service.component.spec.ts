import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierServiceComponent } from './modifier-service.component';

describe('ModifierServiceComponent', () => {
  let component: ModifierServiceComponent;
  let fixture: ComponentFixture<ModifierServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
