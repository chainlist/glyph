import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KnownWorkspacesComponent } from './known-workspaces.component';

describe('KnownWorkspacesComponent', () => {
  let component: KnownWorkspacesComponent;
  let fixture: ComponentFixture<KnownWorkspacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnownWorkspacesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KnownWorkspacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
