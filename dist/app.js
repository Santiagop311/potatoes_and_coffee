const WHATSAPP = 'https://wa.me/573104119674';
const whatsappUrl = (message) => `${WHATSAPP}?text=${encodeURIComponent(message)}`;
const products = [
  { name: 'Empanada de carne', category: 'empanadas', price: '$2.000', description: 'Nuestra especialidad. Doradita por fuera y llena de carne, ¡carne!', image: 'empanadas.jpeg', size: [1600,1211], label: 'LA ESPECIALIDAD', note: 'Precio por unidad', action: 'Se me antojó' },
  { name: 'Salchipapota', category: 'papas', price: 'Desde $18.000', description: 'Papas, salchicha Zenú, pollo y res desmechados, maíz y queso fundido.', image: 'salchipapota.jpeg', size: [1600,1188], portions: ['250 g · $18.000','500 g · $28.000','1 kg · $38.000'], action: 'La quiero' },
  { name: 'Pataconada', category: 'patacones', price: '$39.000', description: 'Pataconcitos crocantes con chorizo santarosano, res, pollo, guiso y salsa de la casa.', image: 'pataconada.jpeg', size: [1201,1600], action: 'La quiero' },
  { name: 'La despeinada', category: 'mas', price: '$13.000', description: 'Arepa de maíz con res y pollo desmechados y queso doble crema.', image: 'despeinada.jpeg', size: [1200,1600], action: 'La quiero' },
  { name: 'Santarosanos', category: 'mas', price: '$22.000', description: 'Dos chorizos santarosanos, arepa con queso mozzarella y una porción de papas.', image: 'santarosanos.jpeg', size: [1600,1090], action: 'Los quiero' },
  { name: 'Pataconsote', category: 'patacones', price: '$25.000', description: 'Patacón con res y pollo desmechados, maíz y una buena capa de queso fundido.', image: 'pataconsote.jpeg', size: [1600,1382], action: 'Lo quiero' },
  { name: 'Chimichanga', category: 'mas', price: '$25.000', description: 'Tortilla sofrita con res, pollo, queso y maíz; bañada en queso y acompañada de papas.', image: 'chimichanga.jpeg', size: [1600,1600], action: 'La quiero' },
  { name: 'Súper mixta', fullName: 'La despeinada súper mixta', category: 'mas', description: 'Arepa de maíz natural con carnes desmechadas, chorizo santarosano y queso fundido.', image: 'despeinada-real.jpeg', size: [1600,1600], label: 'LA DESPEINADA CON TODO', note: 'Consulta el precio', action: 'Consultar' },
  { name: 'Choripapa', category: 'papas', description: 'Papas caseras, salchicha Zenú, chorizo santarosano, queso fundido y maíz.', illustration: true, illustrationCaption: 'CON<br>CHORIZO.', portions: ['250 g','500 g','1 kg'], label: 'OTRO ANTOJO DE LA CASA', note: 'Consulta tamaños y precios', action: 'Consultar' },
  { name: 'Salchipapa tradicional', category: 'papas', price: 'Desde $10.000', description: 'La combinación de siempre: papas, salchicha Zenú y queso fundido.', illustration: true, portions: ['250 g · $10.000','500 g · $15.000','1 kg · $20.000'], action: 'La quiero' }
];

