/* Carrusel accesible de testimonios de demostración */
(() => {
  const root = document.querySelector('[data-testimonial-carousel]');
  if (!root) return;

  const slides = [...root.querySelectorAll('[data-testimonial-slide]')];
  const dots = [...root.querySelectorAll('[data-testimonial-dot]')];
  const progress = root.querySelector('[data-testimonial-progress]');
  const toggle = root.querySelector('[data-testimonial-toggle]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const interval = 7500;
  let current = 0;
  let timer;
  let paused = reducedMotion;
  let pointerInside = false;
  let focusInside = false;
  let announceTimer;

  function update(index, announce = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    dots.forEach((dot, i) => {
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    if (announce) {
      root.setAttribute('aria-live', 'polite');
      clearTimeout(announceTimer);
      announceTimer = setTimeout(() => root.setAttribute('aria-live', 'off'), 1800);
    }
  }

  function stopTimer() {
    clearTimeout(timer);
    progress.classList.remove('is-running');
  }

  function startTimer() {
    stopTimer();
    if (paused || pointerInside || focusInside) return;
    void progress.offsetWidth;
    progress.classList.add('is-running');
    timer = setTimeout(() => {
      update(current + 1);
      startTimer();
    }, interval);
  }

  function syncToggle() {
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Reanudar rotación automática' : 'Pausar rotación automática');
    root.classList.toggle('is-paused', paused);
  }

  root.querySelector('[data-testimonial-prev]').addEventListener('click', () => {
    update(current - 1, true);
    startTimer();
  });
  root.querySelector('[data-testimonial-next]').addEventListener('click', () => {
    update(current + 1, true);
    startTimer();
  });
  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    update(i, true);
    startTimer();
  }));
  toggle.addEventListener('click', () => {
    paused = !paused;
    syncToggle();
    startTimer();
  });
  root.addEventListener('pointerenter', () => {
    pointerInside = true;
    stopTimer();
  });
  root.addEventListener('pointerleave', () => {
    pointerInside = false;
    startTimer();
  });
  root.addEventListener('focusin', () => {
    focusInside = true;
    stopTimer();
  });
  root.addEventListener('focusout', event => {
    focusInside = root.contains(event.relatedTarget);
    if (!focusInside) startTimer();
  });

  syncToggle();
  startTimer();
})();
