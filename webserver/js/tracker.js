/* Rastreador de eventos propio: solo con consentimiento, respeta Do Not Track, sin datos personales */
(() => {
  const { $, config } = TA;
  const KEY = 'ta-consent';
  const read = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  const write = v => { try { localStorage.setItem(KEY, v); } catch (e) {} };

  TA.tracker = {
    consent: null,
    queue: [],
    sid: Math.random().toString(36).slice(2, 10),
    init() {
      const dnt = navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true;
      this.consent = dnt ? 'denied' : read();
      const box = $('#consent');
      const set = v => { this.consent = v; write(v); box.hidden = true; if (v === 'granted') this.track('consent', { v }); else this.queue = []; };
      $('#consent-yes').addEventListener('click', () => set('granted'));
      $('#consent-no').addEventListener('click', () => set('denied'));
      $('#privacy-prefs').addEventListener('click', () => { box.hidden = false; });
      if (!this.consent) box.hidden = false;
      document.addEventListener('visibilitychange', () => document.visibilityState === 'hidden' && this.flush());
    },
    track(name, props = {}) {
      if (this.consent !== 'granted') return;
      this.queue.push({ name, props, sid: this.sid, t: Date.now(), path: location.hash || '#principal' });
      if (config.debug) console.debug('[TA]', name, props);
      if (this.queue.length >= 10) this.flush();
    },
    flush() {
      if (!this.queue.length || !config.trackerEndpoint) return;
      const body = JSON.stringify(this.queue.splice(0));
      if (!(navigator.sendBeacon && navigator.sendBeacon(config.trackerEndpoint, body))) {
        fetch(config.trackerEndpoint, { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'application/json' } }).catch(() => {});
      }
    },
    /* Profundidad de scroll por vista: 25, 50, 75 y 100 % */
    watchScroll(getView) {
      let seen = new Set(), last = getView();
      addEventListener('scroll', () => {
        const v = getView();
        if (v !== last) { seen = new Set(); last = v; }
        const h = document.documentElement.scrollHeight - innerHeight;
        const pct = h > 0 ? Math.round(scrollY / h * 100) : 100;
        [25, 50, 75, 100].forEach(m => { if (pct >= m && !seen.has(m)) { seen.add(m); this.track('scroll', { view: v, depth: m }); } });
      }, { passive: true });
    }
  };
})();
