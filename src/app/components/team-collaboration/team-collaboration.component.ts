import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { DevopsService } from '../../services/devops.service';
import { NotificationService } from '../../services/notification.service';
import { TeamMember, CodeReview } from '../../models';

@Component({
  selector: 'app-team-collaboration',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatGridListModule,
  ],
  template: `
    <div class="team-collaboration-container">
      <h2>Colaboración del Equipo</h2>
      
      <mat-grid-list cols="2" rowHeight="400px" gutterSize="16px">
        <!-- Team Members Section -->
        <mat-grid-tile>
          <mat-card class="full-card">
            <mat-card-header>
              <mat-card-title>Miembros del Equipo</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <mat-list>
                <mat-list-item *ngFor="let member of teamMembers">
                  <div matListItemAvatar class="avatar">{{ member.avatar }}</div>
                  <div matListItemTitle>{{ member.name }}</div>
                  <div matListItemSubtitle>{{ member.role }}</div>
                  <button mat-icon-button matListItemMeta (click)="sendMessage(member)">
                    <mat-icon>message</mat-icon>
                  </button>
                </mat-list-item>
              </mat-list>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
        
        <!-- Pull Requests Section -->
        <mat-grid-tile>
          <mat-card class="full-card">
            <mat-card-header>
              <mat-card-title>Pull Requests Activos</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div *ngFor="let review of codeReviews" class="pr-item">
                <div class="pr-header">
                  <strong>{{ review.title }}</strong>
                  <mat-chip [class]="getStatusClass(review.status)">
                    {{ getStatusLabel(review.status) }}
                  </mat-chip>
                </div>
                <div class="pr-meta">
                  <span>Por: {{ review.author }}</span>
                  <span>{{ review.comments.length }} comentarios</span>
                </div>
                <div class="pr-actions">
                  <button mat-stroked-button size="small" (click)="reviewPR(review)">
                    <mat-icon>visibility</mat-icon>
                    Revisar
                  </button>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
      
      <!-- Team Stats -->
      <mat-card class="stats-card">
        <mat-card-header>
          <mat-card-title>Estadísticas del Equipo</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="stats-grid">
            <div class="stat-item">
              <mat-icon>group</mat-icon>
              <div class="stat-value">{{ teamMembers.length }}</div>
              <div class="stat-label">Miembros</div>
            </div>
            <div class="stat-item">
              <mat-icon>rate_review</mat-icon>
              <div class="stat-value">{{ codeReviews.length }}</div>
              <div class="stat-label">PRs Activos</div>
            </div>
            <div class="stat-item">
              <mat-icon>check_circle</mat-icon>
              <div class="stat-value">{{ getApprovedCount() }}</div>
              <div class="stat-label">Aprobados</div>
            </div>
            <div class="stat-item">
              <mat-icon>pending</mat-icon>
              <div class="stat-value">{{ getPendingCount() }}</div>
              <div class="stat-label">Pendientes</div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .team-collaboration-container {
      padding: 20px;
    }
    
    .full-card {
      width: 100%;
      height: 100%;
    }
    
    .avatar {
      font-size: 24px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
      border-radius: 50%;
    }
    
    .pr-item {
      margin-bottom: 16px;
      padding: 12px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }
    
    .pr-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    
    .pr-meta {
      display: flex;
      gap: 16px;
      font-size: 0.875rem;
      color: #666;
      margin-bottom: 8px;
    }
    
    .pr-actions {
      display: flex;
      gap: 8px;
    }
    
    .stats-card {
      margin-top: 16px;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }
    
    .stat-item {
      text-align: center;
      padding: 16px;
    }
    
    .stat-item mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #3f51b5;
    }
    
    .stat-value {
      font-size: 24px;
      font-weight: bold;
      margin: 8px 0 4px 0;
    }
    
    .stat-label {
      font-size: 0.875rem;
      color: #666;
    }
    
    .status-pending {
      background-color: #ff9800 !important;
      color: white !important;
    }
    
    .status-approved {
      background-color: #4caf50 !important;
      color: white !important;
    }
    
    .status-rejected {
      background-color: #f44336 !important;
      color: white !important;
    }
  `]
})
export class TeamCollaborationComponent implements OnInit {
  teamMembers: TeamMember[] = [];
  codeReviews: CodeReview[] = [];

  constructor(
    private devopsService: DevopsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTeamData();
  }

  private loadTeamData(): void {
    this.devopsService.getTeamMembers().subscribe(members => {
      this.teamMembers = members;
    });

    this.devopsService.getCodeReviews().subscribe(reviews => {
      this.codeReviews = reviews;
    });
  }

  sendMessage(member: TeamMember): void {
    this.notificationService.showInfo(`Mensaje enviado a ${member.name}`);
  }

  reviewPR(review: CodeReview): void {
    this.notificationService.showInfo(`Abriendo revisión: ${review.title}`);
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      pending: 'Pendiente',
      approved: 'Aprobado',
      rejected: 'Rechazado',
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  getApprovedCount(): number {
    return this.codeReviews.filter(review => review.status === 'approved').length;
  }

  getPendingCount(): number {
    return this.codeReviews.filter(review => review.status === 'pending').length;
  }
}