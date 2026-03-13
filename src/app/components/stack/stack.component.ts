import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StackCategory { name: string; badges: string[]; }

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="stack" data-cy="stack-section">
      <div class="stack-header reveal" #reveal>
        <p class="section-label">tech stack</p>
        <h2 class="section-title">ferramentas & linguagens</h2>
      </div>
      <div class="stack-grid" data-cy="stack-grid">
        <div
          class="stack-category reveal"
          #reveal
          *ngFor="let cat of categories; let i = index"
          [style.transition-delay]="(i * 0.1) + 's'"
          [attr.data-cy]="'stack-cat-' + i"
        >
          <p class="cat-name">{{ cat.name }}</p>
          <div class="badge-list">
            <span class="badge" *ngFor="let b of cat.badges">{{ b }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    section { padding: 100px 48px; max-width: 1200px; margin: 0 auto; }
    .stack-header { margin-bottom: 56px; }

    .stack-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 2px;
    }

    .stack-category {
      background: rgba(8,8,18,0.8);
      border: 1px solid var(--border);
      padding: 28px;
      transition: border-color 0.3s, box-shadow 0.3s;
      position: relative; overflow: hidden;

      &::after {
        content: '';
        position: absolute; top: 0; left: 0;
        width: 3px; height: 100%;
        background: var(--neon-blue);
        transform: scaleY(0); transform-origin: top;
        transition: transform 0.3s;
      }

      &:hover { border-color: rgba(116,168,253,0.5); box-shadow: var(--glow); }
      &:hover::after { transform: scaleY(1); }
    }

    .cat-name {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.65rem; letter-spacing: 0.3em;
      color: var(--neon-cyan); text-transform: uppercase;
      margin-bottom: 16px;
    }

    .badge-list { display: flex; flex-wrap: wrap; gap: 6px; }

    .badge {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.65rem; padding: 4px 10px;
      background: rgba(116,168,253,0.07);
      border: 1px solid rgba(116,168,253,0.15);
      color: var(--pastel-blue);
      transition: background 0.2s, color 0.2s;
      &:hover { background: rgba(116,168,253,0.2); color: #fff; }
    }

    @media (max-width: 768px) { section { padding: 80px 24px; } }
  `]
})
export class StackComponent implements OnInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  categories: StackCategory[] = [
    { name: 'Automation',     badges: ['Robot Framework', 'Appium', 'pytest', 'Cypress', 'Selenium'] },
    { name: 'API & Contract', badges: ['Postman', 'Pact', 'Swagger', 'Cucumber', 'RestAssured'] },
    { name: 'CI/CD & DevOps', badges: ['GitLab CI/CD', 'GitHub Actions', 'Jenkins', 'Terraform', 'AWS'] },
    { name: 'Observability',  badges: ['Dynatrace', 'Datadog', 'Splunk'] },
    { name: 'Languages',      badges: ['Python', 'Java', 'JavaScript'] },
    { name: 'Methodologies',  badges: ['BDD / Gherkin', 'TDD', 'Shift-Left', 'Scrum', 'POM'] },
  ];

  ngOnInit() {
    setTimeout(() => this.initObserver(), 100);
  }

  private initObserver() {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    this.revealEls.forEach(el => obs.observe(el.nativeElement));
  }
}
