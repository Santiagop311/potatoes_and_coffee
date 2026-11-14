/* Galería sin dependencias: los enlaces siguen funcionando cuando JavaScript no está disponible. */
(() => {
  const section = document.querySelector('[data-pc-gallery]');
  if (!section) return;
  const rail = section.querySelector('[data-gallery-rail]');
  const cards = [...section.querySelectorAll('.pc-gallery-card')];
  const controls = section.querySelector('[data-gallery-controls]');
  const back = section.querySelector('[data-gallery-back]');
  const forward = section.querySelector('[data-gallery-forward]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!rail || !cards.length) return;

  const dialog = document.querySelector('#pc-gallery-lightbox');
  const AUTOPLAY_DELAY = 5000;
  const GESTURE_SETTLE = 1000;
  let autoplayTimer = null;
  let gestureTimer = null;
  let visible = false;
  let userPaused = reduceMotion.matches;
  let explicitPlaybackChoice = false;
  let keyboardMode = false;
  let keyboardPaused = false;
  let focusedPlaybackAllowed = false;
  let pointerActive = false;
  let gesturePaused = false;
  let programmaticUntil = 0;

  const playback = document.createElement('button');
  playback.type = 'button';
  playback.className = 'pc-gallery-control pc-gallery-autoplay';
  playback.dataset.galleryAutoplay = '';
  playback.setAttribute('aria-controls', rail.id);
  controls.insertBefore(playback, controls.querySelector('small'));
  function updatePlaybackButton() {
    const label = userPaused ? 'Reproducir galería automática' : 'Pausar galería automática';
    playback.setAttribute('aria-label', label);
    playback.title = label;
    playback.dataset.playing = String(!userPaused);
    playback.innerHTML = userPaused
      ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m6 3 11 7-11 7Z"/></svg>'
      : '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 3h4v14H4zm8 0h4v14h-4Z"/></svg>';
  }
  function canAutoplay() {
    return visible && !document.hidden && !userPaused && !keyboardPaused &&
      !pointerActive && !gesturePaused && !dialog?.open && rail.scrollWidth > rail.clientWidth + 2;
  }
  function scheduleAutoplay() {
    window.clearTimeout(autoplayTimer);
    autoplayTimer = null;
    if (!canAutoplay()) return;
    autoplayTimer = window.setTimeout(() => {
      autoplayTimer = null;
      if (!canAutoplay()) return;
      const atEnd = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 8;
      if (atEnd) scrollRailTo(0);
      else moveRail(1);
      scheduleAutoplay();
    }, AUTOPLAY_DELAY);
  }
  function updateRailControls() {
    back.disabled = rail.scrollLeft <= 2;
    forward.disabled = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2;
  }
  function scrollRailTo(left) {
    // Scrolls we start must not look like a continuous stream of manual gestures.
    programmaticUntil = performance.now() + 1500;
    rail.scrollTo({left, behavior: reduceMotion.matches ? 'instant' : 'smooth'});
  }
  function moveRail(direction) {
    const current = rail.scrollLeft;
    const points = cards.map(card => card.offsetLeft - cards[0].offsetLeft);
    const target = direction > 0
      ? points.find(point => point > current + 12) ?? rail.scrollWidth - rail.clientWidth
      : [...points].reverse().find(point => point < current - 12) ?? 0;
    scrollRailTo(target);
  }
  function settleGesture() {
    window.clearTimeout(gestureTimer);
    gestureTimer = null;
    if (pointerActive) return;
    gestureTimer = window.setTimeout(() => {
      gestureTimer = null;
      gesturePaused = false;
      scheduleAutoplay();
    }, GESTURE_SETTLE);
  }
  function holdForGesture() {
    gesturePaused = true;
    scheduleAutoplay();
    settleGesture();
  }
  back.addEventListener('click', () => { moveRail(-1); holdForGesture(); });
  forward.addEventListener('click', () => { moveRail(1); holdForGesture(); });
  playback.addEventListener('click', () => {
    userPaused = !userPaused;
    explicitPlaybackChoice = true;
    // An explicit Play command works while its control has focus, even under the pointer.
    focusedPlaybackAllowed = !userPaused;
    if (!userPaused) keyboardPaused = false;
    updatePlaybackButton();
    scheduleAutoplay();
  });
  controls.hidden = false;
  updatePlaybackButton();
  rail.addEventListener('scroll', () => {
    updateRailControls();
    if (performance.now() >= programmaticUntil) holdForGesture();
  }, {passive: true});
  rail.addEventListener('wheel', () => {
    programmaticUntil = 0;
    holdForGesture();
  }, {passive: true});
  rail.addEventListener('pointerdown', () => {
    pointerActive = true;
    programmaticUntil = 0;
    holdForGesture();
  }, {passive: true});
  function finishPointer() {
    if (!pointerActive) return;
    pointerActive = false;
    settleGesture();
  }
  window.addEventListener('pointerup', finishPointer, {passive: true});
  window.addEventListener('pointercancel', finishPointer, {passive: true});
  document.addEventListener('keydown', event => {
    if (!['Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) return;
    keyboardMode = true;
    focusedPlaybackAllowed = false;
    keyboardPaused = section.contains(document.activeElement);
    scheduleAutoplay();
  });
  document.addEventListener('pointerdown', () => {
    keyboardMode = false;
    keyboardPaused = false;
    focusedPlaybackAllowed = false;
    scheduleAutoplay();
  }, {passive: true});
  section.addEventListener('focusin', () => {
    if (keyboardMode && !focusedPlaybackAllowed) keyboardPaused = true;
    scheduleAutoplay();
  });
  section.addEventListener('focusout', () => {
    queueMicrotask(() => {
      if (!section.contains(document.activeElement)) {
        keyboardPaused = false;
        focusedPlaybackAllowed = false;
      }
      scheduleAutoplay();
    });
  });
  document.addEventListener('visibilitychange', scheduleAutoplay);
  function motionPreferenceChanged() {
    if (!explicitPlaybackChoice) userPaused = reduceMotion.matches;
    updatePlaybackButton();
    scheduleAutoplay();
  }
  if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', motionPreferenceChanged);
  else reduceMotion.addListener(motionPreferenceChanged);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      const nextVisible = entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .1);
      if (visible === nextVisible) return;
      visible = nextVisible;
      scheduleAutoplay();
    }, {threshold: [0, .1]}).observe(rail);
  } else {
    visible = true;
  }
  const resize = () => { updateRailControls(); scheduleAutoplay(); };
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(rail);
  else window.addEventListener('resize', resize);
  updateRailControls();
  scheduleAutoplay();

  if (!dialog || typeof dialog.showModal !== 'function') return;
  const links = [...rail.querySelectorAll('[data-gallery-open]')];
  const photo = dialog.querySelector('[data-lightbox-image]');
  const title = dialog.querySelector('[data-lightbox-title]');
  const description = dialog.querySelector('[data-lightbox-description]');
  const counter = dialog.querySelector('[data-lightbox-count]');
  const close = dialog.querySelector('[data-lightbox-close]');
  let currentIndex = 0;
  let returnFocus = null;
  let previousBodyOverflow = '';
  function renderPhoto(index) {
    currentIndex = (index + links.length) % links.length;
    const link = links[currentIndex];
    const img = link.querySelector('img');
    photo.src = link.href;
    photo.alt = img.alt;
    photo.width = Number(img.getAttribute('width')) || img.naturalWidth;
    photo.height = Number(img.getAttribute('height')) || img.naturalHeight;
    title.textContent = link.dataset.galleryTitle;
    description.textContent = link.dataset.galleryDescription;
    counter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(links.length).padStart(2, '0')}`;
  }
  links.forEach((link, index) => link.addEventListener('click', event => {
    // Conserva la apertura en otra pestaña solicitada con teclado o botón secundario.
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    returnFocus = link;
    renderPhoto(index);
    previousBodyOverflow = document.body.style.overflow;
    dialog.showModal();
    scheduleAutoplay();
    document.body.style.overflow = 'hidden';
    close.focus();
  }));
  close.addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-lightbox-back]').addEventListener('click', () => renderPhoto(currentIndex - 1));
  dialog.querySelector('[data-lightbox-forward]').addEventListener('click', () => renderPhoto(currentIndex + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {event.preventDefault(); renderPhoto(currentIndex - 1);}
    if (event.key === 'ArrowRight') {event.preventDefault(); renderPhoto(currentIndex + 1);}
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousBodyOverflow;
    if (returnFocus && returnFocus.isConnected) returnFocus.focus({preventScroll:true});
    scheduleAutoplay();
  });
})();
