import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasNodeFileNotFoundComponent } from './canvas-node-file-not-found.component';

describe('CanvasNodeFileNotFoundComponent', () => {
  let component: CanvasNodeFileNotFoundComponent;
  let fixture: ComponentFixture<CanvasNodeFileNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanvasNodeFileNotFoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CanvasNodeFileNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
