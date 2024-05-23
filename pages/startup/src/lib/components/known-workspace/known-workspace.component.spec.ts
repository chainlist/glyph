import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KnownWorkspaceComponent } from './known-workspace.component';

describe('KnownWorkspaceComponent', () => {
  let component: KnownWorkspaceComponent;
  let fixture: ComponentFixture<KnownWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnownWorkspaceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KnownWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
