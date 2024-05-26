import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasNodeUnknownComponent } from './canvas-node-unknown.component';

describe('CanvasNodeUnknownComponent', () => {
  let component: CanvasNodeUnknownComponent;
  let fixture: ComponentFixture<CanvasNodeUnknownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanvasNodeUnknownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CanvasNodeUnknownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
