(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hero = document.querySelector('.hero-experience');
  const slides = [
    { eyebrow:'LA ESPECIALIDAD DE LA CASA',one:'CARNE.',two:'¡CARNE!',description:'Hay empanadas. Y están las nuestras: doraditas, llenas de carne y listas para resolver ese antojo.',cta:'Conoce las consentidas',href:'#especialidad',label:'NUESTRAS EMPANADAS, TAL CUAL.' },
    { eyebrow:'PARA EL HAMBRE CON GANAS',one:'PAPAS',two:'CON TODO.',description:'Carnes desmechadas, queso fundido y papas que vienen en serio. La Salchipapota ya te está haciendo ojitos.',cta:'Encuentra tus favoritas',href:'#carta',label:'LA SALCHIPAPOTA. SIN FILTROS.' },
    { eyebrow:'CUANDO EL ANTOJO PIDE MÁS',one:'CERO',two:'TIMIDEZ.',description:'La despeinada súper mixta: arepa, carnes, chorizo y queso fundido. Un plato con toda la personalidad de la casa.',cta:'Explora todo el sabor',href:'#carta',label:'LA DESPEINADA SÚPER MIXTA.' },
    { eyebrow:'EL SABOR TAMBIÉN ES EL PLAN',one:'AQUÍ',two:'SE PARCHA.',description:'Buena comida, buena compañía y una mesa que te espera. Nos vemos en Papas y Café, Ciudad Boquía.',cta:'Conoce nuestro lugar',href:'#galeria',label:'ESTE ES TU PRÓXIMO PUNTO DE ENCUENTRO.' }
  ];
  const selectors = [...hero.querySelectorAll('[data-slide]')];
  const pause = hero.querySelector('.hero-pause');
  const copy = hero.querySelector('.hero-story');
  const intervalMs = 5000;
  let current = 0;
  let timer;
  let userPaused = reducedMotion.matches;
  let keyboardFocus = false;
  let inputWasKeyboard = false;
  let visible = true;
  function fitHeroTitle() {
    const title = document.querySelector('#hero-title');
    title.style.fontSize = '';
    const available = copy.clientWidth;
    const widest = Math.max(document.querySelector('#hero-line-one').getBoundingClientRect().width,document.querySelector('#hero-line-two').getBoundingClientRect().width);
    if (widest > available) title.style.fontSize = `${parseFloat(getComputedStyle(title).fontSize) * available / widest * .99}px`;
  }
  function shouldPause() { return userPaused || keyboardFocus || !visible || document.hidden; }
  function syncPlayback() {
    clearTimeout(timer);
    const paused = shouldPause();
    hero.classList.toggle('is-paused',paused);
    pause.setAttribute('aria-pressed',String(userPaused));
    pause.setAttribute('aria-label',userPaused ? 'Reproducir carrusel' : 'Pausar carrusel');
    pause.firstElementChild.textContent = userPaused ? '▷' : 'Ⅱ';
    if (!paused) {
      hero.classList.add('is-resetting');
      void hero.offsetWidth;
      hero.classList.remove('is-resetting');
      timer = setTimeout(() => showSlide(current + 1),intervalMs);
    }
  }
  function showSlide(index, manual = false) {
    current = (index + slides.length) % slides.length;
    const slide = slides[current];
    hero.querySelectorAll('[data-hero-image]').forEach((image,index) => image.classList.toggle('is-active',index === current));
    selectors.forEach((button,index) => {
      button.classList.toggle('is-active',index === current);
      button.setAttribute('aria-pressed',String(index === current));
    });
    document.querySelector('#hero-eyebrow').textContent = slide.eyebrow;
    document.querySelector('#hero-line-one').textContent = slide.one;
    document.querySelector('#hero-line-two').textContent = slide.two;
    document.querySelector('#hero-description').textContent = slide.description;
    document.querySelector('#hero-cta-text').textContent = slide.cta;
    document.querySelector('#hero-cta').href = slide.href;
    document.querySelector('#hero-photo-label').textContent = slide.label;
    fitHeroTitle();
    copy.classList.remove('is-changing');
    void copy.offsetWidth;
    copy.classList.add('is-changing');
    if (manual) {
      document.querySelector('#hero-status').textContent = `Foto ${current + 1} de ${slides.length}: ${slide.label}`;
    }
    syncPlayback();
  }
  hero.querySelector('.hero-controls').hidden = false;
  selectors.forEach(button => button.addEventListener('click',() => showSlide(Number(button.dataset.slide),true)));
  hero.querySelector('.hero-previous').addEventListener('click',() => showSlide(current - 1,true));
  hero.querySelector('.hero-next').addEventListener('click',() => showSlide(current + 1,true));
  pause.addEventListener('click',() => {
    userPaused = !userPaused;
    // Reproducir explícitamente funciona aunque el control conserve el foco.
    if (!userPaused) keyboardFocus = false;
    syncPlayback();
  });
  document.addEventListener('keydown',event => {
    if (event.key === 'Tab') inputWasKeyboard = true;
  },true);
  document.addEventListener('pointerdown',() => {
    inputWasKeyboard = false;
    if (keyboardFocus) { keyboardFocus = false; syncPlayback(); }
  },true);
  hero.addEventListener('focusin',() => { keyboardFocus = inputWasKeyboard; syncPlayback(); });
  hero.addEventListener('focusout',event => {
    if (!hero.contains(event.relatedTarget)) { keyboardFocus = false; syncPlayback(); }
  });
  document.addEventListener('visibilitychange',syncPlayback);
  reducedMotion.addEventListener('change',() => { userPaused = reducedMotion.matches; syncPlayback(); });
  let pointerStart;
  hero.addEventListener('pointerdown',event => {
    if (event.pointerType !== 'mouse' && !event.target.closest('a,button')) pointerStart = {x:event.clientX,y:event.clientY};
  });
  hero.addEventListener('pointerup',event => {
    if (!pointerStart) return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    pointerStart = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) showSlide(current + (dx < 0 ? 1 : -1),true);
  });
  hero.addEventListener('pointercancel',() => { pointerStart = null; });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; syncPlayback(); },{threshold:.15}).observe(hero);
    const floatingContact = document.querySelector('.floating-whatsapp');
    new IntersectionObserver(entries => {
      floatingContact.classList.toggle('is-over-hero',entries[0].isIntersecting);
    }).observe(hero);
    if (!reducedMotion.matches) {
      const reveal = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
        });
      },{threshold:.12});
      document.querySelectorAll('[data-reveal]').forEach(element => reveal.observe(element));
      document.documentElement.classList.add('motion-ready');
    }
  }
  syncPlayback();
  let scheduled = false;
  const progress = document.querySelector('.reading-progress');
  const links = [...document.querySelectorAll('.nav a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  function updateScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1,scrollY / max) : 0})`;
    let active = '';
    for (const section of sections) if (section.getBoundingClientRect().top <= 160) active = `#${section.id}`;
    links.forEach(link => {
      const current = link.getAttribute('href') === active;
      link.classList.toggle('is-current',current);
      if (current) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  }
  window.addEventListener('scroll',() => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } },{passive:true});
  window.addEventListener('resize',updateScroll);
  window.addEventListener('resize',fitHeroTitle);
  document.fonts.ready.then(fitHeroTitle);
  updateScroll();
})();