function productImage(product, isDialog = false) {
  if (product.image) {
    const img = document.createElement('img');
    img.src = `./assets/${product.image}`;
    img.alt = product.poster ? 'Afiche de la choripapa de Papas y Café' : `${product.fullName || product.name}, fotografía real de Papas y Café`;
    img.width = product.size[0];
    img.height = product.size[1];
    img.loading = isDialog ? 'eager' : 'lazy';
    if (product.poster) {
      img.style.objectFit = 'contain';
      img.style.background = '#171511';
    }
    if (product.image === 'despeinada.jpeg') img.style.objectPosition = '50% 70%';
    return img;
  }
  const art = document.createElement('div');
  art.className = 'traditional-art';
  art.setAttribute('role','img');
  art.setAttribute('aria-label','Ilustración de papas fritas');
  art.innerHTML = '<svg viewBox="0 0 160 160" aria-hidden="true"><g fill="none" stroke="#171511" stroke-width="5" stroke-linejoin="round"><path d="m34 83-9-49 17-3 13 49m4 0-2-64 18-1 2 65m10 0 9-58 17 3-9 58m7 5 21-48 15 7-22 50" fill="#fff8e8"/><path d="m28 77 14 70h76l14-70-24 10-28-10-28 10Z" fill="#d32f25"/><path d="m66 108 12 21 16-26" stroke="#fff8e8"/></g></svg><span>UN<br>CLÁSICO.</span>';
  if (product.illustrationCaption) art.querySelector('span').innerHTML = product.illustrationCaption;
  return art;
}

function fillPortions(container, portions = []) {
  container.replaceChildren();
  portions.forEach(text => {
    const span = document.createElement('span');
    span.textContent = text;
    container.append(span);
  });
}

const dialog = document.querySelector('#product-dialog');
let productOpener;
let previousBodyOverflow;
function openProduct(product, opener) {
  productOpener = opener;
  document.querySelector('#product-dialog-title').textContent = product.fullName || product.name;
  document.querySelector('#product-dialog-price').textContent = product.price || 'Consulta el precio';
  document.querySelector('#product-dialog-description').textContent = product.description;
  document.querySelector('#product-dialog-note').textContent = product.note || '';
  document.querySelector('#product-dialog-image').replaceChildren(productImage(product, true));
  fillPortions(document.querySelector('#product-dialog-portions'),product.portions);
  document.querySelector('#product-dialog-whatsapp').href = whatsappUrl(`Hola, se me antojó ${product.fullName || product.name}. ¿Me comparten el precio vigente y la disponibilidad?`);
  previousBodyOverflow = document.body.style.overflow;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}
function closeProduct() { dialog.close(); }
dialog.querySelector('.dialog-close').addEventListener('click',closeProduct);
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeProduct();
  }
});
dialog.addEventListener('close', () => {
  document.body.style.overflow = previousBodyOverflow || '';
  productOpener?.focus({preventScroll:true});
});

const grid = document.querySelector('#menu-grid');
products.forEach((product, index) => {
  const card = document.createElement('article');
  card.className = 'menu-card';
  card.dataset.category = product.category;
  card.dataset.search = normalize(`${product.name} ${product.fullName || ''} ${product.description}`);
  const image = document.createElement('button');
  image.type = 'button';
  image.className = 'dish-image';
  image.setAttribute('aria-label',`Ver ${product.fullName || product.name} de cerca`);
  image.setAttribute('aria-haspopup','dialog');
  image.setAttribute('aria-controls','product-dialog');
  image.append(productImage(product));
  image.addEventListener('click', () => openProduct(product,image));
  if (product.label) {
    const label = document.createElement('span');
    label.className = 'dish-label';
    label.textContent = product.label;
    image.append(label);
  }
  const zoom = document.createElement('span');
  zoom.className = 'dish-zoom';
  zoom.setAttribute('aria-hidden','true');
  zoom.textContent = '+';
  image.append(zoom);
  card.append(image);
  const body = document.createElement('div');
  body.className = 'menu-card-body';
  const heading = document.createElement('div');
  heading.className = 'dish-heading';
  const name = document.createElement('h3');
  name.textContent = product.name;
  heading.append(name);
  if (product.price) {
    const price = document.createElement('span');
    price.className = 'dish-price';
    price.textContent = product.price;
    heading.append(price);
  }
  body.append(heading);
  const description = document.createElement('p');
  description.className = 'dish-description';
  description.textContent = product.description;
  body.append(description);
  if (product.portions) {
    const portions = document.createElement('div');
    portions.className = 'portions';
    fillPortions(portions,product.portions);
    body.append(portions);
  }
  const bottom = document.createElement('div');
  bottom.className = 'dish-bottom';
  const detail = document.createElement('button');
  detail.type = 'button';
  detail.className = 'dish-detail-link';
  detail.textContent = 'Ver de cerca';
  detail.setAttribute('aria-label',`Ver detalles de ${product.fullName || product.name}`);
  detail.setAttribute('aria-haspopup','dialog');
  detail.setAttribute('aria-controls','product-dialog');
  detail.addEventListener('click', () => openProduct(product,detail));
  bottom.append(detail);
  const link = document.createElement('a');
  link.className = 'dish-link';
  link.href = whatsappUrl(`Hola, se me antojó ${product.fullName || product.name}. ¿Me comparten el precio vigente y la disponibilidad?`);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label',`Consultar ${product.fullName || product.name} por WhatsApp`);
  link.innerHTML = `${product.action} <span class="round-arrow" aria-hidden="true">↗</span>`;
  bottom.append(link);
  body.append(bottom);
  if (product.note) {
    const note = document.createElement('small');
    note.className = 'product-note';
    note.textContent = product.note;
    body.append(note);
  }
  card.append(body);
  grid.append(card);
});

