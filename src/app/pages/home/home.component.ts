import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { GvLogoComponent } from '../../shared/components/gv-logo/gv-logo.component';
import { ProjectModalComponent } from '../../shared/components/project-modal/project-modal.component';
import { ProjectDataService } from '../../core/services/project-data.service';
import { Project, ServiceItem, ProcessStep, StatItem, WhyFeature, TestimonialItem, ConstructionStage } from '../../core/models/project.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    GvLogoComponent,
    ProjectModalComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroVideo', { static: false }) heroVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('scrollTrack', { static: false }) scrollTrack!: ElementRef<HTMLDivElement>;
  @ViewChild('scrollVideo', { static: false }) scrollVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('aboutSection', { static: false }) aboutSection!: ElementRef<HTMLElement>;

  isHeroVideoPlaying = false;

  // Data arrays from service
  stages: ConstructionStage[] = [];
  stats: StatItem[] = [];
  services: ServiceItem[] = [];
  projects: Project[] = [];
  processSteps: ProcessStep[] = [];
  whyFeatures: WhyFeature[] = [];
  testimonials: TestimonialItem[] = [];

  // Active state
  selectedCategory = 'All';
  categories = ['All', 'Commercial', 'Residential', 'Industrial', 'Renovation', 'Turnkey'];
  selectedProject: Project | null = null;
  activeProcessStep = 0;

  // Scroll Video scrub state
  scrollProgress = 0;
  displayProgress = '00%';
  activeStage: ConstructionStage | null = null;
  isAssemblyMode = true; // true: foundation -> completion; false: exploded view
  isAutoPlaying = false;
  autoPlayTimer: any = null;

  private rafId: number | null = null;
  private targetVideoTime = 0;
  private currentVideoTime = 0;

  // Animated Stats
  statsAnimated = false;
  animatedStatValues: number[] = [0, 0, 0, 0];

  // Contact Form Model & WhatsApp Config
  whatsappNumber = '919876543210';
  lastWhatsappUrl = '';
  validationError = '';
  contactModel = {
    name: '',
    email: '',
    phone: '',
    projectType: 'Commercial',
    projectLocation: '',
    description: '',
    submitted: false
  };

  constructor(private projectData: ProjectDataService) {}

  ngOnInit(): void {
    this.stages = this.projectData.getConstructionStages();
    this.stats = this.projectData.getStats();
    this.services = this.projectData.getServices();
    this.projects = this.projectData.getProjects();
    this.processSteps = this.projectData.getProcessSteps();
    this.whyFeatures = this.projectData.getWhyFeatures();
    this.testimonials = this.projectData.getTestimonials();

    if (this.stages.length > 0) {
      this.activeStage = this.stages[0];
    }
  }

  ngAfterViewInit(): void {
    // Initialize hero video autoplay with fallback handling
    this.initHeroVideo();

    // Start RAF loop for smooth video scrubbing
    this.startVideoScrubLoop();
    this.initIntersectionObservers();
    
    // Initial sync
    setTimeout(() => {
      this.updateScrollVideoProgress();
    }, 150);
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.updateScrollVideoProgress();
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.updateScrollVideoProgress();
  }

  /**
   * Smoothly computes scroll progress across the #scroll-building section
   * and maps it to Video 2 current time with hardware-accelerated lerp
   */
  private updateScrollVideoProgress(): void {
    if (!this.scrollTrack || !this.scrollVideo || this.isAutoPlaying) return;

    const trackEl = this.scrollTrack.nativeElement;
    const video = this.scrollVideo.nativeElement;
    if (!video.duration || isNaN(video.duration)) return;

    const rect = trackEl.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollDist = rect.height - windowHeight;

    if (scrollDist <= 0) return;

    // Progress 0 to 1
    const rawProgress = -rect.top / scrollDist;
    const clampedProgress = Math.max(0, Math.min(1, rawProgress));

    this.scrollProgress = clampedProgress;
    this.displayProgress = Math.round(clampedProgress * 100).toString().padStart(2, '0') + '%';

    // Update active stage
    const percent = clampedProgress * 100;
    const matched = this.stages.find(s => percent >= s.percentRange[0] && percent <= s.percentRange[1]);
    if (matched) {
      this.activeStage = matched;
    } else if (percent >= 90) {
      this.activeStage = this.stages[this.stages.length - 1];
    }

    // Map progress to video target time
    // In video 2:
    // 0s is completed building, 10s is bare structure / foundation.
    // If assembly mode: 0% scroll = 9.8s (bare ground/structure) -> 100% scroll = 0s (completed building)!
    // If exploded mode: 0% scroll = 0s (completed) -> 100% scroll = 9.8s (exploded)!
    const duration = video.duration || 10;
    if (this.isAssemblyMode) {
      this.targetVideoTime = (1 - clampedProgress) * duration;
    } else {
      this.targetVideoTime = clampedProgress * duration;
    }
  }

  private startVideoScrubLoop(): void {
    const loop = () => {
      if (this.scrollVideo && !this.isAutoPlaying) {
        const video = this.scrollVideo.nativeElement;
        if (video.readyState >= 2) {
          // Lerp for buttery smooth frame interpolation
          const delta = this.targetVideoTime - video.currentTime;
          if (Math.abs(delta) > 0.02) {
            video.currentTime += delta * 0.18;
          }
        }
      }
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  toggleAssemblyMode(): void {
    this.isAssemblyMode = !this.isAssemblyMode;
    this.updateScrollVideoProgress();
  }

  toggleAutoDemo(): void {
    this.isAutoPlaying = !this.isAutoPlaying;
    if (this.isAutoPlaying) {
      if (this.scrollVideo) {
        const video = this.scrollVideo.nativeElement;
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    } else {
      if (this.scrollVideo) {
        this.scrollVideo.nativeElement.pause();
      }
      this.updateScrollVideoProgress();
    }
  }

  selectStage(stage: ConstructionStage): void {
    this.activeStage = stage;
    const targetProgress = (stage.percentRange[0] + stage.percentRange[1]) / 200;
    if (this.scrollTrack) {
      const trackEl = this.scrollTrack.nativeElement;
      const scrollDist = trackEl.scrollHeight - window.innerHeight;
      const targetScrollTop = trackEl.offsetTop + (targetProgress * scrollDist);
      window.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
    }
  }

  private initIntersectionObservers(): void {
    if (!this.aboutSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.statsAnimated) {
          this.animateCounters();
          this.statsAnimated = true;
        }
      });
    }, { threshold: 0.25 });

    observer.observe(this.aboutSection.nativeElement);
  }

  private animateCounters(): void {
    const duration = 2000;
    const frameRate = 30;
    const totalFrames = Math.round(duration / (1000 / frameRate));

    this.stats.forEach((stat, idx) => {
      let currentFrame = 0;
      const target = stat.value;
      const timer = setInterval(() => {
        currentFrame++;
        const progress = currentFrame / totalFrames;
        // Ease out quadratic
        const ease = 1 - (1 - progress) * (1 - progress);
        this.animatedStatValues[idx] = Math.round(target * ease);

        if (currentFrame >= totalFrames) {
          this.animatedStatValues[idx] = target;
          clearInterval(timer);
        }
      }, 1000 / frameRate);
    });
  }

  get filteredProjects(): Project[] {
    if (this.selectedCategory === 'All') return this.projects;
    return this.projects.filter(p => p.category === this.selectedCategory);
  }

  filterCategory(cat: string): void {
    this.selectedCategory = cat;
  }

  openProjectModal(proj: Project): void {
    this.selectedProject = proj;
  }

  closeProjectModal(): void {
    this.selectedProject = null;
  }

  handleModalConsult(proj: Project): void {
    this.closeProjectModal();
    this.contactModel.projectType = proj.category;
    this.contactModel.projectLocation = proj.location;
    this.contactModel.description = `Inquiry regarding developments similar to ${proj.name}.`;
    this.scrollTo('contact');
  }

  selectProcessStep(index: number): void {
    this.activeProcessStep = index;
  }

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  submitEnquiry(): void {
    this.validationError = '';

    if (!this.contactModel.name || !this.contactModel.name.trim()) {
      this.validationError = 'Please enter your name.';
      const nameInput = document.getElementById('name');
      if (nameInput) nameInput.focus();
      return;
    }

    // Construct formatted message for WhatsApp
    const lines: string[] = [
      '🏗️ *NEW PROJECT ENQUIRY — GV CONSTRUCTION*',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `👤 *Name:* ${this.contactModel.name.trim()}`
    ];

    if (this.contactModel.phone?.trim()) {
      lines.push(`📞 *Phone:* ${this.contactModel.phone.trim()}`);
    }
    if (this.contactModel.email?.trim()) {
      lines.push(`✉️ *Email:* ${this.contactModel.email.trim()}`);
    }
    lines.push(`🏢 *Project Type:* ${this.contactModel.projectType}`);
    if (this.contactModel.projectLocation?.trim()) {
      lines.push(`📍 *Location:* ${this.contactModel.projectLocation.trim()}`);
    }
    if (this.contactModel.description?.trim()) {
      lines.push(`📝 *Details:* ${this.contactModel.description.trim()}`);
    }

    const message = lines.join('\n');
    const encodedText = encodeURIComponent(message);
    this.lastWhatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodedText}`;

    // Mark as submitted to update confirmation state
    this.contactModel.submitted = true;

    // Open WhatsApp: try popup first, but if blocked, navigate directly
    if (typeof window !== 'undefined') {
      let popupOpened = false;
      try {
        const win = window.open(this.lastWhatsappUrl, '_blank');
        if (win && !win.closed && typeof win.closed !== 'undefined') {
          popupOpened = true;
        }
      } catch (e) {
        popupOpened = false;
      }

      // If popup blocker intervened or on mobile, redirect directly to WhatsApp
      if (!popupOpened) {
        window.location.href = this.lastWhatsappUrl;
      }
    }
  }

  resetContactForm(): void {
    this.validationError = '';
    this.lastWhatsappUrl = '';
    this.contactModel = {
      name: '',
      email: '',
      phone: '',
      projectType: 'Commercial',
      projectLocation: '',
      description: '',
      submitted: false
    };
  }

  /**
   * Initializes and ensures reliable playback of the hero background video.
   * Browsers require the DOM property video.muted = true (not just the HTML attribute)
   * to satisfy autoplay policies. Also provides fallback listeners for user gesture unlocking.
   */
  private initHeroVideo(): void {
    if (!this.heroVideo?.nativeElement) return;
    const video = this.heroVideo.nativeElement;

    // Explicitly set DOM properties to bypass browser autoplay restrictions
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const attemptPlay = () => {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isHeroVideoPlaying = true;
          })
          .catch((err) => {
            console.warn('Hero video autoplay blocked by browser policy; listening for interaction:', err);
            this.isHeroVideoPlaying = false;
            // Retry playback on first user gesture
            const unlockPlay = () => {
              video.muted = true;
              video.play().then(() => {
                this.isHeroVideoPlaying = true;
              }).catch(() => {});
              window.removeEventListener('click', unlockPlay);
              window.removeEventListener('touchstart', unlockPlay);
              window.removeEventListener('scroll', unlockPlay);
              window.removeEventListener('keydown', unlockPlay);
            };
            window.addEventListener('click', unlockPlay, { once: true, passive: true });
            window.addEventListener('touchstart', unlockPlay, { once: true, passive: true });
            window.addEventListener('scroll', unlockPlay, { once: true, passive: true });
            window.addEventListener('keydown', unlockPlay, { once: true, passive: true });
          });
      }
    };

    video.addEventListener('play', () => { this.isHeroVideoPlaying = true; });
    video.addEventListener('pause', () => { this.isHeroVideoPlaying = false; });
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      attemptPlay();
    });

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener('loadeddata', () => attemptPlay(), { once: true });
      attemptPlay();
    }
  }

  toggleHeroVideo(): void {
    if (!this.heroVideo?.nativeElement) return;
    const video = this.heroVideo.nativeElement;
    if (video.paused) {
      video.muted = true;
      video.play().then(() => {
        this.isHeroVideoPlaying = true;
      }).catch(err => console.error('Failed to play hero video:', err));
    } else {
      video.pause();
      this.isHeroVideoPlaying = false;
    }
  }
}
