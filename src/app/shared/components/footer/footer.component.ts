import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GvLogoComponent } from '../gv-logo/gv-logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, GvLogoComponent],
  template: `
    <footer class="gv-footer architectural-grid">
      <div class="gv-container footer-container">
        <!-- Main Top Row -->
        <div class="footer-top">
          <!-- Col 1: Brand & Tagline -->
          <div class="footer-col brand-col">
            <app-gv-logo [compact]="false" [theme]="'dark'"></app-gv-logo>
            <p class="footer-brand-statement">
              GV Construction brings together engineering expertise, modern construction practices 
              and attention to detail to create spaces built for today and prepared for tomorrow.
            </p>
            <div class="footer-badge-row">
              <span class="trust-badge">ISO 9001:2015 CERTIFIED</span>
              <span class="trust-badge">LEED GREEN ACCREDITED</span>
            </div>
          </div>

          <!-- Col 2: Navigation Links -->
          <div class="footer-col links-col">
            <h4 class="footer-col-title">NAVIGATION</h4>
            <ul class="footer-link-list">
              <li><a (click)="scrollTo('hero')">Hero Overview</a></li>
              <li><a (click)="scrollTo('scroll-building')">Building Experience</a></li>
              <li><a (click)="scrollTo('about')">About GV Construction</a></li>
              <li><a (click)="scrollTo('services')">Core Capabilities</a></li>
              <li><a (click)="scrollTo('projects')">Featured Projects</a></li>
              <li><a (click)="scrollTo('process')">From Idea to Reality</a></li>
              <li><a (click)="scrollTo('contact')">Start a Project</a></li>
            </ul>
          </div>

          <!-- Col 3: Services -->
          <div class="footer-col services-col">
            <h4 class="footer-col-title">SERVICES</h4>
            <ul class="footer-link-list">
              <li><a (click)="scrollTo('services')">01 — Residential Construction</a></li>
              <li><a (click)="scrollTo('services')">02 — Commercial Construction</a></li>
              <li><a (click)="scrollTo('services')">03 — Industrial Construction</a></li>
              <li><a (click)="scrollTo('services')">04 — Renovation & Restoration</a></li>
              <li><a (click)="scrollTo('services')">05 — Turnkey Projects</a></li>
            </ul>
          </div>

          <!-- Col 4: Contact Coordinates -->
          <div class="footer-col contact-col">
            <h4 class="footer-col-title">HEADQUARTERS</h4>
            <div class="contact-details">
              <div class="contact-entry">
                <span class="entry-icon">📍</span>
                <div>
                  <strong>Chennai Headquarters</strong>
                  <p>Plot No. 42, Architectural Corridor, OMR, Chennai, Tamil Nadu — 600096, India</p>
                </div>
              </div>
              <div class="contact-entry">
                <span class="entry-icon">📞</span>
                <div>
                  <strong>Direct Inquiries</strong>
                  <p>+91 (044) 4892 1100 / +91 98765 43210</p>
                </div>
              </div>
              <div class="contact-entry">
                <span class="entry-icon">✉️</span>
                <div>
                  <strong>Email</strong>
                  <p>contact&#64;gvconstruction.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Divider -->
        <div class="footer-divider"></div>

        <!-- Bottom Row -->
        <div class="footer-bottom">
          <p class="copyright-text">
            © 2026 GV Construction. All Rights Reserved. Built on Vision. Driven by Precision.
          </p>

          <div class="social-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-btn" aria-label="LinkedIn">
              <span>LinkedIn</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener" class="social-btn" aria-label="Instagram">
              <span>Instagram</span>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener" class="social-btn" aria-label="Facebook">
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .gv-footer {
      background: var(--gv-navy-950);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding: 6rem 0 2.5rem;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 10%;
        width: 80%;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--gv-cyan-400), var(--gv-red-500), transparent);
      }
    }

    .footer-top {
      display: grid;
      grid-template-columns: 2fr 1.2fr 1.5fr 1.8fr;
      gap: 3.5rem;
      margin-bottom: 4rem;

      @media (max-width: 1200px) {
        grid-template-columns: 1fr 1fr;
        gap: 2.5rem;
      }

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
    }

    .brand-col {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .footer-brand-statement {
      font-size: 0.92rem;
      color: var(--gv-slate-400);
      line-height: 1.8;
      max-width: 360px;
    }

    .footer-badge-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .trust-badge {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--gv-cyan-400);
      background: rgba(0, 180, 216, 0.08);
      border: 1px solid rgba(0, 180, 216, 0.25);
      padding: 0.3rem 0.65rem;
      border-radius: 4px;
    }

    .footer-col-title {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: var(--gv-white);
      margin-bottom: 1.5rem;
      position: relative;
      padding-bottom: 0.5rem;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 24px;
        height: 2px;
        background: var(--gv-red-500);
      }
    }

    .footer-link-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;

      li a {
        font-size: 0.9rem;
        color: var(--gv-slate-400);
        text-decoration: none;
        cursor: pointer;
        transition: color 0.25s ease, transform 0.25s ease;
        display: inline-block;

        &:hover {
          color: var(--gv-white);
          transform: translateX(4px);
        }
      }
    }

    .contact-details {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .contact-entry {
      display: flex;
      gap: 0.85rem;
      font-size: 0.88rem;
      color: var(--gv-slate-300);

      strong {
        display: block;
        color: var(--gv-white);
        margin-bottom: 0.2rem;
        font-family: var(--font-mono);
        font-size: 0.78rem;
        letter-spacing: 0.05em;
      }

      p {
        color: var(--gv-slate-400);
        line-height: 1.5;
      }
    }

    .footer-divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.06);
      margin-bottom: 2rem;
    }

    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1.5rem;

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .copyright-text {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--gv-slate-500);
    }

    .social-links {
      display: flex;
      gap: 1rem;
    }

    .social-btn {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--gv-slate-400);
      text-decoration: none;
      padding: 0.35rem 0.85rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      transition: all 0.25s ease;

      &:hover {
        color: var(--gv-white);
        border-color: var(--gv-red-500);
        background: rgba(230, 57, 70, 0.1);
      }
    }
  `]
})
export class FooterComponent {
  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
