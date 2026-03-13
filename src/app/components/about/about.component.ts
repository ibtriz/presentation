import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" data-cy="about-section">
      <div class="reveal" #reveal data-cy="about-terminal">
        <p class="section-label">about</p>
        <h2 class="section-title">whoami</h2>
        <div class="terminal-block">
          <span class="t-key">"role"</span>: <span class="t-str">"QA Automation Engineer → SDET"</span>,<br/>
          <span class="t-key">"company"</span>: <span class="t-str">"Itaú Unibanco"</span>,<br/>
          <span class="t-key">"squad"</span>: <span class="t-str">"mobile · auth · digital security"</span>,<br/>
          <span class="t-key">"focus"</span>: [<span class="t-str">"mobile automation"</span>, <span class="t-str">"API reliability"</span>, <span class="t-str">"contract testing"</span>],<br/>
          <span class="t-key">"mindset"</span>: <span class="t-str">"quality is not a phase.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;it's an architecture decision."</span><br/>
          <br/>
          <span class="t-comment">// shift-left or shift regret.</span>
        </div>
      </div>

      <div class="reveal" #reveal style="transition-delay:0.2s" data-cy="about-mindset">
        <p class="section-label">mindset</p>
        <h2 class="section-title">o que me define</h2>
        <ul class="mindset-list">
          <li *ngFor="let item of mindset">
            <strong>{{ item.key }}</strong> — {{ item.value }}
          </li>
        </ul>
      </div>
    </section>
  `,
  styles: [`
    section {
      padding: 100px 48px;
      max-width: 1200px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;
    }

    .terminal-block {
      background: rgba(8,8,18,0.9);
      border: 1px solid var(--border);
      padding: 24px;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.78rem; line-height: 1.8; color: var(--text);
      clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));

      &::before {
        content: '● ● ●';
        display: block; color: var(--text-dim);
        font-size: 0.6rem; margin-bottom: 16px; letter-spacing: 4px;
      }
    }

    .t-key     { color: var(--neon-blue); }
    .t-str     { color: #90d4a0; }
    .t-comment { color: var(--text-dim); }

    .mindset-list {
      list-style: none;
      li {
        padding: 12px 0;
        border-bottom: 1px solid rgba(116,168,253,0.08);
        font-size: 1rem; font-weight: 300;
        display: flex; gap: 12px; align-items: flex-start;

        &::before { content: '◈'; color: var(--neon-blue); flex-shrink: 0; margin-top: 2px; }
        strong { color: var(--neon-blue); font-weight: 600; }
      }
    }

    @media (max-width: 768px) {
      section { grid-template-columns: 1fr; gap: 40px; padding: 80px 24px; }
    }
  `]
})
export class AboutComponent implements OnInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  mindset = [
    { key: 'Shift-left',         value: 'qualidade entra no design, não na homologação' },
    { key: 'Arquitetura primeiro', value: 'entendo o sistema antes de testar' },
    { key: 'Testes como código', value: 'manutenível, versionado, revisável' },
    { key: 'Cliente como critério', value: 'o aceite real é a experiência do usuário final' },
    { key: 'Observabilidade',    value: 'se não é monitorado, não é confiável' },
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
