/* Vistas por hash (#principal, #informacion, #contacto) con indicador de menú animado */
(() => {
  const { $, $$ } = TA;
  TA.router = {
    ids: ['principal', 'informacion', 'contacto'],
    current: 'principal',
    init() {
      $$('[data-view-link]').forEach(el => el.addEventListener('click', e => {
        e.preventDefault();
        this.show(el.dataset.viewLink, true);
      }));
      addEventListener('hashchange', () => this.show(this.fromHash(), false));
      addEventListener('resize', () => this.moveIndicator());
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => this.moveIndicator());
      this.show(this.fromHash(), false, true);
    },
    fromHash() {
      const id = location.hash.slice(1);
      return this.ids.includes(id) ? id : 'principal';
    },
    show(id, push, first) {
      this.current = id;
      this.ids.forEach(v => { $('#' + v).hidden = v !== id; });
      document.body.dataset.view = id;
      $$('.nav-link').forEach(b => b.toggleAttribute('aria-current', b.dataset.viewLink === id));
      $$('.nav-link').forEach(b => { if (b.dataset.viewLink === id) b.setAttribute('aria-current', 'page'); });
      this.moveIndicator();
      if (push && location.hash.slice(1) !== id) history.pushState(null, '', '#' + id);
      if (!first) {
        scrollTo({ top: 0, behavior: 'smooth' });
        const h = $('#' + id + ' h1, #' + id + ' h2');
        if (h) h.focus({ preventScroll: true });
      }
      TA.tracker.track('view', { view: id });
    },
    moveIndicator() {
      const active = $('.nav-link[aria-current="page"]');
      const ind = $('.nav-ind');
      if (!active) return;
      const li = active.parentElement;
      ind.style.width = li.offsetWidth + 'px';
      ind.style.translate = li.offsetLeft + 'px 0';
    }
  };
})();
