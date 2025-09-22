import { Component, EventEmitter, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  template: `
    <mat-nav-list>
      <h3 mat-subheader>Secciones DevOps</h3>
      <mat-list-item 
        *ngFor="let item of navigationItems" 
        (click)="onItemClick(item)"
        [class.active]="item.id === activeItem">
        <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
        <span matListItemTitle>{{ item.label }}</span>
      </mat-list-item>
    </mat-nav-list>
  `,
  styles: [`
    mat-nav-list {
      padding-top: 0;
    }
    
    mat-list-item {
      cursor: pointer;
      margin-bottom: 4px;
    }
    
    mat-list-item:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
    
    mat-list-item.active {
      background-color: rgba(63, 81, 181, 0.1);
      color: #3f51b5;
    }
    
    mat-list-item.active mat-icon {
      color: #3f51b5;
    }
  `]
})
export class SidebarComponent {
  @Output() itemSelected = new EventEmitter<string>();
  
  activeItem = 'code-review';
  
  navigationItems: NavigationItem[] = [
    { id: 'code-review', label: 'Revisión de Código', icon: 'rate_review' },
    { id: 'commit-history', label: 'Historial de Commits', icon: 'history' },
    { id: 'team-collaboration', label: 'Colaboración del Equipo', icon: 'group' },
  ];

  onItemClick(item: NavigationItem): void {
    this.activeItem = item.id;
    this.itemSelected.emit(item.id);
  }
}