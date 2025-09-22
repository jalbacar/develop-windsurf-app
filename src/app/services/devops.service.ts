import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Commit, TeamMember, CodeReview, Comment } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DevopsService {
  private mockCommits: Commit[] = [
    {
      id: '1',
      author: 'Ana García',
      message: 'feat: añadir componente de revisión de código',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      files: ['src/app/components/code-review.component.ts', 'src/app/components/code-review.component.html'],
    },
    {
      id: '2',
      author: 'Carlos López',
      message: 'fix: corregir validación en formulario de commit',
      date: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 horas atrás
      files: ['src/app/services/validation.service.ts'],
    },
    {
      id: '3',
      author: 'María Rodríguez',
      message: 'docs: actualizar README con instrucciones de DevOps',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 día atrás
      files: ['README.md', 'docs/devops-guide.md'],
    },
  ];

  private mockTeamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Ana García',
      role: 'Frontend Developer',
      avatar: '👩‍💻',
    },
    {
      id: '2',
      name: 'Carlos López',
      role: 'Backend Developer',
      avatar: '👨‍💻',
    },
    {
      id: '3',
      name: 'María Rodríguez',
      role: 'DevOps Engineer',
      avatar: '👩‍🔧',
    },
    {
      id: '4',
      name: 'Juan Martínez',
      role: 'Tech Lead',
      avatar: '👨‍💼',
    },
  ];

  private mockCodeReviews: CodeReview[] = [
    {
      id: '1',
      title: 'Implementar autenticación JWT',
      author: 'Carlos López',
      status: 'pending',
      comments: [
        {
          id: '1',
          author: 'Juan Martínez',
          content: 'Revisar la validación de tokens en el middleware',
          line: 45,
          file: 'auth.service.ts',
        },
      ],
    },
    {
      id: '2',
      title: 'Optimizar consultas de base de datos',
      author: 'Ana García',
      status: 'approved',
      comments: [
        {
          id: '2',
          author: 'María Rodríguez',
          content: 'Excelente optimización, mejora significativa en performance',
        },
      ],
    },
  ];

  getCommits(): Observable<Commit[]> {
    return of(this.mockCommits);
  }

  getTeamMembers(): Observable<TeamMember[]> {
    return of(this.mockTeamMembers);
  }

  getCodeReviews(): Observable<CodeReview[]> {
    return of(this.mockCodeReviews);
  }

  addComment(reviewId: string, comment: Comment): void {
    const review = this.mockCodeReviews.find(r => r.id === reviewId);
    if (review) {
      review.comments.push(comment);
    }
  }

  updateReviewStatus(reviewId: string, status: 'pending' | 'approved' | 'rejected'): void {
    const review = this.mockCodeReviews.find(r => r.id === reviewId);
    if (review) {
      review.status = status;
    }
  }
}