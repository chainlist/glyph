import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockingLayerComponent } from './blocking-layer.component';

describe('BlockingLayerComponent', () => {
  let component: BlockingLayerComponent;
  let fixture: ComponentFixture<BlockingLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockingLayerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockingLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
