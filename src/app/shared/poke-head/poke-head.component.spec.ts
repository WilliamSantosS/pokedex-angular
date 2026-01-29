import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeHeadComponent } from './poke-head.component';

describe('PokeHeadComponent', () => {
  let component: PokeHeadComponent;
  let fixture: ComponentFixture<PokeHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
