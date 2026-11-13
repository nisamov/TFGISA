/* Espacio de nombres común y utilidades */
window.TA = {
  $: (s, c = document) => c.querySelector(s),
  $$: (s, c = document) => [...c.querySelectorAll(s)],
  /* Configuración: indique aquí su endpoint de analítica propio (HTTPS) */
  config: { trackerEndpoint: null, debug: false }
};
