import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasNodeFileNoteComponent } from './canvas-node-file-note.component';

describe('CanvasNodeFileNoteComponent', () => {
  let component: CanvasNodeFileNoteComponent;
  let fixture: ComponentFixture<CanvasNodeFileNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanvasNodeFileNoteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CanvasNodeFileNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
