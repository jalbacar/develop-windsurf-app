import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CodeReview, TeamMember } from '../../models';
import { DevopsService } from '../../services/devops.service';
import { NotificationService } from '../../services/notification.service';

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
  providers: [DatePipe],
  template: `
    <div class="code-review-container">
      <h2>Revisiones de Código</h2>
      
      <mat-card *ngFor="let review of codeReviews" class="review-card">
        <mat-card-header>
          <mat-card-title>{{ review.title }}</mat-card-title>
          <mat-card-subtitle>
            <div class="author-info">
              <span class="avatar" [title]="getMemberRole(review.author)">{{ getMemberAvatar(review.author) }}</span>
              <span>{{ review.author }}</span>
              <span class="role-badge">{{ getMemberRole(review.author) }}</span>
            </div>
            <span *ngIf="review.reviewDate" class="review-date">
              · <mat-icon class="date-icon">event</mat-icon> {{ formatDate(review.reviewDate) }}
            </span>
          </mat-card-subtitle>
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
              <div class="comment-header">
                <span class="avatar" [title]="getMemberRole(comment.author)">{{ getMemberAvatar(comment.author) }}</span>
                <strong>{{ comment.author }}:</strong>
                <span class="role-badge small">{{ getMemberRole(comment.author) }}</span>
              </div>
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
    
    .review-date {
      color: #666;
      font-size: 0.9em;
      display: inline-flex;
      align-items: center;
    }
    
    .date-icon {
      font-size: 14px;
      height: 14px;
      width: 14px;
      margin-right: 4px;
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
    
    .author-info {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 4px;
    }
    
    .avatar {
      font-size: 1.2em;
      margin-right: 4px;
      cursor: help;
    }
    
    .role-badge {
      background-color: #e0e0e0;
      color: #333;
      font-size: 0.8em;
      padding: 2px 6px;
      border-radius: 12px;
      margin-left: 6px;
    }
    
    .role-badge.small {
      font-size: 0.7em;
      padding: 1px 4px;
    }
    
    .comment-header {
      display: flex;
      align-items: center;
      margin-bottom: 4px;
    }
  `]
})
export class CodeReviewComponent implements OnInit {
  /** Lista de revisiones de código */
  codeReviews: CodeReview[] = [];
  
  /** Lista de miembros del equipo */
  teamMembers: TeamMember[] = [];
  
  private devopsService = inject(DevopsService);
  private notificationService = inject(NotificationService);
  private datePipe = inject(DatePipe);

  /**
   * Inicializa el componente cargando las revisiones de código y los miembros del equipo
   */
  ngOnInit(): void {
    this.loadCodeReviews();
    this.loadTeamMembers();
  }

  /**
   * Carga las revisiones de código desde el servicio
   * @private
   */
  private loadCodeReviews(): void {
    this.devopsService.getCodeReviews()
      .pipe(
        catchError(error => {
          this.notificationService.showError('Error al cargar las revisiones de código');
          console.error('Error loading code reviews:', error);
          return of([]);
        })
      )
      .subscribe(reviews => {
        this.codeReviews = reviews;
      });
  }
  
  /**
   * Carga los miembros del equipo desde el servicio
   * @private
   */
  private loadTeamMembers(): void {
    this.devopsService.getTeamMembers()
      .pipe(
        catchError(error => {
          this.notificationService.showError('Error al cargar los miembros del equipo');
          console.error('Error loading team members:', error);
          return of([]);
        })
      )
  
// Caché para almacenar resultados de búsqueda de miembros
private memberCache: Map<string, TeamMember | undefined> = new Map();
  
/**
* Busca un miembro del equipo por su nombre (con caché)
* @param name - Nombre del miembro del equipo
* @returns El miembro encontrado o undefined si no existe
* @private
*/
private findMember(name: string): TeamMember | undefined {
// Verificar si ya tenemos este miembro en caché
if (!this.memberCache.has(name)) {
// Si no está en caché, buscarlo y guardarlo
const member = this.teamMembers.find(member => member.name === name);
this.memberCache.set(name, member);
}
return this.memberCache.get(name);
}
  
/**
* Obtiene el avatar de un miembro del equipo por su nombre
* @param name - Nombre del miembro del equipo
* @returns El avatar del miembro o un avatar por defecto si no se encuentra
*/
getMemberAvatar(name: string): string {
const member = this.findMember(name);
return member?.avatar || '   '; // Espacio en blanco si no hay avatar
}
  
/**
* Obtiene el rol de un miembro del equipo por su nombre
* @param name - Nombre del miembro del equipo
* @returns El rol del miembro o una cadena vacía si no se encuentra
*/
getMemberRole(name: string): string {
const member = this.findMember(name);
return member?.role || '';
}

/**
* Formatea una fecha utilizando la configuración regional
* @param date - La fecha a formatear
* @returns La fecha formateada como string
*/
formatDate(date: Date): string {
return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm', undefined, 'es-ES') || '';
}
   * @returns La fecha formateada como string
   */
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm', undefined, 'es-ES') || '';
  }

  /**
   * Obtiene la etiqueta de estado localizada
   * @param status - El estado de la revisión
   * @returns La etiqueta localizada
   */
  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pending: 'Pendiente',
      approved: 'Aprobado',
      rejected: 'Rechazado',
    };
    return labels[status] || status;
  }

  /**
   * Obtiene la clase CSS para el estado
   * @param status - El estado de la revisión
   * @returns La clase CSS correspondiente
   */
  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  /**
   * Aprueba una revisión de código y registra la fecha y hora de la acción
   * @param reviewId - Identificador único de la revisión
   */
  approveReview(reviewId: string): void {
    // Find the review and update its date
    const review = this.codeReviews.find(review => review.id === reviewId);
    if (review) {
      // Evitar cambiar la fecha si ya está en el estado solicitado
      if (review.status !== 'approved') {
        review.reviewDate = new Date();
        
        this.devopsService.updateReviewStatus(reviewId, 'approved', review.reviewDate);
        this.loadCodeReviews();
        this.notificationService.showSuccess('Revisión aprobada correctamente');
      }
    }
  }

  /**
   * Rechaza una revisión de código y registra la fecha y hora de la acción
   * @param reviewId - Identificador único de la revisión
   */
  rejectReview(reviewId: string): void {
    // Find the review and update its date
    const review = this.codeReviews.find(review => review.id === reviewId);
    if (review) {
      // Evitar cambiar la fecha si ya está en el estado solicitado
      if (review.status !== 'rejected') {
        review.reviewDate = new Date();
        
        this.devopsService.updateReviewStatus(reviewId, 'rejected', review.reviewDate);
        this.loadCodeReviews();
        this.notificationService.showError('Revisión rechazada');
      }
    }
  }
}