function normalize(text) { return text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(); }
let currentFilter = 'todos';
const search = document.querySelector('#menu-search');
const filterButtons = document.querySelectorAll('[data-filter]');
function applyFilters() {
  const query = normalize(search.value.trim());
  let count = 0;
  grid.querySelectorAll('.menu-card').forEach(card => {
    card.hidden = (currentFilter !== 'todos' && card.dataset.category !== currentFilter) || !card.dataset.search.includes(query);
    if (!card.hidden) count++;
  });
  filterButtons.forEach(button => {
    const active = button.dataset.filter === currentFilter;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
  document.querySelector('#filter-status').textContent = `${count} ${count === 1 ? 'plato para resolver ese antojo' : 'platos para resolver ese antojo'}${query ? ` · Búsqueda: “${search.value.trim()}”` : ''}.`;
  document.querySelector('.menu-empty').hidden = count !== 0;
}
filterButtons.forEach(button => button.addEventListener('click', () => {
  currentFilter = button.dataset.filter;
  applyFilters();
}));
search.addEventListener('input',applyFilters);
document.querySelector('#reset-menu').addEventListener('click', () => {
  currentFilter = 'todos';
  search.value = '';
  applyFilters();
  search.focus({preventScroll:true});
});
document.querySelector('#product-count').textContent = String(products.length).padStart(2,'0');
document.querySelector('.menu-toolbar').hidden = false;
applyFilters();

document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = whatsappUrl(link.dataset.whatsapp); });
document.documentElement.classList.add('js-ready');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
function closeNav() {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-label','Abrir menú');
}
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') !== 'true';
  nav.classList.toggle('open',expanded);
  toggle.setAttribute('aria-expanded',String(expanded));
  toggle.setAttribute('aria-label',expanded ? 'Cerrar menú' : 'Abrir menú');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click',closeNav));
document.addEventListener('click',event => {
  if (nav.classList.contains('open') && !event.target.closest('.header')) closeNav();
});
window.matchMedia('(min-width: 901px)').addEventListener('change',event => { if (event.matches) closeNav(); });
document.addEventListener('keydown',event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) { closeNav(); toggle.focus(); }
});

const copyButton = document.querySelector('.copy-address');
copyButton.hidden = false;
copyButton.addEventListener('click', async () => {
  const status = document.querySelector('.copy-status');
  try {
    await navigator.clipboard.writeText('Papas y Café · Parque Industrial, Ciudad Boquía, Mz. 12, casa 18, local 2 · Pereira');
    status.textContent = '¡Dirección copiada!';
  } catch {
    status.textContent = 'Mz. 12, casa 18, local 2 · Ciudad Boquía, Parque Industrial, Pereira.';
  }
});
document.querySelector('#year').textContent = new Intl.DateTimeFormat('es-CO',{year:'numeric',timeZone:'America/Bogota'}).format(new Date());
