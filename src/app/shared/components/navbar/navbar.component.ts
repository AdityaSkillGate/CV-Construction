import { Component, HostListener, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GvLogoComponent } from '../gv-logo/gv-logo.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, GvLogoComponent],
  template: `
    <header class="gv-navbar" [class.is-scrolled]="isScrolled" [class.menu-open]="mobileMenuOpen">
      <div class="gv-container nav-container">
        <!-- Logo -->
        <a class="nav-brand" (click)="scrollTo('hero')">
          <app-gv-logo [compact]="isScrolled" [theme]="'dark'"></app-gv-logo>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="nav-links">
          <a class="nav-item" (click)="scrollTo('about')">ABOUT</a>
          <a class="nav-item" (click)="scrollTo('services')">SERVICES</a>
          <a class="nav-item" (click)="scrollTo('projects')">PROJECTS</a>
          <a class="nav-item" (click)="scrollTo('process')">PROCESS</a>
          <a class="nav-item" (click)="scrollTo('why-gv')">WHY GV</a>
          <a class="nav-item" (click)="scrollTo('contact')">CONTACT</a>
        </nav>

        <!-- Right CTA Button & Mobile Toggle -->
        <div class="nav-actions">
          <button class="btn-gv-primary nav-cta-btn" (click)="scrollTo('contact')">
            <span>START A PROJECT</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

          <!-- Mobile Hamburger Toggle -->
          <button class="mobile-toggle" (click)="toggleMobileMenu()" aria-label="Toggle navigation">
            <span class="hamburger-bar top" [class.open]="mobileMenuOpen"></span>
            <span class="hamburger-bar middle" [class.open]="mobileMenuOpen"></span>
            <span class="hamburger-bar bottom" [class.open]="mobileMenuOpen"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Drawer Backdrop -->
      <div class="mobile-drawer-backdrop" [class.open]="mobileMenuOpen" (click)="closeMobileMenu()"></div>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-drawer" [class.open]="mobileMenuOpen">
        <div class="drawer-inner">
          <nav class="mobile-nav-list">
            <a class="mobile-nav-item" (click)="navigateAndClose('hero')">
              <span class="item-num">01</span> HOME
            </a>
            <a class="mobile-nav-item" (click)="navigateAndClose('scroll-building')">
              <span class="item-num">02</span> BUILDING EXPERIENCE
            </a>
            <a class="mobile-nav-item" (click)="navigateAndClose('about')">
              <span class="item-num">03</span> ABOUT US
            </a>
            <a class="mobile-nav-item" (click)="navigateAndClose('services')">
              <span class="item-num">04</span> SERVICES
            </a>
            <a class="mobile-nav-item" (click)="navigateAndClose('projects')">
              <span class="item-num">05</span> PROJECTS
            </a>
            <a class="mobile-nav-item" (click)="navigateAndClose('process')">
              <span class="item-num">06</span> OUR PROCESS
            </a>
            <a class="mobile-nav-item" (click)="navigateAndClose('why-gv')">
              <span class="item-num">07</span> WHY GV
            </a>
            <a class="mobile-nav-item" (click)="navigateAndClose('contact')">
              <span class="item-num">08</span> CONTACT
            </a>
          </nav>

          <div class="mobile-drawer-footer">
            <button class="btn-gv-primary full-width" (click)="navigateAndClose('contact')">
              START A PROJECT
            </button>
            <div class="mobile-contact-info">
              <p>📍 Chennai, Tamil Nadu, India</p>
              <p>📞 +91 98765 43210</p>
              <p>✉️ contact&#64;gvconstruction.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .gv-navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 90px;
      z-index: 1000;
      display: flex;
      align-items: center;
      background: transparent;
      border-bottom: 1px solid transparent;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

      &.is-scrolled {
        height: 72px;
        background: rgba(6, 18, 36, 0.85);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      }
    }

    .nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .nav-brand {
      cursor: pointer;
      text-decoration: none;
      display: flex;
      align-items: center;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 2.2rem;

      @media (max-width: 1024px) {
        display: none;
      }
    }

    .nav-item {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      color: var(--gv-slate-300);
      text-decoration: none;
      cursor: pointer;
      position: relative;
      padding: 0.5rem 0;
      transition: color 0.3s ease;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--gv-red-500);
        transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      &:hover {
        color: var(--gv-white);

        &::after {
          width: 100%;
        }
      }
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }

    .nav-cta-btn {
      padding: 0.7rem 1.4rem;
      font-size: 0.78rem;

      @media (max-width: 640px) {
        display: none;
      }
    }

    /* Hamburger Menu */
    .mobile-toggle {
      display: none;
      flex-direction: column;
      justify-content: space-between;
      width: 32px;
      height: 22px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      z-index: 1010;

      @media (max-width: 1024px) {
        display: flex;
      }
    }

    .hamburger-bar {
      width: 100%;
      height: 2.5px;
      background-color: var(--gv-white);
      border-radius: 2px;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

      &.open.top {
        transform: translateY(10px) rotate(45deg);
        background-color: var(--gv-red-500);
      }
      &.open.middle {
        opacity: 0;
        transform: translateX(-10px);
      }
      &.open.bottom {
        transform: translateY(-9.5px) rotate(-45deg);
        background-color: var(--gv-red-500);
      }
    }

    /* Mobile Drawer Backdrop */
    .mobile-drawer-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(4, 10, 20, 0.65);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      z-index: 1004;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 0.35s ease, visibility 0.35s ease;

      &.open {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }
    }

    /* Mobile Drawer */
    .mobile-drawer {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      max-width: min(380px, 85vw);
      height: 100vh;
      height: 100dvh;
      background: rgba(6, 18, 36, 0.98);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-left: 1px solid rgba(255, 255, 255, 0.1);
      z-index: 1005;
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      visibility: hidden;
      pointer-events: none;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.4s;
      box-shadow: -10px 0 30px rgba(0, 0, 0, 0.6);

      &.open {
        transform: translateX(0);
        visibility: visible;
        pointer-events: auto;
      }
    }

    .drawer-inner {
      padding: 6rem 2rem 2.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      overflow-y: auto;
    }

    .mobile-nav-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .mobile-nav-item {
      font-family: var(--font-brand);
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--gv-slate-200);
      text-decoration: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      transition: color 0.3s ease, padding-left 0.3s ease;

      .item-num {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: var(--gv-red-500);
        font-weight: 600;
      }

      &:hover {
        color: var(--gv-white);
        padding-left: 0.5rem;
      }
    }

    .mobile-drawer-footer {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .full-width {
        width: 100%;
      }

      .mobile-contact-info {
        font-size: 0.85rem;
        color: var(--gv-slate-400);
        line-height: 1.8;
      }
    }
  `]
})
export class NavbarComponent {
  isScrolled = false;
  mobileMenuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 40;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : 'auto';
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    document.body.style.overflow = 'auto';
  }

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  navigateAndClose(sectionId: string): void {
    this.closeMobileMenu();
    setTimeout(() => {
      this.scrollTo(sectionId);
    }, 200);
  }
}
