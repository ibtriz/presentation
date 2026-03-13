import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RoadItem { pct: number; name: string; desc: string; highlight?: boolean; }

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="roadmap" data-cy="roadmap-section">
      <div class="reveal" #reveal>
        <p class="section-label">sdet roadmap</p>
        <h2 class="section-title">currently building</h2>
      </div>
      <div class="roadmap-grid" data-cy="roadmap-grid">
        <div
          class="road-item reveal"
          #reveal
          *ngFor="let item of items; let i = index"
          [style.transition-delay]="(i * 0.1) + 's'"
          [attr.data-cy]="'roadmap-item-' + i"
        >
          <div class="road-bar-wrap">
            <span class="road-pct" [attr.data-cy]="'roadmap-pct-' + i">
              {{ item.highlight ? '★' : item.pct + '%' }}
            </span>
            <div class="road-bar">
              <div
                class="road-bar-fill"
                [class.highlight]="item.highlight"
                [style.height]="animatedHeights[i] + '%'"
              ></div>
            </div>
          </div>
          <div class="road-info">
            <p class="road-name">{{ item.name }}</p>
            <p class="road-desc" [innerHTML]="item.desc"></p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    section { padding: 100px 48px; max-width: 1200px; margin: 0 auto; }

    .roadmap-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 48px;
    }

    .road-item {
      background: rgba(8,8,18,0.8);
      border: 1px solid var(--border);
      padding: 24px 28px;
      display: flex; gap: 20px; align-items: flex-start;
      transition: border-color 0.3s;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%);
      &:hover { border-color: rgba(116,168,253,0.5); }
    }

    .road-bar-wrap {
      display: flex; flex-direction: column; gap: 6px; min-width: 50px; align-items: center;
    }

    .road-pct {
      font-family: 'Orbitron', monospace;
      font-size: 0.7rem; color: var(--neon-blue); font-weight: 700;
    }

    .road-bar {
      width: 6px; height: 80px;
      background: rgba(116,168,253,0.1);
      border: 1px solid var(--border);
      position: relative; overflow: hidden;
    }

    .road-bar-fill {
      position: absolute; bottom: 0; left: 0; right: 0;
      background: linear-gradient(to top, var(--neon-cyan), var(--neon-blue));
      transition: height 1s ease;
      box-shadow: 0 0 8px var(--neon-blue);

      &.highlight {
        background: linear-gradient(to top, #00d4ff, #74A8FD);
      }
    }

    .road-info { flex: 1; }

    .road-name {
      font-family: 'Rajdhani', sans-serif;
      font-size: 1rem; font-weight: 600; color: #fff; margin-bottom: 4px;
    }

    .road-desc {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.68rem; color: var(--text-dim); line-height: 1.6;
    }

    @media (max-width: 768px) {
      section { padding: 80px 24px; }
      .roadmap-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class RoadmapComponent implements OnInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  items: RoadItem[] = [
    { pct: 70, name: 'Contract Testing · Pact',     desc: 'consumer-driven contracts<br/>microserviços financeiros' },
    { pct: 55, name: 'Mutation Testing',             desc: 'PIT (Java) · mutmut (Python)<br/>qualidade da suíte, não só cobertura' },
    { pct: 45, name: 'Java para Automação',          desc: 'RestAssured · JUnit5<br/>arquitetura de frameworks' },
    { pct: 45, name: 'Pipeline Engineering',         desc: 'GitLab CI · GitHub Actions<br/>stages · paralelismo · cache' },
    { pct: 30, name: 'Cloud & DevOps',               desc: 'AWS · Terraform<br/>ambientes efêmeros de teste' },
    { pct: 100, name: 'Digital Bank Quality Platform', desc: 'projeto portfolio · end-to-end<br/>Java · Python · AWS · Terraform', highlight: true },
  ];

  animatedHeights: number[] = [];

  ngOnInit() {
    this.animatedHeights = this.items.map(() => 0);
    setTimeout(() => this.initObserver(), 100);
  }

  private initObserver() {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          // find index from data-cy
          const cy = (e.target as HTMLElement).getAttribute('data-cy') ?? '';
          const match = cy.match(/roadmap-item-(\d+)/);
          if (match) {
            const idx = parseInt(match[1]);
            setTimeout(() => { this.animatedHeights[idx] = this.items[idx].pct; }, 100);
          }
        }
      }),
      { threshold: 0.2 }
    );
    this.revealEls.forEach(el => obs.observe(el.nativeElement));
  }
}
