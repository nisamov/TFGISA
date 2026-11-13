/* Tema, colores reactivos al cursor, foco de tarjetas, revelado y scroll */
(() => {
  const { $, $$ } = TA;
  const root = document.documentElement;

  TA.theme = {
    init() {
      try { const s = localStorage.getItem('ta-theme'); if (s) root.dataset.theme = s; } catch (e) {}
      $('#theme-toggle').addEventListener('click', () => {
        const cur = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        const next = cur === 'dark' ? 'light' : 'dark';
        root.dataset.theme = next;
        try { localStorage.setItem('ta-theme', next); } catch (e) {}
        TA.tracker.track('theme', { theme: next });
      });
    }
  };

  TA.fx = {
    init() {
      let raf = 0;
      document.addEventListener('pointermove', e => {
        const card = e.target.closest && e.target.closest('.card');
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty('--cx', (e.clientX - r.left) + 'px');
          card.style.setProperty('--cy', (e.clientY - r.top) + 'px');
        }
        if (raf) return;
        raf = requestAnimationFrame(() => {
          root.style.setProperty('--mx', (e.clientX / innerWidth).toFixed(3));
          root.style.setProperty('--my', (e.clientY / innerHeight).toFixed(3));
          raf = 0;
        });
      }, { passive: true });

      const header = $('.site-header');
      addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 8), { passive: true });

      const els = $$('.reveal');
      if (!('IntersectionObserver' in window)) return els.forEach(el => el.classList.add('in'));
      const io = new IntersectionObserver(entries => entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      }), { threshold: .12 });
      els.forEach(el => io.observe(el));

      $$('[data-scroll]').forEach(b => b.addEventListener('click', () => {
        $('#' + b.dataset.scroll).scrollIntoView({ behavior: 'smooth' });
        TA.tracker.track('cta', { target: b.dataset.scroll });
      }));
    }
  };
})();
