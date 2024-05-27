import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectingComponent } from './selecting.component';

describe('SelectingComponent', () => {
  let component: SelectingComponent;
  let fixture: ComponentFixture<SelectingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
