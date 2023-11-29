import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuirofanoComponent } from './quirofano.component';

describe('QuirofanoComponent', () => {
  let component: QuirofanoComponent;
  let fixture: ComponentFixture<QuirofanoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuirofanoComponent]
    });
    fixture = TestBed.createComponent(QuirofanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
