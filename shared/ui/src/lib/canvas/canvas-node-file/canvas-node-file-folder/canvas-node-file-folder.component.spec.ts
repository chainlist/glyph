import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasNodeFileFolderComponent } from './canvas-node-file-folder.component';

describe('CanvasNodeFileFolderComponent', () => {
  let component: CanvasNodeFileFolderComponent;
  let fixture: ComponentFixture<CanvasNodeFileFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanvasNodeFileFolderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CanvasNodeFileFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
