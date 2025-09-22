import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have navigation items', () => {
    expect(component.navigationItems.length).toBe(3);
    expect(component.navigationItems[0].label).toBe('Revisión de Código');
  });

  it('should emit item selection', () => {
    spyOn(component.itemSelected, 'emit');
    const item = component.navigationItems[0];
    
    component.onItemClick(item);
    
    expect(component.itemSelected.emit).toHaveBeenCalledWith(item.id);
    expect(component.activeItem).toBe(item.id);
  });
});