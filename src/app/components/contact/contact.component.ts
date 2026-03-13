import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="contact" data-cy="contact-section">
      <div class="reveal" #reveal>
        <p class="section-label">contact</p>
        <h2 class="section-title">let's connect</h2>
      </div>
      <div class="contact-grid" data-cy="contact-grid">
        <a
          *ngFor="let link of links; let i = index"
          [href]="link.url"
          target="_blank"
          rel="noopener"
          class="contact-card reveal"
          #reveal
          [style.transition-delay]="(i * 0.1) + 's'"
          [attr.data-cy]="'contact-' + link.id"
        >
          <span class="icon" [innerHTML]="link.icon"></span>
          {{ link.label }}
        </a>
      </div>
    </section>
  `,
  styles: [`
    section {
      padding: 100px 48px;
      max-width: 1200px; margin: 0 auto;
      text-align: center;
    }

    .sub {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.8rem; color: var(--text-dim); margin-top: 8px;
    }

    .contact-grid {
      display: flex; flex-wrap: wrap; justify-content: center; gap: 16px;
      margin-top: 48px;
    }

    .contact-card {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.75rem; letter-spacing: 0.1em;
      padding: 16px 28px;
      border: 1px solid var(--border);
      color: var(--neon-blue); text-decoration: none;
      text-transform: uppercase;
      background: rgba(116,168,253,0.04);
      clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
      transition: background 0.2s, box-shadow 0.2s, color 0.2s;
      display: flex; align-items: center; gap: 10px;
      cursor: none;

      &:hover { background: rgba(116,168,253,0.12); box-shadow: var(--glow); color: #fff; }
    }

    @media (max-width: 768px) { section { padding: 80px 24px; } }
  `]
})
export class ContactComponent implements OnInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  links = [
    {
      id: 'linkedin', label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/beatriz-francelino-borges-carneiro/',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
    },
    {
      id: 'github', label: 'GitHub',
      url: 'https://github.com/ibtriz',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
    },
    {
      id: 'hackerrank', label: 'HackerRank',
      url: 'https://www.hackerrank.com/profile/ibtriz',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12S13.287 24 12 24s-9.75-4.886-10.392-6c-.645-1.115-.645-10.885 0-12C2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v3.875H9.963V7.057c0-.143-.117-.258-.26-.258H8.055a.258.258 0 0 0-.258.258v9.886c0 .143.115.258.258.258H9.7c.144 0 .261-.115.261-.258v-4.017h4.074v4.017c0 .143.115.258.258.258h1.648a.258.258 0 0 0 .256-.258V7.057a.258.258 0 0 0-.256-.258h-1.646z"/></svg>`
    },
    {
      id: 'leetcode', label: 'LeetCode',
      url: 'https://leetcode.com/u/ibtriz/',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"/></svg>`
    },
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
