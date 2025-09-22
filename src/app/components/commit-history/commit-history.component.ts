import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { DevopsService } from '../../services/devops.service';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { Commit } from '../../models';

@Component({
  selector: 'app-commit-history',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    FormatDatePipe,
  ],
  template: `
    <div class="commit-history-container">
      <h2>Historial de Commits</h2>
      
      <mat-card>
        <mat-card-content>
          <mat-list>
            <mat-list-item *ngFor="let commit of commits; let last = last">
              <mat-icon matListItemIcon class="commit-icon">commit</mat-icon>
              
              <div matListItemTitle class="commit-info">
                <div class="commit-message">{{ commit.message }}</div>
                <div class="commit-meta">
                  <span class="author">{{ commit.author }}</span>
                  <span class="date">{{ commit.date | formatDate }}</span>
                </div>
              </div>
              
              <div matListItemMeta class="commit-files">
                <mat-chip-set>
                  <mat-chip *ngFor="let file of commit.files" class="file-chip">
                    {{ getFileName(file) }}
                  </mat-chip>
                </mat-chip-set>
              </div>
              
              <mat-divider *ngIf="!last"></mat-divider>
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .commit-history-container {
      padding: 20px;
    }
    
    .commit-icon {
      color: #3f51b5;
    }
    
    .commit-info {
      flex: 1;
      margin-right: 16px;
    }
    
    .commit-message {
      font-weight: 500;
      margin-bottom: 4px;
    }
    
    .commit-meta {
      display: flex;
      gap: 16px;
      font-size: 0.875rem;
      color: #666;
    }
    
    .author {
      font-weight: 500;
    }
    
    .commit-files {
      max-width: 300px;
    }
    
    .file-chip {
      font-size: 0.75rem;
      height: 24px;
    }
    
    mat-list-item {
      height: auto !important;
      padding: 16px 0;
    }
    
    mat-chip-set {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
  `]
})
export class CommitHistoryComponent implements OnInit {
  commits: Commit[] = [];

  constructor(private devopsService: DevopsService) {}

  ngOnInit(): void {
    this.loadCommits();
  }

  private loadCommits(): void {
    this.devopsService.getCommits().subscribe(commits => {
      this.commits = commits.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });
  }

  getFileName(filePath: string): string {
    return filePath.split('/').pop() || filePath;
  }
}