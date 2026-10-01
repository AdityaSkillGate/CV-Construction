import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" *ngIf="project" (click)="onBackdropClick($event)">
      <div class="modal-container">
        <!-- Close Button -->
        <button class="modal-close-btn" (click)="close()" aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div class="modal-body">
          <!-- Image Gallery / Banner -->
          <div class="modal-media">
            <img [src]="project.imageUrl" [alt]="project.name" class="main-project-img"/>
            <div class="media-overlay">
              <span class="project-category-badge">{{ project.category }}</span>
              <span class="project-year-badge">{{ project.year }}</span>
            </div>
          </div>

          <!-- Content Details -->
          <div class="modal-details">
            <div class="details-header">
              <p class="project-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {{ project.location }}
              </p>
              <h2 class="project-title">{{ project.name }}</h2>
            </div>

            <!-- Metric Strip -->
            <div class="metric-strip">
              <div class="metric-box">
                <span class="metric-label">BUILT AREA</span>
                <span class="metric-val">{{ project.area }}</span>
              </div>
              <div class="metric-box">
                <span class="metric-label">STATUS</span>
                <span class="metric-val status-val">{{ project.completion }}</span>
              </div>
              <div class="metric-box">
                <span class="metric-label">CLIENT</span>
                <span class="metric-val">{{ project.client }}</span>
              </div>
            </div>

            <!-- Description -->
            <div class="modal-narrative">
              <h4 class="narrative-title">ENGINEERING & ARCHITECTURAL SUMMARY</h4>
              <p class="narrative-text">{{ project.description }}</p>
            </div>

            <!-- Engineering Highlights -->
            <div class="modal-highlights">
              <h4 class="narrative-title">KEY SPECIFICATIONS & HIGHLIGHTS</h4>
              <ul class="highlights-list">
                <li *ngFor="let h of project.highlights" class="highlight-item">
                  <span class="check-icon">✓</span>
                  <span>{{ h }}</span>
                </li>
              </ul>
            </div>

            <!-- Action -->
            <div class="modal-actions">
              <button class="btn-gv-primary" (click)="requestConsult()">
                <span>INQUIRE ABOUT THIS PROJECT</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(4, 10, 20, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-container {
      background: var(--gv-navy-850);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      max-width: 960px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
      animation: scaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes scaleUp {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .modal-close-btn {
      position: absolute;
      top: 1.25rem;
      right: 1.25rem;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(6, 18, 36, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--gv-white);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      transition: all 0.25s ease;

      &:hover {
        background: var(--gv-red-500);
        border-color: var(--gv-red-500);
        transform: rotate(90deg);
      }
    }

    .modal-media {
      position: relative;
      width: 100%;
      height: 380px;
      overflow: hidden;

      @media (max-width: 768px) {
        height: 240px;
      }
    }

    .main-project-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .media-overlay {
      position: absolute;
      bottom: 1.25rem;
      left: 1.5rem;
      display: flex;
      gap: 0.75rem;
    }

    .project-category-badge {
      padding: 0.35rem 0.85rem;
      background: var(--gv-red-500);
      color: var(--gv-white);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      border-radius: 4px;
      letter-spacing: 0.08em;
    }

    .project-year-badge {
      padding: 0.35rem 0.85rem;
      background: rgba(6, 18, 36, 0.8);
      color: var(--gv-cyan-400);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      border-radius: 4px;
      border: 1px solid rgba(0, 180, 216, 0.3);
    }

    .modal-details {
      padding: 2.25rem;

      @media (max-width: 768px) {
        padding: 1.5rem;
      }
    }

    .project-location {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--gv-cyan-400);
      margin-bottom: 0.5rem;
    }

    .project-title {
      font-family: var(--font-brand);
      font-size: clamp(1.6rem, 2.5vw, 2.4rem);
      font-weight: 800;
      color: var(--gv-white);
      margin-bottom: 1.75rem;
    }

    .metric-strip {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
      background: rgba(6, 18, 36, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 8px;
      padding: 1.25rem;
      margin-bottom: 2rem;
    }

    .metric-label {
      display: block;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--gv-slate-400);
      letter-spacing: 0.1em;
      margin-bottom: 0.25rem;
    }

    .metric-val {
      font-family: var(--font-sans);
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--gv-slate-100);

      &.status-val {
        color: #10B981;
      }
    }

    .narrative-title {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--gv-cyan-400);
      letter-spacing: 0.12em;
      margin-bottom: 0.75rem;
    }

    .narrative-text {
      font-size: 1rem;
      color: var(--gv-slate-300);
      line-height: 1.75;
      margin-bottom: 1.75rem;
    }

    .highlights-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 2rem;
    }

    .highlight-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      font-size: 0.95rem;
      color: var(--gv-slate-200);

      .check-icon {
        color: var(--gv-red-500);
        font-weight: 800;
        font-family: var(--font-mono);
      }
    }

    .modal-actions {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 1.5rem;
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class ProjectModalComponent {
  @Input() project: Project | null = null;
  @Output() closeRequested = new EventEmitter<void>();
  @Output() consultRequested = new EventEmitter<Project>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  onBackdropClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  close(): void {
    this.closeRequested.emit();
  }

  requestConsult(): void {
    if (this.project) {
      this.consultRequested.emit(this.project);
    }
  }
}
