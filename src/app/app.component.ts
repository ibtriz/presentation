import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent }      from './components/nav/nav.component';
import { HeroComponent }     from './components/hero/hero.component';
import { AboutComponent }    from './components/about/about.component';
import { StackComponent }    from './components/stack/stack.component';
import { RoadmapComponent }  from './components/roadmap/roadmap.component';
import { CertsComponent }    from './components/certs/certs.component';
import { ContactComponent }  from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    HeroComponent,
    AboutComponent,
    StackComponent,
    RoadmapComponent,
    CertsComponent,
    ContactComponent
  ],
  template: `
    <!-- Grid background -->
    <div class="grid-bg" aria-hidden="true"></div>

    <!-- Custom cursor -->
    <div class="cursor" [style.left.px]="cursorX" [style.top.px]="cursorY" aria-hidden="true"></div>
    <div class="cursor-trail" [style.left.px]="trailX" [style.top.px]="trailY" aria-hidden="true"></div>

    <app-nav></app-nav>

    <main>
      <app-hero></app-hero>
      <div class="glitch-divider" data-cy="divider"></div>

      <app-about></app-about>
      <div class="glitch-divider"></div>

      <app-stack></app-stack>
      <div class="glitch-divider"></div>

      <app-roadmap></app-roadmap>
      <div class="glitch-divider"></div>

      <app-certs></app-certs>
      <div class="glitch-divider"></div>

      <app-contact></app-contact>
    </main>

    <footer>
      <span>// ibtriz</span> · quality is not a phase. it's an architecture decision. · <span>SP, Brasil</span>
      <!-- se você chegou até aqui: a cobertura de testes da vida raramente inclui os edge cases. mas a gente testa mesmo assim. -->
    </footer>
  `,
  styles: [`
    :host { display: block; }

    .grid-bg {
      position: fixed; inset: 0;
      background-image:
        linear-gradient(rgba(116,168,253,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(116,168,253,0.03) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none; z-index: 0;
    }

    .cursor {
      width: 12px; height: 12px;
      border: 1px solid var(--neon-blue);
      border-radius: 50%;
      position: fixed; pointer-events: none; z-index: 9999;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      transition: width 0.2s, height 0.2s;
    }

    .cursor-trail {
      width: 4px; height: 4px;
      background: var(--neon-blue);
      border-radius: 50%;
      position: fixed; pointer-events: none; z-index: 9998;
      transform: translate(-50%, -50%);
      opacity: 0.6;
      transition: left 0.08s ease, top 0.08s ease;
    }

    main { position: relative; z-index: 1; }

    footer {
      text-align: center;
      padding: 32px 48px;
      border-top: 1px solid var(--border);
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.65rem;
      color: var(--text-dim);
      letter-spacing: 0.15em;
      position: relative; z-index: 1;

      span { color: var(--neon-blue); }
    }

    @media (max-width: 768px) {
      .cursor, .cursor-trail { display: none; }
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  cursorX = -100; cursorY = -100;
  trailX  = -100; trailY  = -100;
  private trailTimeout: ReturnType<typeof setTimeout> | null = null;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.cursorX = e.clientX;
    this.cursorY = e.clientY;
    if (this.trailTimeout) clearTimeout(this.trailTimeout);
    this.trailTimeout = setTimeout(() => {
      this.trailX = e.clientX;
      this.trailY = e.clientY;
    }, 80);
  }

  ngOnInit() {}
  ngOnDestroy() { if (this.trailTimeout) clearTimeout(this.trailTimeout); }
}
