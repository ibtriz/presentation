import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav data-cy="nav">
      <div class="nav-logo" data-cy="nav-logo">ibtriz<span>.exe</span></div>
      <ul class="nav-links">
        <li><a href="#about"   data-cy="nav-about">about</a></li>
        <li><a href="#stack"   data-cy="nav-stack">stack</a></li>
        <li><a href="#roadmap" data-cy="nav-roadmap">roadmap</a></li>
        <li><a href="#certs"   data-cy="nav-certs">certs</a></li>
        <li><a href="#contact" data-cy="nav-contact">contact</a></li>
      </ul>
    </nav>
  `,
  styles: [`
    nav {
      position: fixed; top: 0; width: 100%; z-index: 100;
      padding: 16px 48px;
      display: flex; justify-content: space-between; align-items: center;
      background: rgba(4,4,10,0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
    }

    .nav-logo {
      font-family: 'Orbitron', monospace;
      font-size: 1rem; font-weight: 700;
      color: var(--neon-blue);
      letter-spacing: 0.2em;
      text-shadow: var(--glow);
      span { color: var(--text-dim); }
    }

    .nav-links {
      display: flex; gap: 32px; list-style: none;
      a {
        font-family: 'Share Tech Mono', monospace;
        font-size: 0.75rem; color: var(--text-dim);
        text-decoration: none; letter-spacing: 0.15em;
        text-transform: uppercase;
        transition: color 0.2s, text-shadow 0.2s;
        cursor: none;
        &:hover { color: var(--neon-blue); text-shadow: var(--glow); }
      }
    }

    @media (max-width: 768px) {
      nav { padding: 16px 24px; }
      .nav-links { display: none; }
    }
  `]
})
export class NavComponent {}
