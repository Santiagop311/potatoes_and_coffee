/* Escenas de producto: el catálogo mantiene los datos, cada sección mantiene su recorrido. */
(() => {
  'use strict';
  const catalog = window.PapasCatalog;
  const hero = document.querySelector('.hero-experience');
  if (!catalog || !hero) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = navigator.connection?.saveData === true;
  const quietMotion = () => reduce.matches || saveData;
  const products = catalog.products;
  const findProduct = id => products.find(product => product.id === id);
  const runway = hero.querySelector('.hero-runway') || hero;
  const stage = hero.querySelector('.hero-stage') || hero;
  const heroPhoto = document.querySelector('#hero-product-image');
  const heroButton = document.querySelector('#hero-product-button');
  const heroAdd = document.querySelector('#hero-cta');
  const heroIngredients = document.querySelector('#hero-ingredients');
  const scenes = [
    {id:'empanada-carne', art:'empanada', eyebrow:'LAS CONSENTIDAS DE LA CASA', one:'POR FUERA,', two:'DORADITAS.', note:'COP · POR UNIDAD', caption:'POQUITO CUENTO.\nMUCHO RELLENO.'},
    {id:'salchipapota', art:'salchipapota', eyebrow:'PARA EL HAMBRE CON GANAS', one:'PAPAS', two:'CON TODO.', note:'COP · DESDE 250 G', caption:'MUCHAS GANAS.\nCERO TIMIDEZ.'},
    {id:'pataconsote', art:'pataconsote', eyebrow:'UN CLÁSICO A LO GRANDE', one:'SEÑOR', two:'PATACÓN.', note:'COP · POR PORCIÓN', caption:'EL CROCANTE\nTIENE SU PARCHE.'},
    {id:'chimichanga', art:'chimichanga', eyebrow:'DORADA. RELLENA. IRRESISTIBLE.', one:'UNA', two:'CHIMICHANGA.', note:'COP · POR PORCIÓN', caption:'DORADITA.\nBIEN RELLENA.'},
    {id:'despeinada', art:'despeinada', eyebrow:'CON TODO EL SABOR DE LA CASA', one:'LA', two:'DESPEINADA.', note:'COP · POR PORCIÓN', caption:'AREPA, CARNES\nY MUCHO QUESO.'}
  ];
  // Los descriptores reflejan el ancho exportado, sin atribuir detalle a una ampliación.
  const highWidths = {empanada:1536,salchipapota:1396,pataconsote:1920,chimichanga:1920,despeinada:1920,pataconada:1920,santarosanos:1920,'super-mixta':1920,choripapa:1920,'salchipapa-tradicional':1920};
  const piecesById = {
    'empanada-carne':['maiz','carne'],
    salchipapota:['papas','maiz'],
    chimichanga:['papas','maiz'],
    pataconsote:['queso','maiz'],
    despeinada:['queso','maiz']
  };
  let heroIndex = -1;
  let step = 250;
  let heroStart = 0;
  let heroEnd = 0;
  let frame = 0;
  let animationFrame = 0;
  let imageVersion = 0;
  let activeScrollTarget = null;
  const familyControllers = [];
  const text = (selector, value, scope = document) => { const node = scope.querySelector(selector); if (node) node.textContent = value; };
  const applyTheme = (element,id) => catalog.applyTheme(element,id);
  function fullName(product) { return product.fullName || product.name; }
  function productPrice(product) { return product.price || 'Consulta el precio'; }
  function originalImage(product) { return product.image ? `./assets/${product.image}` : ''; }
  function addProduct(id, trigger) {
    const product = findProduct(id);
    if (!product) return;
    if (product.variants?.length || !Number.isFinite(product.priceValue)) catalog.openProduct(id, trigger);
    else {
      const source = trigger?.closest('.hero-stage')?.querySelector('#hero-product-button') || trigger?.closest('.product-family')?.querySelector('.family-item.is-active') || trigger;
      catalog.addToCart(id, null, 1, source);
    }
  }
  function responsiveSource(image, art, family = false, active = true) {
    if (image.classList.contains('is-original')) return;
    const width = image.getBoundingClientRect().width || innerWidth * (family ? .66 : .88);
    const wantsHigh = !saveData && active && width * Math.min(devicePixelRatio || 1,2) > 1440;
    const sources = [
      `./assets/scenes/${art}-510.webp 510w`,
      `./assets/scenes/${art}-1200.webp 1200w`
    ];
    if (wantsHigh && highWidths[art]) sources.push(`./assets/scenes/${art}-1920.webp ${highWidths[art]}w`);
    const srcset = sources.join(', ');
    if (image.getAttribute('srcset') !== srcset) image.srcset = srcset;
    image.sizes = family ? '(max-width: 760px) 81vw, (max-width: 900px) 52vw, 42vw' : '(max-width: 760px) 88vw, 55vw';
  }
  function setHeroPhoto(scene, product) {
    if (!heroPhoto) return;
    const token = ++imageVersion;
    const source = `./assets/scenes/${scene.art}-1200.webp`;
    const fallback = originalImage(product);
    heroPhoto.dataset.art = scene.art;
    heroPhoto.alt = `${fullName(product)}, imagen de presentación basada en la fotografía de Papas y Café`;
    heroPhoto.dataset.productId = product.id;
    heroPhoto.classList.remove('is-original');
    heroPhoto.onerror = () => {
      if (token !== imageVersion || !fallback || heroPhoto.src.endsWith(product.image)) return;
      heroPhoto.removeAttribute('srcset');
      heroPhoto.src = fallback;
      heroPhoto.classList.add('is-original');
      heroPhoto.alt = `${fullName(product)}, fotografía de Papas y Café`;
    };
    responsiveSource(heroPhoto,scene.art);
    heroPhoto.src = source;
  }
  function renderHero(index, announce = false) {
    index = Math.max(0, Math.min(scenes.length - 1,index));
    if (index === heroIndex) return;
    heroIndex = index;
    const scene = scenes[index];
    const product = findProduct(scene.id);
    if (!product) return;
    applyTheme(hero, product.id);
    applyTheme(stage, product.id);
    text('#hero-eyebrow',scene.eyebrow);
    text('#hero-line-one',scene.one);
    text('#hero-line-two',scene.two);
    text('#hero-description',product.description);
    text('#hero-price',catalog.formatMoney(product.priceValue ?? product.variants?.[0]?.price ?? 0));
    text('#hero-price-note',scene.note);
    text('.scene-caption',scene.caption,hero);
    const caption = hero.querySelector('.scene-caption');
    if (caption) caption.style.whiteSpace = 'pre-line';
    ['one','two'].forEach((position,index) => {
      const piece = hero.querySelector(`.scene-piece--${position}`);
      if (!piece) return;
      piece.hidden = false;
      const image = piece.querySelector('img');
      if (image) image.src = `./assets/scenes/${piecesById[scene.id][index]}-510.webp`;
    });
    const hint = hero.querySelector('.product-open-hint');
    if (hint?.lastChild?.nodeType === 3) hint.lastChild.textContent = ' Ver de cerca';
    text('#hero-position',`${String(index + 1).padStart(2,'0')} / ${String(scenes.length).padStart(2,'0')}`);
    const progress = document.querySelector('#hero-progress');
    if (progress) progress.style.transform = `scaleX(${(index + 1) / scenes.length})`;
    if (heroButton) heroButton.setAttribute('aria-label',`Ver ${fullName(product)}`);
    if (heroAdd) {
      heroAdd.textContent = product.variants?.length ? 'Elegir tamaño' : 'Agregar al pedido';
      heroAdd.dataset.productId = product.id;
    }
    hero.classList.remove('is-changing');
    if (!quietMotion()) {
      void hero.offsetWidth;
      hero.classList.add('is-changing');
    }
    setHeroPhoto(scene,product);
    if (announce) text('#hero-status',`${fullName(product)}, ${productPrice(product)}. Destacado ${index + 1} de ${scenes.length}.`);
    // Solo los dos vecinos se preparan; se evita precargar todo el catálogo.
    if (!saveData) [index - 1,index + 1].filter(i => i >= 0 && i < scenes.length).forEach(i => {
      const image = new Image();
      image.src = `./assets/scenes/${scenes[i].art}-510.webp`;
    });
    fitHeroTitle();
  }
  function fitHeroTitle() {
    const title = document.querySelector('#hero-title');
    if (!title) return;
    title.style.fontSize = '';
    // En móvil .hero-story usa display:contents y no tiene una caja medible.
    const available = title.clientWidth || stage.clientWidth * .86;
    const lines = [...title.querySelectorAll('span')];
    const widest = Math.max(0,...lines.map(line => Math.max(line.scrollWidth,line.getBoundingClientRect().width)));
    if (widest > available) title.style.fontSize = `${parseFloat(getComputedStyle(title).fontSize) * available / widest * .99}px`;
  }
  heroButton?.addEventListener('click',() => catalog.openProduct(scenes[heroIndex].id, heroButton));
  heroAdd?.addEventListener('click',() => addProduct(scenes[heroIndex].id,heroAdd));
  heroIngredients?.addEventListener('click',() => catalog.openProduct(scenes[heroIndex].id,heroIngredients,true));

  function familyImage(product) {
    const image = catalog.productImage(product);
    image.loading = 'lazy';
    return image;
  }
  const families = {
    papas: {name:'Papas',ids:['salchipapota','salchipapa-tradicional','choripapa']},
    patacones: {name:'Patacones',ids:['pataconsote','pataconada']},
    arepas: {name:'Arepas y más',ids:['despeinada','super-mixta','chimichanga','santarosanos']}
  };
  document.querySelectorAll('.product-family[data-family]').forEach(section => {
    const rail = section.querySelector('.family-rail');
    if (!rail) return;
    const family = families[section.dataset.family];
    if (!family) return;
    const items = family.ids.map(findProduct).filter(Boolean);
    let selected = 0;
    let scrollFrame = 0;
    let dragged = false;
    let mouseStart = null;
    let suppressClickUntil = 0;
    let statusTimer = 0;
    const status = section.querySelector('.family-status') || document.createElement('p');
    status.className = 'family-status sr-only';
    status.setAttribute('aria-live','polite');
    status.setAttribute('aria-atomic','true');
    if (!status.isConnected) section.append(status);
    rail.replaceChildren();
    items.forEach((product,index) => {
      const item = document.createElement('div');
      item.className = 'family-item';
      item.dataset.productId = product.id;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'family-product';
      button.setAttribute('aria-label',`Ver ${fullName(product)}`);
      button.setAttribute('aria-haspopup','dialog');
      button.append(familyImage(product));
      button.addEventListener('click',event => {
        if (performance.now() < suppressClickUntil) { event.preventDefault(); return; }
        catalog.openProduct(product.id,button);
      });
      item.append(button);
      rail.append(item);
    });
    rail.setAttribute('tabindex','0');
    rail.setAttribute('aria-label',`${family.name}: desliza para explorar, o usa las teclas izquierda y derecha`);
    const cells = [...rail.children];
    function cellCenter(cell) {
      const box = cell.getBoundingClientRect();
      return box.left - rail.getBoundingClientRect().left + rail.scrollLeft + box.width / 2;
    }
    function draw(announce = false) {
      const center = rail.scrollLeft + rail.clientWidth / 2;
      let closest = 0;
      let distance = Infinity;
      cells.forEach((cell,index) => {
        const midpoint = cellCenter(cell);
        const away = Math.abs(midpoint - center);
        if (away < distance) { distance = away; closest = index; }
        const span = cells[1] ? Math.abs(cellCenter(cells[1]) - cellCenter(cells[0])) : cell.offsetWidth;
        const offset = Math.min(2,away / Math.max(1,span));
        cell.style.setProperty('--distance',String(offset));
        cell.style.setProperty('--product-scale',String(1 - Math.min(1,offset) * .46));
        cell.style.setProperty('--product-opacity',String(1 - Math.min(1,offset) * .82));
      });
      const changed = selected !== closest;
      selected = closest;
      const product = items[selected];
      cells.forEach((cell,index) => {
        cell.classList.toggle('is-active',index === selected);
        const image = cell.querySelector('img[data-art]');
        if (image) responsiveSource(image,image.dataset.art,true,index === selected);
      });
      applyTheme(section,product.id);
      text('.family-count',`${String(selected + 1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`,section);
      text('.family-name',fullName(product),section);
      const price = section.querySelector('.family-price');
      if (price) { price.textContent = productPrice(product); price.hidden = !product.price; }
      section.classList.toggle('is-inquiry-only',!product.price);
      section.classList.toggle('has-long-name',fullName(product).length > 24);
      const add = section.querySelector('.family-add');
      if (add) add.textContent = !product.price ? 'Consultar precio' : product.variants?.length ? 'Elegir tamaño' : 'Agregar al pedido';
      const progress = section.querySelector('.family-progress');
      if (progress) progress.style.transform = `scaleX(${(selected + 1) / items.length})`;
      if (announce || changed) {
        clearTimeout(statusTimer);
        statusTimer = setTimeout(() => { status.textContent = `${fullName(product)}, ${productPrice(product)}. ${selected + 1} de ${items.length}.`; },180);
      }
      if (document.querySelector('.header.is-on-scene') && section.getBoundingClientRect().top <= 80 && section.getBoundingClientRect().bottom > 90) applyTheme(document.querySelector('.header'),product.id);
      scrollFrame = 0;
    }
    function goTo(index, behavior = quietMotion() ? 'instant' : 'smooth') {
      const cell = cells[Math.max(0,Math.min(cells.length - 1,index))];
      if (!cell) return;
      rail.scrollTo({left: cellCenter(cell) - rail.clientWidth / 2, behavior});
    }
    rail.addEventListener('scroll',() => { if (!scrollFrame) scrollFrame = requestAnimationFrame(() => draw()); },{passive:true});
    rail.addEventListener('keydown',event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const index = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : selected + (event.key === 'ArrowRight' ? 1 : -1);
      goTo(index);
    });
    // El desplazamiento táctil sigue siendo nativo; solo el ratón necesita arrastre explícito.
    rail.addEventListener('pointerdown',event => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      mouseStart = {x:event.clientX,y:event.clientY,left:rail.scrollLeft,pointerId:event.pointerId};
      dragged = false;
    });
    rail.addEventListener('pointermove',event => {
      if (!mouseStart || event.pointerId !== mouseStart.pointerId) return;
      const delta = event.clientX - mouseStart.x;
      if (!dragged && Math.abs(delta) > 7 && Math.abs(delta) > Math.abs(event.clientY - mouseStart.y)) {
        dragged = true;
        rail.setPointerCapture(event.pointerId);
        rail.classList.add('is-dragging');
        rail.style.scrollSnapType = 'none';
      }
      if (dragged) { event.preventDefault(); rail.scrollLeft = mouseStart.left - delta; }
    });
    function finishDrag(event) {
      if (!mouseStart || (event && event.pointerId !== mouseStart.pointerId)) return;
      if (dragged) {
        suppressClickUntil = performance.now() + 300;
        rail.style.scrollSnapType = '';
        rail.classList.remove('is-dragging');
        if (rail.hasPointerCapture(mouseStart.pointerId)) rail.releasePointerCapture(mouseStart.pointerId);
        draw();
        goTo(selected);
      }
      mouseStart = null;
      dragged = false;
    }
    rail.addEventListener('pointerup',finishDrag);
    rail.addEventListener('pointercancel',finishDrag);
    rail.addEventListener('dragstart',event => event.preventDefault());
    let horizontalWheel = {time:0,delta:0,sign:0};
    rail.addEventListener('wheel',event => {
      if (event.ctrlKey || !(event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY))) return;
      const delta = event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX;
      event.preventDefault();
      const sign = Math.sign(delta);
      const fresh = event.timeStamp - horizontalWheel.time > 150 || sign !== horizontalWheel.sign || (Math.abs(delta) > Math.abs(horizontalWheel.delta) * 1.5 && event.timeStamp - horizontalWheel.time > 45);
      if (fresh && Math.abs(delta) > 4) goTo(selected + sign);
      horizontalWheel = {time:event.timeStamp,delta,sign};
    },{passive:false});
    section.querySelector('.family-detail')?.addEventListener('click',event => catalog.openProduct(items[selected].id,event.currentTarget,true));
    section.querySelector('.family-add')?.addEventListener('click',event => addProduct(items[selected].id,event.currentTarget));
    familyControllers.push({section,rail,draw,goTo,items});
    requestAnimationFrame(() => { goTo(0,'instant'); draw(); });
  });

  function measure() {
    const viewport = innerHeight;
    step = Math.max(170,Math.min(350,viewport * .36));
    const stageHeight = stage.getBoundingClientRect().height || viewport;
    runway.style.minHeight = `${stageHeight + step * (scenes.length - 1)}px`;
    const stickyTop = parseFloat(getComputedStyle(stage).top) || 0;
    heroStart = runway.getBoundingClientRect().top + scrollY - stickyTop;
    heroEnd = heroStart + step * (scenes.length - 1);
    familyControllers.forEach(controller => { controller.goTo(controller.items.findIndex(product => product.id === controller.section.dataset.productId),'instant'); controller.draw(); });
    if (heroPhoto?.dataset.art) responsiveSource(heroPhoto,heroPhoto.dataset.art);
    fitHeroTitle();
    updateScroll();
  }
  function animateScroll(top) {
    cancelAnimationFrame(animationFrame);
    activeScrollTarget = top;
    if (quietMotion()) { window.scrollTo({top,behavior:'instant'}); activeScrollTarget = null; return; }
    const from = scrollY;
    const started = performance.now();
    function tick(now) {
      const progress = Math.min(1,(now - started) / 205);
      const ease = 1 - (1 - progress) ** 3;
      window.scrollTo({top:from + (top - from) * ease,behavior:'instant'});
      if (progress < 1) animationFrame = requestAnimationFrame(tick);
      else activeScrollTarget = null;
    }
    animationFrame = requestAnimationFrame(tick);
  }
  function sectionTop(section) { return Math.max(0,section.getBoundingClientRect().top + scrollY); }
  function navigateVertical(direction) {
    const y = activeScrollTarget ?? scrollY;
    if (y >= heroStart - 3 && y <= heroEnd + 3) {
      const index = Math.max(0,Math.min(scenes.length - 1,Math.round((y - heroStart) / step)));
      const next = index + direction;
      if (next >= 0 && next < scenes.length) { renderHero(next,true); animateScroll(heroStart + next * step); return true; }
      if (next >= scenes.length && familyControllers[0]) { animateScroll(sectionTop(familyControllers[0].section)); return true; }
      return false;
    }
    const menu = document.querySelector('#carta');
    const menuTop = menu ? sectionTop(menu) - (document.querySelector('.header')?.offsetHeight || 76) : Infinity;
    if (direction < 0 && Math.abs(menuTop - y) < 8 && familyControllers.length) {
      animateScroll(sectionTop(familyControllers.at(-1).section));
      return true;
    }
    const familyIndex = familyControllers.findIndex(({section}) => Math.abs(sectionTop(section) - y) < 8);
    if (familyIndex >= 0) {
      const target = familyControllers[familyIndex + direction]?.section;
      if (target) animateScroll(sectionTop(target));
      else if (direction < 0) { renderHero(scenes.length - 1,true); animateScroll(heroEnd); }
      else {
        const menu = document.querySelector('#carta');
        if (!menu) return false;
        animateScroll(sectionTop(menu) - (document.querySelector('.header')?.offsetHeight || 76));
      }
      return true;
    }
    return false;
  }
  let wheel = {time:-Infinity,delta:0,sign:0,accepted:-Infinity,controlled:false};
  window.addEventListener('wheel',event => {
    if (event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || document.querySelector('dialog[open]') || event.target.closest('.nav.open')) return;
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : 1);
    const sign = Math.sign(delta);
    const gap = event.timeStamp - wheel.time;
    const fresh = gap > 150 || sign !== wheel.sign || (Math.abs(delta) > Math.abs(wheel.delta) * 1.4 && event.timeStamp - wheel.accepted > 110);
    const y = activeScrollTarget ?? scrollY;
    const withinHero = y >= heroStart - 3 && y <= heroEnd + 3;
    const withinFamily = familyControllers.some(({section}) => Math.abs(sectionTop(section) - y) < 8);
    const menu = document.querySelector('#carta');
    const atMenuStart = sign < 0 && menu && Math.abs(sectionTop(menu) - (document.querySelector('.header')?.offsetHeight || 76) - y) < 8;
    // La inercia de la salida también pertenece al gesto: no debe desplazar la cuadrícula.
    if (!fresh && wheel.controlled) {
      event.preventDefault();
      wheel.time = event.timeStamp;
      wheel.delta = delta;
      return;
    }
    if (!withinHero && !withinFamily && !atMenuStart) return;
    const tallScene = withinHero ? stage : familyControllers.find(({section}) => Math.abs(sectionTop(section) - y) < 8)?.section;
    if (tallScene && tallScene.getBoundingClientRect().height > innerHeight + 2) return;
    if (Math.abs(delta) < 5) { event.preventDefault(); return; }
    wheel = {time:event.timeStamp,delta,sign,accepted:event.timeStamp,controlled:false};
    if (navigateVertical(sign)) { wheel.controlled = true; event.preventDefault(); }
  },{passive:false});
  function attachVerticalTouch(scene) {
    let touch = null;
    scene.addEventListener('touchstart',event => {
      touch = event.touches.length === 1 ? {x:event.touches[0].clientX,y:event.touches[0].clientY,done:false,axis:null} : null;
    },{passive:true});
    scene.addEventListener('touchmove',event => {
      if (!touch || event.touches.length !== 1 || document.querySelector('dialog[open]')) return;
      if (scene.getBoundingClientRect().height > innerHeight + 2) return;
      const dx = touch.x - event.touches[0].clientX;
      const dy = touch.y - event.touches[0].clientY;
      if (!touch.axis && Math.max(Math.abs(dx),Math.abs(dy)) > 8) touch.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (touch.axis !== 'y' || Math.abs(dy) < 20) return;
      if (touch.done) { event.preventDefault(); return; }
      if (navigateVertical(Math.sign(dy))) { touch.done = true; event.preventDefault(); }
    },{passive:false});
    const finish = () => { touch = null; };
    scene.addEventListener('touchend',finish,{passive:true});
    scene.addEventListener('touchcancel',finish,{passive:true});
  }
  attachVerticalTouch(stage);
  familyControllers.forEach(({section}) => attachVerticalTouch(section));
  document.addEventListener('keydown',event => {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || document.querySelector('dialog[open]') || event.target.closest('input,textarea,select,[contenteditable="true"],.nav.open')) return;
    const visibleScene = [stage,...familyControllers.map(({section}) => section)].find(section => {
      const box = section.getBoundingClientRect();
      return box.top <= 2 && box.bottom > 0;
    });
    if (visibleScene && visibleScene.getBoundingClientRect().height > innerHeight + 2) return;
    if (['ArrowDown','PageDown','ArrowUp','PageUp'].includes(event.key) && navigateVertical(['ArrowDown','PageDown'].includes(event.key) ? 1 : -1)) event.preventDefault();
  });

  // El movimiento se limita a la escena visible y se suspende al salir del puntero.
  [stage,...familyControllers.map(controller => controller.section)].forEach(scene => {
    let pointerFrame = 0;
    let pointer = {x:0,y:0};
    scene.addEventListener('pointermove',event => {
      if (event.pointerType !== 'mouse' || quietMotion()) return;
      const box = scene.getBoundingClientRect();
      pointer = {x:(event.clientX - box.left) / box.width * 2 - 1,y:(event.clientY - box.top) / box.height * 2 - 1};
      if (!pointerFrame) pointerFrame = requestAnimationFrame(() => {
        scene.style.setProperty('--pointer-x',String(pointer.x));
        scene.style.setProperty('--pointer-y',String(pointer.y));
        pointerFrame = 0;
      });
    },{passive:true});
    scene.addEventListener('pointerleave',() => { scene.style.setProperty('--pointer-x','0'); scene.style.setProperty('--pointer-y','0'); });
  });
  const links = [...document.querySelectorAll('.nav > a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const progress = document.querySelector('.reading-progress');
  const header = document.querySelector('.header');
  const floating = document.querySelector('.floating-whatsapp');
  function updateScroll() {
    const y = scrollY;
    if (activeScrollTarget === null) renderHero(Math.round((y - heroStart) / step));
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1,y / max) : 0})`;
    let active = '#inicio';
    sections.forEach(section => { if (section.getBoundingClientRect().top <= 150) active = `#${section.id}`; });
    links.forEach(link => {
      const selected = link.getAttribute('href') === active;
      link.classList.toggle('is-current',selected);
      if (selected) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
    const visibleScene = [stage,...familyControllers.map(controller => controller.section)].find(scene => {
      const box = scene.getBoundingClientRect();
      return box.top <= 80 && box.bottom > 90;
    });
    header?.classList.toggle('is-on-scene',Boolean(visibleScene));
    if (header && visibleScene) applyTheme(header,visibleScene.dataset.productId);
    floating?.classList.toggle('is-over-hero',y < heroEnd + innerHeight * .6);
    frame = 0;
  }
  window.addEventListener('scroll',() => { if (!frame) frame = requestAnimationFrame(updateScroll); },{passive:true});
  window.addEventListener('resize',measure);
  if (document.fonts) document.fonts.ready.then(fitHeroTitle);
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); } }),{threshold:.08});
    document.querySelectorAll('[data-reveal]').forEach(element => reveal.observe(element));
    if (!quietMotion()) document.documentElement.classList.add('motion-ready');
  }
  function resolveFragment() {
    cancelAnimationFrame(animationFrame);
    activeScrollTarget = null;
    const hash = decodeURIComponent(location.hash.slice(1));
    const family = familyControllers.find(({section}) => section.id === hash);
    if (family) {
      const align = () => {
        if (decodeURIComponent(location.hash.slice(1)) === hash) window.scrollTo({top:sectionTop(family.section),behavior:'instant'});
      };
      // El fragmento nativo aplica scroll-padding; estas galerías se alinean al viewport.
      align();
      requestAnimationFrame(align);
      return;
    }
    const index = scenes.findIndex(scene => scene.id === hash || scene.art === hash);
    if (index >= 0) { renderHero(index); window.scrollTo({top:heroStart + index * step,behavior:'instant'}); }
  }
  document.addEventListener('click',event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const family = familyControllers.find(({section}) => `#${section.id}` === link.getAttribute('href'));
    if (!family) return;
    event.preventDefault();
    const hash = `#${family.section.id}`;
    if (location.hash !== hash) history.pushState(null,'',hash);
    animateScroll(sectionTop(family.section));
  });
  window.addEventListener('hashchange',resolveFragment);
  reduce.addEventListener('change',() => {
    if (quietMotion() && activeScrollTarget !== null) {
      const target = activeScrollTarget;
      cancelAnimationFrame(animationFrame);
      activeScrollTarget = null;
      window.scrollTo({top:target,behavior:'instant'});
    }
    document.documentElement.classList.toggle('motion-ready',!quietMotion());
    [stage,...familyControllers.map(controller => controller.section)].forEach(scene => { scene.style.setProperty('--pointer-x','0'); scene.style.setProperty('--pointer-y','0'); });
  });
  renderHero(0);
  measure();
  resolveFragment();
})();
