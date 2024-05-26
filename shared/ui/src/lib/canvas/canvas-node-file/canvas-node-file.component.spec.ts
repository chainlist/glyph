import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasNodeFileComponent } from './canvas-node-file.component';

describe('CanvasNodeFileComponent', () => {
  let component: CanvasNodeFileComponent;
  let fixture: ComponentFixture<CanvasNodeFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanvasNodeFileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CanvasNodeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
