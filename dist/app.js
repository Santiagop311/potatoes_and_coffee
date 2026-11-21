/* Catálogo, fichas y pedido. Los importes se conservan de la carta del negocio. */
(() => {
  'use strict';
  const WHATSAPP = 'https://wa.me/573104119674';
  const STORAGE_KEY = 'papas-y-cafe:cart:v1';
  const whatsappUrl = message => `${WHATSAPP}?text=${encodeURIComponent(message)}`;
  const formatMoney = amount => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
  const products = [
    { id:'empanada-carne', name:'Empanada de carne', category:'empanadas', price:'$2.000', priceValue:2000, description:'Nuestra especialidad. Doradita por fuera y llena de carne, ¡carne!', ingredients:['Carne'], image:'empanadas.jpeg', size:[1600,1211], label:'LA ESPECIALIDAD', note:'Precio por unidad' },
    { id:'salchipapota', name:'Salchipapota', category:'papas', price:'Desde $18.000', description:'Papas, salchicha Zenú, pollo y res desmechados, maíz y queso fundido.', ingredients:['Papas','Salchicha Zenú','Pollo desmechado','Res desmechada','Maíz','Queso fundido'], image:'salchipapota.jpeg', size:[1600,1188], variants:[{id:'250g',name:'250 g',price:18000},{id:'500g',name:'500 g',price:28000},{id:'1kg',name:'1 kg',price:38000}] },
    { id:'pataconada', name:'Pataconada', category:'patacones', price:'$39.000', priceValue:39000, description:'Pataconcitos crocantes con chorizo santarosano, res, pollo, guiso y salsa de la casa.', ingredients:['Pataconcitos','Chorizo santarosano','Res','Pollo','Guiso','Salsa de la casa'], image:'pataconada.jpeg', size:[1201,1600] },
    { id:'despeinada', name:'La despeinada', category:'mas', price:'$13.000', priceValue:13000, description:'Arepa de maíz con res y pollo desmechados y queso doble crema.', ingredients:['Arepa de maíz','Res desmechada','Pollo desmechado','Queso doble crema'], image:'despeinada.jpeg', size:[1200,1600] },
    { id:'santarosanos', name:'Santarosanos', category:'mas', price:'$22.000', priceValue:22000, description:'Dos chorizos santarosanos, arepa con queso mozzarella y una porción de papas.', ingredients:['Dos chorizos santarosanos','Arepa','Queso mozzarella','Papas'], image:'santarosanos.jpeg', size:[1600,1090] },
    { id:'pataconsote', name:'Pataconsote', category:'patacones', price:'$25.000', priceValue:25000, description:'Patacón con res y pollo desmechados, maíz y una buena capa de queso fundido.', ingredients:['Patacón','Res desmechada','Pollo desmechado','Maíz','Queso fundido'], image:'pataconsote.jpeg', size:[1600,1382] },
    { id:'chimichanga', name:'Chimichanga', category:'mas', price:'$25.000', priceValue:25000, description:'Tortilla sofrita con res, pollo, queso y maíz; bañada en queso y acompañada de papas.', ingredients:['Tortilla sofrita','Res','Pollo','Queso','Maíz','Papas'], image:'chimichanga.jpeg', size:[1600,1600] },
    { id:'super-mixta', name:'Súper mixta', fullName:'La despeinada súper mixta', category:'mas', description:'Arepa de maíz natural con carnes desmechadas, chorizo santarosano y queso fundido.', ingredients:['Arepa de maíz natural','Carnes desmechadas','Chorizo santarosano','Queso fundido'], image:'despeinada-real.jpeg', size:[1600,1600], label:'LA DESPEINADA CON TODO', note:'Consulta el precio' },
    { id:'choripapa', name:'Choripapa', category:'papas', description:'Papas caseras, salchicha Zenú, chorizo santarosano, queso fundido y maíz.', ingredients:['Papas caseras','Salchicha Zenú','Chorizo santarosano','Queso fundido','Maíz'], illustration:true, illustrationCaption:'CON<br>CHORIZO.', portions:['250 g','500 g','1 kg'], label:'OTRO ANTOJO DE LA CASA', note:'Consulta tamaños y precios' },
    { id:'salchipapa-tradicional', name:'Salchipapa tradicional', category:'papas', price:'Desde $10.000', description:'La combinación de siempre: papas, salchicha Zenú y queso fundido.', ingredients:['Papas','Salchicha Zenú','Queso fundido'], illustration:true, variants:[{id:'250g',name:'250 g',price:10000},{id:'500g',name:'500 g',price:15000},{id:'1kg',name:'1 kg',price:20000}] }
  ];
  // Una misma dirección de arte para portada, familias, carta, ficha y pedido.
  const sceneArt = {
    'empanada-carne': {art:'empanada',colors:['#ffc728','#ffe6a2','#37200b','#8a2b16'],size:[1536,1024]},
    salchipapota: {art:'salchipapota',colors:['#ef6942','#ffc09a','#371b16','#632418'],size:[1396,1127]},
    pataconada: {art:'pataconada',colors:['#d8cb84','#f4e8b2','#342c18','#4e4126'],size:[1312,1199]},
    despeinada: {art:'despeinada',colors:['#deb4c2','#f7dfe5','#412332','#652b46'],size:[1536,1024]},
    santarosanos: {art:'santarosanos',colors:['#f0a567','#ffdbaf','#3d2214','#6c3219'],size:[1521,1034]},
    pataconsote: {art:'pataconsote',colors:['#c8da83','#f1f3bd','#29341a','#384b23'],size:[1519,1036]},
    chimichanga: {art:'chimichanga',colors:['#e9a45e','#ffddb2','#3b2515','#64331b'],size:[1536,1024]},
    'super-mixta': {art:'super-mixta',colors:['#e5ab81','#ffdec0','#3b2319','#6b3323'],size:[1536,1024]},
    choripapa: {art:'choripapa',colors:['#d96b4d','#f5b99e','#2b170e','#622b1d'],size:[1536,1024]},
    'salchipapa-tradicional': {art:'salchipapa-tradicional',colors:['#f3bd43','#ffe7a1','#39260c','#644311'],size:[1327,1186]}
  };
  products.forEach(product => {
    product.scene = sceneArt[product.id];
    product.sceneImage = `./assets/scenes/${product.scene.art}-1200.webp`;
  });
  function applyTheme(element, id) {
    const product = typeof id === 'string' ? products.find(item => item.id === id) : id;
    if (!element || !product?.scene) return;
    const colors = product.scene.colors;
    ['--scene-bg','--scene-light','--scene-ink','--scene-accent'].forEach((name,index) => element.style.setProperty(name,colors[index]));
    element.style.setProperty('--scene-button',colors[3]);
    element.dataset.productId = product.id;
  }
  products.forEach(product => {
    if (product.variants) product.portions = product.variants.map(variant => `${variant.name} · ${formatMoney(variant.price)}`);
  });
  const byId = new Map(products.map(product => [product.id, product]));
  const displayName = product => product.fullName || product.name;
  const purchasable = product => Number.isFinite(product.priceValue) || !!product.variants?.length;
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const boundedQuantity = value => Math.max(1, Math.min(99, Math.trunc(Number(value)) || 1));
  const priceFor = (product, variantId) => product.variants?.find(variant => variant.id === variantId)?.price ?? product.priceValue;
  const keyFor = (id, variantId) => `${id}:${variantId || ''}`;
  let cart = [];
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (Array.isArray(stored)) stored.slice(0,50).forEach(line => {
      const product = byId.get(line.id);
      if (!product || !purchasable(product)) return;
      const variantId = product.variants ? product.variants.find(variant => variant.id === line.variantId)?.id : null;
      if (product.variants && !variantId) return;
      const existing = cart.find(item => keyFor(item.id,item.variantId) === keyFor(product.id,variantId));
      if (existing) existing.quantity = boundedQuantity(existing.quantity + boundedQuantity(line.quantity));
      else cart.push({id:product.id,variantId,quantity:boundedQuantity(line.quantity)});
    });
  } catch { /* El pedido sigue funcionando si el navegador no permite guardar datos. */ }

  if (!document.querySelector('link[href$="cart.css"]')) {
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = './cart.css';
    document.head.append(styles);
  }

  function productImage(product, eager = false) {
    if (product.sceneImage || product.image) {
      const img = document.createElement('img');
      img.src = product.sceneImage || `./assets/${product.image}`;
      if (product.sceneImage) {
        img.className = 'is-scene-art';
        img.addEventListener('error', () => {
          img.removeAttribute('srcset');
          if (product.image) {
            img.src = `./assets/${product.image}`;
            img.classList.remove('is-scene-art');
            img.alt = `${displayName(product)}, fotografía real de Papas y Café`;
          } else {
            img.replaceWith(productIllustration(product));
          }
        }, {once:true});
      }
      if (product.sceneImage) {
        const prefix = product.sceneImage.replace('-1200.webp','');
        img.srcset = `${prefix}-510.webp 510w, ${product.sceneImage} 1200w`;
        img.sizes = eager ? '(max-width: 650px) 92vw, 430px' : '(max-width: 650px) 44vw, 28vw';
      }
      img.alt = `${displayName(product)}, ${product.sceneImage ? 'recreación ilustrativa de' : 'fotografía real de'} Papas y Café`;
      [img.width,img.height] = product.scene?.size || product.size || [1200,900];
      if (product.scene) img.dataset.art = product.scene.art;
      img.loading = eager ? 'eager' : 'lazy';
      img.decoding = 'async';
      return img;
    }
    return productIllustration(product);
  }
  function productIllustration(product) {
    const art = document.createElement('div');
    art.className = 'traditional-art';
    art.setAttribute('role','img');
    art.setAttribute('aria-label',`Ilustración de ${product.name.toLowerCase()}`);
    art.innerHTML = '<svg viewBox="0 0 160 160" aria-hidden="true"><g fill="none" stroke="#171511" stroke-width="5" stroke-linejoin="round"><path d="m34 83-9-49 17-3 13 49m4 0-2-64 18-1 2 65m10 0 9-58 17 3-9 58m7 5 21-48 15 7-22 50" fill="#fff8e8"/><path d="m28 77 14 70h76l14-70-24 10-28-10-28 10Z" fill="#d32f25"/><path d="m66 108 12 21 16-26" stroke="#fff8e8"/></g></svg><span>UN<br>CLÁSICO.</span>';
    if (product.illustrationCaption) art.querySelector('span').innerHTML = product.illustrationCaption;
    return art;
  }

  const productDialog = document.querySelector('#product-dialog') || document.body.appendChild(Object.assign(document.createElement('dialog'), {id:'product-dialog',className:'product-dialog'}));
  productDialog.classList.add('pc-product-dialog');
  productDialog.setAttribute('aria-labelledby','product-dialog-title');
  productDialog.setAttribute('aria-describedby','product-dialog-description');
  productDialog.innerHTML = `<button class="dialog-close" type="button" aria-label="Cerrar detalle del plato">×</button><div id="product-dialog-image"></div><form class="product-dialog-copy" id="product-options"><p class="eyebrow">HECHO PARA ANTOJARSE</p><h2 id="product-dialog-title"></h2><p id="product-dialog-description"></p><details class="pc-ingredients"><summary>Ver ingredientes</summary><ul id="product-ingredients"></ul></details><fieldset class="pc-variants" hidden><legend>Elige el tamaño</legend><div id="product-variants"></div></fieldset><div class="pc-product-total"><div><span id="product-dialog-price"></span><small id="product-price-unit">COP · por unidad</small></div><label class="pc-quantity-label" for="product-quantity">Cantidad<input id="product-quantity" type="number" min="1" max="99" step="1" value="1" inputmode="numeric" required></label></div><p id="product-dialog-note"></p><button class="button button-dark pc-product-add" type="submit">Agregar al pedido</button><a class="button button-dark pc-product-inquiry" id="product-dialog-whatsapp" href="${WHATSAPP}" target="_blank" rel="noopener noreferrer" hidden>Consultar por WhatsApp</a><p class="dialog-help">Confirmamos disponibilidad y precio vigente por WhatsApp.</p><p class="sr-only" role="status" id="product-option-status"></p></form>`;
  const cartDialog = document.createElement('dialog');
  cartDialog.id = 'cart-dialog';
  cartDialog.className = 'pc-cart-dialog';
  cartDialog.setAttribute('aria-labelledby','cart-title');
  cartDialog.innerHTML = `<div class="pc-cart-header"><div><p class="eyebrow">YA CASI ES HORA DE COMER</p><h2 id="cart-title">TU PEDIDO.</h2></div><button class="dialog-close" type="button" aria-label="Cerrar pedido">×</button></div><div class="pc-cart-lines"></div><div class="pc-cart-footer"><div class="pc-cart-subtotal"><span>Subtotal</span><strong id="cart-total"></strong></div><p>Precios en COP. Consulta disponibilidad y confirma tu pedido con nosotros.</p><a class="button button-dark pc-cart-checkout" target="_blank" rel="noopener noreferrer">Continuar por WhatsApp</a></div>`;
  document.body.append(cartDialog);
  const toast = document.createElement('div');
  toast.className = 'pc-cart-toast';
  toast.hidden = true;
  toast.innerHTML = '<span role="status"></span><button type="button" data-cart-open>Ver pedido</button>';
  document.body.append(toast);
  const cartStatus = document.createElement('p');
  cartStatus.className = 'sr-only';
  cartStatus.setAttribute('role','status');
  document.body.append(cartStatus);
  let selectedProduct = null;
  let selectedVariant = null;
  let toastTimer;
  const openers = new WeakMap();
  let bodyOverflow = '';
  let modalLock = false;
  function showDialog(dialog, opener) {
    if (!modalLock) { bodyOverflow = document.body.style.overflow; modalLock = true; }
    if (!dialog.open) {
      openers.set(dialog, opener instanceof HTMLElement ? opener : document.activeElement);
      dialog.showModal();
    }
    document.body.style.overflow = 'hidden';
    document.dispatchEvent(new CustomEvent('papas:dialog-open', {detail:{id:dialog.id}}));
  }
  [productDialog,cartDialog].forEach(dialog => {
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      if (!document.querySelector('dialog[open]')) { document.body.style.overflow = bodyOverflow; modalLock = false; }
      const opener = openers.get(dialog);
      if (opener?.isConnected && !document.querySelector('dialog[open]')) opener.focus({preventScroll:true});
    });
  });

  function updateProductPrice() {
    if (!selectedProduct) return;
    const unitPrice = priceFor(selectedProduct,selectedVariant);
    const quantity = boundedQuantity(document.querySelector('#product-quantity').value);
    document.querySelector('#product-dialog-price').textContent = Number.isFinite(unitPrice) ? formatMoney(unitPrice * quantity) : selectedProduct.price || 'Consulta el precio';
    document.querySelector('#product-price-unit').textContent = Number.isFinite(unitPrice) ? (quantity > 1 ? `COP · ${formatMoney(unitPrice)} por unidad` : 'COP · por unidad') : 'COP';
    document.querySelector('#product-dialog-whatsapp').href = whatsappUrl(`Hola, se me antojaron ${quantity} × ${displayName(selectedProduct)}. ¿Me comparten el precio vigente y la disponibilidad?`);
  }
  function openProduct(id, opener, expandIngredients = false) {
    const product = typeof id === 'string' ? byId.get(id) : byId.get(id?.id);
    if (!product) return false;
    selectedProduct = product;
    selectedVariant = null;
    applyTheme(productDialog,product);
    productDialog.dataset.productId = product.id;
    productDialog.querySelector('#product-dialog-title').textContent = displayName(product);
    productDialog.querySelector('#product-dialog-description').textContent = product.description;
    productDialog.querySelector('#product-dialog-note').textContent = product.note || '';
    productDialog.querySelector('#product-dialog-image').replaceChildren(productImage(product,true));
    productDialog.querySelector('#product-quantity').value = '1';
    productDialog.querySelector('.pc-ingredients').open = !!expandIngredients;
    const ingredients = productDialog.querySelector('#product-ingredients');
    ingredients.replaceChildren(...product.ingredients.map(ingredient => Object.assign(document.createElement('li'),{textContent:ingredient})));
    const fieldset = productDialog.querySelector('.pc-variants');
    fieldset.hidden = !product.variants;
    const variants = productDialog.querySelector('#product-variants');
    variants.replaceChildren();
    product.variants?.forEach(variant => {
      const label = document.createElement('label');
      label.className = 'pc-variant';
      const input = Object.assign(document.createElement('input'), {type:'radio',name:'portion',value:variant.id,required:true});
      input.addEventListener('change', () => { selectedVariant = variant.id; updateProductPrice(); });
      const name = Object.assign(document.createElement('span'),{textContent:variant.name});
      const price = Object.assign(document.createElement('strong'),{textContent:formatMoney(variant.price)});
      label.append(input,name,price);
      variants.append(label);
    });
    const canBuy = purchasable(product);
    productDialog.querySelector('.pc-product-add').hidden = !canBuy;
    productDialog.querySelector('.pc-product-inquiry').hidden = canBuy;
    productDialog.querySelector('#product-option-status').textContent = '';
    updateProductPrice();
    showDialog(productDialog,opener);
    return true;
  }
  productDialog.querySelector('#product-quantity').addEventListener('input',updateProductPrice);
  productDialog.querySelector('#product-quantity').addEventListener('change',event => { event.target.value = boundedQuantity(event.target.value); updateProductPrice(); });
  productDialog.querySelector('#product-options').addEventListener('submit',event => {
    event.preventDefault();
    if (!selectedProduct) return;
    if (addToCart(selectedProduct.id,selectedVariant,document.querySelector('#product-quantity').value,productDialog.querySelector('#product-dialog-image'))) productDialog.close();
  });

  function cartTotal() { return cart.reduce((total,line) => total + priceFor(byId.get(line.id),line.variantId) * line.quantity,0); }
  function persistCart() {
    try { localStorage.setItem(STORAGE_KEY,JSON.stringify(cart)); } catch { /* Almacenamiento opcional. */ }
    const count = cart.reduce((total,line) => total + line.quantity,0);
    document.querySelectorAll('[data-cart-count]').forEach(element => { element.textContent = count; });
    document.querySelectorAll('[data-cart-open]').forEach(button => {
      if (button.closest('.pc-cart-toast')) return;
      button.setAttribute('aria-label',`Ver pedido, ${count} ${count === 1 ? 'producto' : 'productos'}`);
    });
    document.dispatchEvent(new CustomEvent('papas:cart-change',{detail:{count,total:cartTotal()}}));
  }
  function confirmAddition(product,quantity,source) {
    clearTimeout(toastTimer);
    toast.hidden = false;
    toast.querySelector('[role="status"]').textContent = `${quantity} × ${product.name} en tu pedido.`;
    toastTimer = setTimeout(() => { if (!toast.contains(document.activeElement)) toast.hidden = true; },6000);
    const target = document.querySelector('.header [data-cart-open]') || [...document.querySelectorAll('[data-cart-open]')].find(button => !button.closest('.pc-cart-toast'));
    if (!target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    target.classList.remove('pc-cart-pulse');
    requestAnimationFrame(() => target.classList.add('pc-cart-pulse'));
    const sourceImage = source?.matches?.('img') ? source : source?.querySelector?.('img');
    if (!sourceImage?.complete || !sourceImage.naturalWidth || !sourceImage.animate) return;
    const start = sourceImage.getBoundingClientRect();
    const end = target.getBoundingClientRect();
    if (!start.width || !start.height) return;
    const flying = sourceImage.cloneNode();
    flying.className = 'pc-cart-flight';
    flying.alt = '';
    flying.setAttribute('aria-hidden','true');
    flying.style.left = `${start.left + start.width / 2 - 35}px`;
    flying.style.top = `${start.top + start.height / 2 - 35}px`;
    document.body.append(flying);
    const dx = end.left + end.width / 2 - (start.left + start.width / 2);
    const dy = end.top + end.height / 2 - (start.top + start.height / 2);
    const flight = flying.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${dx * .5}px,${Math.min(-100,dy * .7)}px) scale(.8)`,opacity:1,offset:.5},{transform:`translate(${dx}px,${dy}px) scale(.15)`,opacity:0}],{duration:560,easing:'ease-in-out'});
    flight.finished.then(() => flying.remove(),() => flying.remove());
  }
  function addToCart(id,variantId = null,quantity = 1,source = null) {
    const product = byId.get(typeof id === 'string' ? id : id?.id);
    if (!product) return false;
    if (!purchasable(product) || (product.variants && !product.variants.some(variant => variant.id === variantId))) {
      openProduct(product.id,source);
      return false;
    }
    const count = boundedQuantity(quantity);
    const key = keyFor(product.id,variantId);
    const line = cart.find(item => keyFor(item.id,item.variantId) === key);
    if (line) line.quantity = boundedQuantity(line.quantity + count);
    else cart.push({id:product.id,variantId:variantId || null,quantity:count});
    persistCart();
    confirmAddition(product,count,source);
    return true;
  }
  function checkoutMessage() {
    const lines = cart.map(line => {
      const product = byId.get(line.id);
      const variant = product.variants?.find(item => item.id === line.variantId);
      return `• ${line.quantity} × ${displayName(product)}${variant ? ` (${variant.name})` : ''}: ${formatMoney(priceFor(product,line.variantId) * line.quantity)}`;
    });
    return `Hola, quiero consultar disponibilidad y confirmar este pedido en Papas y Café:\n\n${lines.join('\n')}\n\nSubtotal: ${formatMoney(cartTotal())} COP.\n¿Me confirman el precio vigente y cómo continuar?`;
  }
  function renderCart() {
    const list = cartDialog.querySelector('.pc-cart-lines');
    list.replaceChildren();
    if (!cart.length) {
      const empty = document.createElement('div');
      empty.className = 'pc-cart-empty';
      empty.innerHTML = '<p>Tu próximo antojo empieza aquí.</p><button class="button button-dark" type="button">Explorar la carta</button>';
      empty.querySelector('button').addEventListener('click',() => { cartDialog.close(); document.querySelector('#carta')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}); });
      list.append(empty);
    }
    cart.forEach(line => {
      const product = byId.get(line.id);
      const variant = product.variants?.find(item => item.id === line.variantId);
      const row = document.createElement('article');
      row.className = 'pc-cart-line';
      row.dataset.cartKey = keyFor(line.id,line.variantId);
      const image = document.createElement('div');
      image.className = 'pc-cart-line-image';
      applyTheme(image,product);
      image.append(productImage(product,true));
      const details = document.createElement('div');
      details.className = 'pc-cart-line-details';
      const name = Object.assign(document.createElement('h3'),{textContent:displayName(product)});
      details.append(name);
      if (variant) details.append(Object.assign(document.createElement('p'),{textContent:variant.name}));
      details.append(Object.assign(document.createElement('strong'),{textContent:formatMoney(priceFor(product,line.variantId) * line.quantity)}));
      const controls = document.createElement('div');
      controls.className = 'pc-cart-line-controls';
      const decrement = Object.assign(document.createElement('button'),{type:'button',textContent:'−'});
      const increment = Object.assign(document.createElement('button'),{type:'button',textContent:'+'});
      const remove = Object.assign(document.createElement('button'),{type:'button',textContent:'Quitar',className:'pc-cart-remove'});
      decrement.setAttribute('aria-label',`Quitar una unidad de ${product.name}${variant ? `, ${variant.name}` : ''}`);
      increment.setAttribute('aria-label',`Agregar una unidad de ${product.name}${variant ? `, ${variant.name}` : ''}`);
      remove.setAttribute('aria-label',`Quitar ${product.name}${variant ? `, ${variant.name}` : ''} del pedido`);
      increment.disabled = line.quantity >= 99;
      function changeQuantity(amount,focusAction) {
        line.quantity += amount;
        if (line.quantity <= 0) cart = cart.filter(item => item !== line);
        persistCart();
        renderCart();
        cartStatus.textContent = `Pedido actualizado. Subtotal: ${formatMoney(cartTotal())}.`;
        const replacement = [...cartDialog.querySelectorAll('.pc-cart-line')].find(item => item.dataset.cartKey === keyFor(line.id,line.variantId));
        (replacement?.querySelectorAll('.pc-cart-line-controls button')[focusAction] || cartDialog.querySelector('.dialog-close')).focus({preventScroll:true});
      }
      decrement.addEventListener('click',() => changeQuantity(-1,0));
      increment.addEventListener('click',() => changeQuantity(1,1));
      remove.addEventListener('click',() => changeQuantity(-line.quantity,0));
      controls.append(decrement,Object.assign(document.createElement('span'),{textContent:line.quantity}),increment,remove);
      details.append(controls);
      row.append(image,details);
      list.append(row);
    });
    cartDialog.querySelector('.pc-cart-footer').hidden = !cart.length;
    cartDialog.querySelector('#cart-total').textContent = formatMoney(cartTotal());
    cartDialog.querySelector('.pc-cart-checkout').href = whatsappUrl(checkoutMessage());
  }
  function openCart(opener) {
    if (productDialog.open) productDialog.close();
    toast.hidden = true;
    renderCart();
    showDialog(cartDialog,opener);
  }

  const grid = document.querySelector('#product-grid,#menu-grid');
  if (grid) products.forEach(product => {
    const card = document.createElement('article');
    card.className = 'menu-card';
    applyTheme(card,product);
    card.dataset.category = product.category;
    card.dataset.search = normalize(`${product.name} ${product.fullName || ''} ${product.description}`);
    const image = Object.assign(document.createElement('button'),{type:'button',className:'dish-image'});
    image.setAttribute('aria-label',`Ver ${displayName(product)} de cerca`);
    image.setAttribute('aria-haspopup','dialog');
    image.setAttribute('aria-controls','product-dialog');
    image.append(productImage(product));
    image.addEventListener('click',() => openProduct(product.id,image));
    if (product.label) image.append(Object.assign(document.createElement('span'),{className:'dish-label',textContent:product.label}));
    const zoom = Object.assign(document.createElement('span'),{className:'dish-zoom',textContent:'+'});
    zoom.setAttribute('aria-hidden','true');
    image.append(zoom);
    const body = Object.assign(document.createElement('div'),{className:'menu-card-body'});
    const heading = Object.assign(document.createElement('div'),{className:'dish-heading'});
    const title = document.createElement('h3');
    const titleButton = Object.assign(document.createElement('button'),{type:'button',className:'pc-product-title',textContent:product.name});
    titleButton.addEventListener('click',() => openProduct(product.id,titleButton));
    title.append(titleButton);
    heading.append(title);
    if (product.price) heading.append(Object.assign(document.createElement('span'),{className:'dish-price',textContent:product.price}));
    body.append(heading,Object.assign(document.createElement('p'),{className:'dish-description',textContent:product.description}));
    if (product.portions) {
      const portions = Object.assign(document.createElement('div'),{className:'portions'});
      product.portions.forEach(text => portions.append(Object.assign(document.createElement('span'),{textContent:text})));
      body.append(portions);
    }
    const bottom = Object.assign(document.createElement('div'),{className:'dish-bottom'});
    const detail = Object.assign(document.createElement('button'),{type:'button',className:'dish-detail-link',textContent:'Ver ingredientes'});
    detail.setAttribute('aria-label',`Ver ingredientes de ${displayName(product)}`);
    detail.addEventListener('click',() => openProduct(product.id,detail,true));
    const action = Object.assign(document.createElement('button'),{type:'button',className:'dish-link',textContent:product.variants ? 'Elegir tamaño' : purchasable(product) ? 'Agregar al pedido' : 'Consultar'});
    action.setAttribute('aria-label',`${action.textContent}: ${displayName(product)}`);
    action.addEventListener('click',() => {
      if (product.variants || !purchasable(product)) openProduct(product.id,action);
      else addToCart(product.id,null,1,image);
    });
    bottom.append(detail,action);
    body.append(bottom);
    if (product.note) body.append(Object.assign(document.createElement('small'),{className:'product-note',textContent:product.note}));
    card.append(image,body);
    grid.append(card);
  });

  const search = document.querySelector('#menu-search');
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  let currentFilter = 'todos';
  function applyFilters() {
    if (!grid) return;
    const query = normalize(search?.value.trim() || '');
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
    const status = document.querySelector('#filter-status');
    if (status) status.textContent = `${count} ${count === 1 ? 'plato para resolver ese antojo' : 'platos para resolver ese antojo'}${query ? ` · Búsqueda: “${search.value.trim()}”` : ''}.`;
    const empty = document.querySelector('.menu-empty');
    if (empty) empty.hidden = count !== 0;
  }
  filterButtons.forEach(button => button.addEventListener('click',() => { currentFilter = button.dataset.filter; applyFilters(); }));
  search?.addEventListener('input',applyFilters);
  document.querySelector('#reset-menu')?.addEventListener('click',() => { currentFilter='todos'; if (search) search.value=''; applyFilters(); search?.focus({preventScroll:true}); });
  const productCount = document.querySelector('#product-count');
  if (productCount) productCount.textContent = String(products.length).padStart(2,'0');
  const toolbar = document.querySelector('.menu-toolbar');
  if (toolbar) toolbar.hidden = false;
  applyFilters();

  document.addEventListener('click',event => {
    const cartButton = event.target.closest('[data-cart-open]');
    if (cartButton) { event.preventDefault(); openCart(cartButton); return; }
    const productButton = event.target.closest('[data-product-open]');
    if (productButton) { event.preventDefault(); openProduct(productButton.dataset.productOpen,productButton,productButton.hasAttribute('data-ingredients')); }
  });
  document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href=whatsappUrl(link.dataset.whatsapp); });
  document.documentElement.classList.add('js-ready');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  function closeNav() {
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded','false');
    toggle?.setAttribute('aria-label','Abrir menú');
  }
  toggle?.addEventListener('click',() => {
    const expanded = toggle.getAttribute('aria-expanded') !== 'true';
    nav?.classList.toggle('open',expanded);
    toggle.setAttribute('aria-expanded',String(expanded));
    toggle.setAttribute('aria-label',expanded ? 'Cerrar menú' : 'Abrir menú');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click',closeNav));
  document.addEventListener('click',event => { if (nav?.classList.contains('open') && !event.target.closest('.header')) closeNav(); });
  window.matchMedia('(min-width: 901px)').addEventListener('change',event => { if (event.matches) closeNav(); });
  document.addEventListener('keydown',event => { if (event.key === 'Escape' && nav?.classList.contains('open')) { closeNav(); toggle?.focus(); } });
  const copyButton = document.querySelector('.copy-address');
  if (copyButton) {
    copyButton.hidden = false;
    copyButton.addEventListener('click',async () => {
      const status = document.querySelector('.copy-status');
      try { await navigator.clipboard.writeText('Papas y Café · Parque Industrial, Ciudad Boquía, Mz. 12, casa 18, local 2 · Pereira'); if (status) status.textContent='¡Dirección copiada!'; }
      catch { if (status) status.textContent='Mz. 12, casa 18, local 2 · Ciudad Boquía, Parque Industrial, Pereira.'; }
    });
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = new Intl.DateTimeFormat('es-CO',{year:'numeric',timeZone:'America/Bogota'}).format(new Date());
  persistCart();
  window.PapasCatalog = {products,openProduct,addToCart,openCart,formatMoney,productImage,applyTheme,whatsappUrl,getCart:() => cart.map(line => ({...line,unitPrice:priceFor(byId.get(line.id),line.variantId)}))};
  document.dispatchEvent(new CustomEvent('catalog:ready'));
})();
