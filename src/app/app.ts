import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CodeReviewComponent } from './components/code-review/code-review.component';
import { CommitHistoryComponent } from './components/commit-history/commit-history.component';
import { TeamCollaborationComponent } from './components/team-collaboration/team-collaboration.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatSidenavModule,
    HeaderComponent,
    SidebarComponent,
    CodeReviewComponent,
    CommitHistoryComponent,
    TeamCollaborationComponent,
  ],
  template: `
    <div class="app-container">
      <app-header></app-header>
      
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav mode="side" opened class="sidenav">
          <app-sidebar (itemSelected)="onSectionChange($event)"></app-sidebar>
        </mat-sidenav>
        
        <mat-sidenav-content class="main-content">
          <div [ngSwitch]="activeSection">
            <app-code-review *ngSwitchCase="'code-review'"></app-code-review>
            <app-commit-history *ngSwitchCase="'commit-history'"></app-commit-history>
            <app-team-collaboration *ngSwitchCase="'team-collaboration'"></app-team-collaboration>
            <div *ngSwitchDefault class="welcome-section">
              <h2>Bienvenido a DevOps Learning Platform</h2>
              <p>Selecciona una sección del menú lateral para comenzar.</p>
            </div>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .sidenav-container {
      flex: 1;
    }
    
    .sidenav {
      width: 280px;
      border-right: 1px solid #e0e0e0;
    }
    
    .main-content {
      padding: 0;
      overflow: auto;
    }
    
    .welcome-section {
      padding: 40px;
      text-align: center;
      color: #666;
    }
    
    .welcome-section h2 {
      margin-bottom: 16px;
      color: #333;
    }
  `]
})
export class App {
  title = 'DevOps Learning Platform';
  activeSection = 'code-review';

  onSectionChange(section: string): void {
    this.activeSection = section;
  }
}
