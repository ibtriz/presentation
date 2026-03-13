import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" data-cy="hero-section">
      <div class="hero-content">
        <p class="hero-tag" data-cy="hero-tag">QA Automation Engineer · SP, Brasil</p>

        <h1 class="hero-name" data-cy="hero-name">
          Be<span class="accent">.</span>
        </h1>

        <p class="hero-title" data-cy="hero-title">
          <span class="typed" data-cy="hero-typed">{{ displayedText }}<span class="blink">_</span></span>
        </p>

        <p class="hero-bio" data-cy="hero-bio">
          Trabalho na interseção entre automação, arquitetura de testes e confiabilidade
          em sistemas financeiros de alta criticidade.<br/>
        </p>

        <div class="hero-pills" data-cy="hero-pills">
          <span class="pill" *ngFor="let pill of pills">{{ pill }}</span>
        </div>

        <div class="hero-cta">
          <a href="#contact" class="btn-primary" data-cy="cta-connect">connect</a>
          <a href="#stack"   class="btn-ghost"   data-cy="cta-stack">view stack</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    section {
      min-height: 100vh;
      display: flex; align-items: center;
      padding: 120px 48px 80px;
      max-width: 1200px; margin: 0 auto;
    }

    .hero-content { max-width: 700px; }

    .hero-tag {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.7rem; color: var(--neon-cyan);
      letter-spacing: 0.3em; text-transform: uppercase;
      margin-bottom: 16px;
      animation: fadeUp 0.6s 0.2s both;
      &::before { content: '> '; color: var(--text-dim); }
    }

    .hero-name {
      font-family: 'Orbitron', monospace;
      font-size: clamp(3rem, 8vw, 6rem);
      font-weight: 900; line-height: 1; color: #fff;
      margin-bottom: 8px;
      animation: fadeUp 0.6s 0.4s both;
      .accent { color: var(--neon-blue); text-shadow: var(--glow-strong); }
    }

    .hero-title {
      font-family: 'Share Tech Mono', monospace;
      font-size: clamp(0.85rem, 2vw, 1.1rem);
      color: var(--pastel-blue); letter-spacing: 0.1em;
      margin-bottom: 32px; min-height: 1.6em;
      animation: fadeUp 0.6s 0.6s both;
    }

    .blink { animation: blink 1s infinite; }

    .hero-bio {
      font-size: 1.1rem; font-weight: 300;
      color: var(--text); line-height: 1.7;
      margin-bottom: 24px;
      border-left: 2px solid var(--neon-blue);
      padding-left: 20px;
      animation: fadeUp 0.6s 0.8s both;
      .comment { color: var(--text-dim); font-style: italic; }
    }

    .hero-pills {
      display: flex; flex-wrap: wrap; gap: 8px;
      margin-bottom: 40px;
      animation: fadeUp 0.6s 1s both;
    }

    .pill {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.7rem; letter-spacing: 0.1em;
      padding: 5px 12px;
      border: 1px solid var(--border);
      color: var(--neon-blue);
      background: rgba(116,168,253,0.05);
      clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
      transition: background 0.2s, box-shadow 0.2s;
      &:hover { background: rgba(116,168,253,0.15); box-shadow: var(--glow); }
    }

    .hero-cta {
      display: flex; gap: 16px; flex-wrap: wrap;
      animation: fadeUp 0.6s 1.2s both;
    }

    @media (max-width: 768px) {
      section { padding: 100px 24px 60px; }
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  pills = ['shift-left testing', 'mobile automation', 'contract testing', 'CI/CD pipelines', 'observability', 'financial systems'];

  private lines = [
    'QA Automation Engineer',
    'Software Developer in Test',
    'shift left Testing advocate',
    'quality is architecture',
  ];

  displayedText = '';
  private lineIdx  = 0;
  private charIdx  = 0;
  private deleting = false;
  private timer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit() { this.tick(); }
  ngOnDestroy() { if (this.timer) clearTimeout(this.timer); }

  private tick() {
    const current = this.lines[this.lineIdx];

    if (!this.deleting) {
      this.displayedText = current.slice(0, ++this.charIdx);
      if (this.charIdx === current.length) {
        this.deleting = true;
        this.timer = setTimeout(() => this.tick(), 2000);
        return;
      }
    } else {
      this.displayedText = current.slice(0, --this.charIdx);
      if (this.charIdx === 0) {
        this.deleting = false;
        this.lineIdx  = (this.lineIdx + 1) % this.lines.length;
      }
    }

    this.timer = setTimeout(() => this.tick(), this.deleting ? 40 : 80);
  }
}
