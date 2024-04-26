import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpServiceComponent } from './help-service.component';

describe('HelpServiceComponent', () => {
  let component: HelpServiceComponent;
  let fixture: ComponentFixture<HelpServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
