import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gv-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gv-brand-mark" [class.compact]="compact" [class.light-mode]="theme === 'light'">
      <img 
        class="brand-logo-img" 
        [src]="theme === 'light' ? 'assets/images/logo/gv-construction-logo.png' : 'assets/images/logo/gv-construction-logo-white.png'" 
        alt="GV Construction Logo"
        (error)="handleImageError($event)"
      />
      <!-- Inline crisp SVG fallback for vector precision -->
      <svg *ngIf="showSvgFallback" class="brand-logo-svg" viewBox="0 0 240 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g class="logo-symbol">
          <path d="M28 4L52 18V44L28 54L4 44V18L28 4Z" stroke="#0077B6" stroke-width="2.5" fill="#061224" />
          <path d="M28 12C20 12 14 17 14 28C14 39 20 44 28 44C34 44 39 40 40 34H28" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" />
          <path d="M28 28H42V35" stroke="#E63946" stroke-width="3.5" stroke-linecap="square" />
          <path d="M20 20L28 36L36 20" stroke="#E63946" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="28" cy="36" r="2.5" fill="#00B4D8" />
        </g>
        <g class="logo-text" *ngIf="!compact">
          <text x="68" y="28" [attr.fill]="theme === 'light' ? '#0F172A' : '#FFFFFF'" font-family="'Syne', sans-serif" font-size="22" font-weight="800" letter-spacing="1">GV</text>
          <circle cx="106" cy="24" r="3" fill="#E63946" />
          <text x="68" y="44" [attr.fill]="theme === 'light' ? '#475569' : '#94A3B8'" font-family="'Space Grotesk', monospace" font-size="10.5" font-weight="600" letter-spacing="3.5">CONSTRUCTION</text>
        </g>
      </svg>
    </div>
  `,
  styles: [`
    .gv-brand-mark {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .gv-brand-mark:hover {
      transform: scale(1.02);
    }
    .brand-logo-img {
      height: 48px;
      width: auto;
      object-fit: contain;
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
    }
    .compact .brand-logo-img {
      height: 40px;
    }
    .brand-logo-svg {
      height: 44px;
      width: auto;
    }
    .compact .brand-logo-svg {
      height: 36px;
    }
  `]
})
export class GvLogoComponent {
  @Input() compact = false;
  @Input() theme: 'dark' | 'light' = 'dark';
  showSvgFallback = false;

  handleImageError(event: any) {
    this.showSvgFallback = true;
    if (event.target) {
      event.target.style.display = 'none';
    }
  }
}
