/* Punto de entrada */
(() => {
  TA.theme.init();
  TA.tracker.init();
  TA.fx.init();
  TA.packages.init();
  TA.contact.init();
  TA.router.init();
  TA.tracker.watchScroll(() => TA.router.current);
  TA.tracker.track('page_view', { ref: document.referrer ? new URL(document.referrer).origin : '' });
})();
