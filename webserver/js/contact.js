/* Formulario de contacto: validación, antispam por honeypot y feedback (sin datos personales en analítica) */
(() => {
  const { $ } = TA;
  TA.contact = {
    init() {
      this.form = $('#form-contacto');
      this.status = $('.form-status', this.form);
      this.form.addEventListener('submit', e => {
        e.preventDefault();
        if (this.form.web.value) return; // honeypot: bots
        if (!this.form.checkValidity()) return this.form.reportValidity();
        /* TODO producción: enviar this.form a su backend o servicio de correo */
        this.form.reset();
        this.status.textContent = 'Gracias, hemos recibido su solicitud. Le responderemos en breve.';
        TA.tracker.track('form_submit', { ok: true });
      });
    },
    prefill(text) { $('#mensaje').value = text; this.status.textContent = ''; }
  };
})();
