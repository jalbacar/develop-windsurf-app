import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DevopsService } from '../../services/devops.service';
import { NotificationService } from '../../services/notification.service';
import { CodeReview } from '../../models';

@Component({
  selector: 'app-code-review',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  template: `
    <div class="code-review-container">
      <h2>Revisiones de Código</h2>
      
      <mat-card *ngFor="let review of codeReviews" class="review-card">
        <mat-card-header>
          <mat-card-title>{{ review.title }}</mat-card-title>
          <mat-card-subtitle>Por: {{ review.author }}</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <div class="status-section">
            <mat-chip-set>
              <mat-chip 
                [class]="getStatusClass(review.status)"
                [disabled]="false">
                {{ getStatusLabel(review.status) }}
              </mat-chip>
            </mat-chip-set>
          </div>
          
          <mat-divider></mat-divider>
          
          <div class="comments-section" *ngIf="review.comments.length > 0">
            <h4>Comentarios:</h4>
            <div *ngFor="let comment of review.comments" class="comment">
              <strong>{{ comment.author }}:</strong>
              <p>{{ comment.content }}</p>
              <small *ngIf="comment.file && comment.line">
                {{ comment.file }}:{{ comment.line }}
              </small>
            </div>
          </div>
        </mat-card-content>
        
        <mat-card-actions>
          <button 
            mat-raised-button 
            color="primary" 
            (click)="approveReview(review.id)"
            [disabled]="review.status === 'approved'">
            <mat-icon>check</mat-icon>
            Aprobar
          </button>
          <button 
            mat-raised-button 
            color="warn" 
            (click)="rejectReview(review.id)"
            [disabled]="review.status === 'rejected'">
            <mat-icon>close</mat-icon>
            Rechazar
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .code-review-container {
      padding: 20px;
    }
    
    .review-card {
      margin-bottom: 16px;
    }
    
    .status-section {
      margin: 16px 0;
    }
    
    .comments-section {
      margin-top: 16px;
    }
    
    .comment {
      margin: 8px 0;
      padding: 8px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
    
    .comment p {
      margin: 4px 0;
    }
    
    .comment small {
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
    
    mat-card-actions {
      display: flex;
      gap: 8px;
    }
  `]
})
export class CodeReviewComponent implements OnInit {
  codeReviews: CodeReview[] = [];

  constructor(
    private devopsService: DevopsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadCodeReviews();
  }

  private loadCodeReviews(): void {
    this.devopsService.getCodeReviews().subscribe(reviews => {
      this.codeReviews = reviews;
    });
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

  approveReview(reviewId: string): void {
    this.devopsService.updateReviewStatus(reviewId, 'approved');
    this.loadCodeReviews();
    this.notificationService.showSuccess('Revisión aprobada correctamente');
  }

  rejectReview(reviewId: string): void {
    this.devopsService.updateReviewStatus(reviewId, 'rejected');
    this.loadCodeReviews();
    this.notificationService.showError('Revisión rechazada');
  }
}