/* Paquetes de auditoría: acordeón accesible, alcance y solicitud de presupuesto */
(() => {
  const { $, $$ } = TA;
  TA.packages = {
    state: {},
    init() {
      $$('[data-package]').forEach(card => {
        const btn = $('[data-toggle]', card);
        btn.addEventListener('click', () => this.toggle(card, btn));
        $$('input[type=radio]', card).forEach(r => r.addEventListener('change', () => this.select(card, r.value)));
        $('[data-request]', card).addEventListener('click', () => this.request(card));
      });
    },
    toggle(card, btn) {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      $('.panel', card).classList.toggle('is-open', open);
      card.classList.toggle('is-open', open);
      TA.tracker.track('package_toggle', { pkg: card.dataset.package, open });
    },
    select(card, scope) {
      const key = card.dataset.package;
      this.state[key] = scope;
      const s = $('.summary', card);
      s.innerHTML = `Paquete <strong>${card.dataset.label}</strong> · alcance: <strong>${scope}</strong>`;
      s.classList.add('is-visible');
      $('[data-request]', card).hidden = false;
      TA.tracker.track('scope_select', { pkg: key, scope });
    },
    request(card) {
      const key = card.dataset.package;
      TA.contact.prefill(`Estoy interesado en la auditoría de entornos ${card.dataset.label} con alcance: ${this.state[key]}.\n\n`);
      TA.tracker.track('quote_request', { pkg: key, scope: this.state[key] });
      TA.router.show('contacto', true);
    }
  };
})();
