// Cliente: si la página SSR recibió resultados vacíos o query vacío, intenta obtener resultados desde el cliente
// Expose a performSearch function so other scripts (header) can trigger an in-place search
window.performSearch = async function(q) {
  try {
    const container = document.getElementById('search-results');
    if (!container) return;
  // Use relative API path so dev proxy (vite) can forward to backend and avoid CORS
  const apiUrl = `/api/productos/buscar?nombre=${encodeURIComponent(q)}`;
  const res = await fetch(apiUrl, { credentials: 'same-origin' });
    if (!res.ok) return;
    const data = await res.json();
    const productos = Array.isArray(data) ? data : (data.data ? data.data.map(i => i.attributes ? { id: i.id, ...i.attributes } : i) : []);
    if (productos.length === 0) {
      container.innerHTML = `<div class="text-center py-12 bg-white rounded-lg shadow-sm">No se encontraron productos</div>`;
      const countEl = document.getElementById('products-count');
      if (countEl) countEl.textContent = `Mostrando 0 productos`;
      return;
    }

    const gridHtml = productos.map(prod => `
      <article class="producto-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group" data-category="${(prod.categoria||'')}" data-marca="${(prod.marca||'')}" data-price="${prod.precio||0}">
        <div class="relative overflow-hidden">
          <a href="/productos/detalle/${prod.id}">
            <img src="${prod.imagen || '/placeholder.png'}" alt="${prod.nombre}" class="w-full h-60 object-cover" loading="lazy" />
          </a>
          <span class="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">${prod.categoria || ''}</span>
        </div>
        <div class="p-5">
          <div class="flex justify-between items-start mb-2">
            <span class="text-xs font-semibold text-gray-500">${prod.marca || ''}</span>
          </div>
          <a href="/productos/detalle/${prod.id}">
            <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2">${prod.nombre}</h3>
          </a>
          <div class="flex justify-between items-center mt-4">
            <div>
              <span class="text-xl font-bold text-blue-600">S/. ${(prod.precio||0).toFixed(2)}</span>
            </div>
            <button onclick="cart.add({ id: ${prod.id}, title: '${(prod.nombre||'').replace(/'/g, "\\'")}', price: ${prod.precio||0}, image: '${(prod.imagen||'').replace(/'/g, "\\'")}' }, 1)" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg">Agregar</button>
          </div>
        </div>
      </article>
    `).join('');

    container.innerHTML = `<div id="productos-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">${gridHtml}</div>`;
    const countEl = document.getElementById('products-count');
    if (countEl) countEl.textContent = `Mostrando ${productos.length} producto${productos.length !== 1 ? 's' : ''}`;
    try { window.dispatchEvent(new Event('filters:refresh')); } catch (e) {}
  } catch (err) {
    console.error('performSearch error', err);
    // Mostrar mensaje de error en la UI en vez de forzar una navegación completa.
    try {
      const container = document.getElementById('search-results');
      const countEl = document.getElementById('products-count');
      if (container) {
        container.innerHTML = `<div class="text-center py-12 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg shadow-sm">Ocurrió un error al buscar. Intenta de nuevo más tarde.</div>`;
      }
      if (countEl) countEl.textContent = `Mostrando 0 productos`;
      // Emitir un evento para que otros scripts (si los hay) lo reciban
      try { window.dispatchEvent(new CustomEvent('search:error', { detail: { query: q, error: err } })); } catch (e) {}
    } catch (e) {
      // No hacer nada si incluso el manejo del error falla
    }
    return;
  }
};

// Allow other scripts to dispatch a search:perform event
window.addEventListener('search:perform', (e) => {
  const q = (e.detail && e.detail.query) || '';
  if (q) window.performSearch(q);
});