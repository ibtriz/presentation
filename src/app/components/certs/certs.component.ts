import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Cert { status: 'done' | 'active' | 'pending'; label: string; name: string; tag: string; tagClass?: string; }

@Component({
  selector: 'app-certs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="certs" data-cy="certs-section">
      <div class="reveal" #reveal>
        <p class="section-label">certifications</p>
        <h2 class="section-title">roadmap de certificações</h2>
      </div>
      <div class="cert-list" data-cy="cert-list">
        <div
          class="cert-item reveal"
          #reveal
          *ngFor="let cert of certs; let i = index"
          [style.transition-delay]="(i * 0.1) + 's'"
          [attr.data-cy]="'cert-item-' + i"
        >
          <span class="cert-status" [ngClass]="cert.status" [attr.data-cy]="'cert-status-' + i">
            {{ cert.label }}
          </span>
          <span class="cert-name">{{ cert.name }}</span>
          <span class="cert-tag" [class.current]="cert.tagClass === 'current'">{{ cert.tag }}</span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    section { padding: 100px 48px; max-width: 1200px; margin: 0 auto; }

    .cert-list { display: flex; flex-direction: column; gap: 2px; margin-top: 48px; }

    .cert-item {
      display: flex; align-items: center; gap: 20px;
      padding: 16px 24px;
      border: 1px solid var(--border);
      background: rgba(8,8,18,0.6);
      transition: border-color 0.3s;
      &:hover { border-color: rgba(116,168,253,0.4); }
    }

    .cert-status {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.7rem; width: 80px; flex-shrink: 0;
      &.done    { color: var(--neon-cyan); }
      &.active  { color: var(--neon-blue); }
      &.pending { color: var(--text-dim); }
    }

    .cert-name { font-size: 0.95rem; font-weight: 600; color: var(--text); flex: 1; }

    .cert-tag {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.6rem; padding: 3px 8px;
      border: 1px solid var(--border); color: var(--text-dim);
      &.current { border-color: var(--neon-blue); color: var(--neon-blue); }
    }

    @media (max-width: 768px) { section { padding: 80px 24px; } }
  `]
})
export class CertsComponent implements OnInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  certs: Cert[] = [
    { status: 'done',    label: '✓ done',  name: 'GitHub Foundations',              tag: '2025' },
    { status: 'active',  label: '◉ now',   name: 'AWS Cloud Practitioner',                 tag: 'in progress', tagClass: 'current' },
    { status: 'pending', label: '◌ next',  name: 'ISTQB CTFL v4.0',           tag: 'queued' },
    { status: 'pending', label: '◌ —',     name: 'ISTQB CTAL-TAE',                  tag: 'queued' },
    { status: 'pending', label: '◌ —',     name: 'AWS AI Practitioner', tag: 'queued' },
        { status: 'pending', label: '◌ —',     name: 'AWS Solutions Architect Associate', tag: 'queued' },
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
