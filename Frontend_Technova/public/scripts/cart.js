const CART_KEY = 'techperipherals_cart';

// Obtener carrito
function getCart() {
  if (typeof window === 'undefined') return [];
  try {
    const cart = localStorage.getItem(CART_KEY);
  const parsedCart = cart ? JSON.parse(cart) : [];
    return parsedCart;
  } catch (error) {
    console.error('Error parsing cart from localStorage:', error);
    return [];
  }
}

// Guardar carrito
function saveCart(cart) {
  try {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
    dispatchCartEvent();
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
}

// Disparar evento de actualización
function dispatchCartEvent() {
  window.dispatchEvent(new CustomEvent('cartUpdated'));
}

// API Pública del Carrito
const cart = {
  // Añadir al carrito
  add: (product, quantity = 1) => {
  // add called
    const cartItems = getCart();
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
  // updated existing
    } else {
      const newItem = {
        id: product.id,
        name: product.title || product.name,
        price: parseFloat(product.price),
        image: product.image,
        quantity: parseInt(quantity)
      };
      cartItems.push(newItem);
  // added new
    }
    
    saveCart(cartItems);
  const newCount = cart.count();
    return newCount;
  },

  // Eliminar del carrito
  remove: (productId) => {
  // removing item
    const cartItems = getCart();
    const initialLength = cartItems.length;
    
    // Encontrar el índice del item a eliminar
    const itemIndex = cartItems.findIndex(item => {
  // comparing ids
      // Convertir ambos a string para comparación consistente
      return String(item.id) === String(productId);
    });
    
  // item index
    
    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      saveCart(cartItems);
  // item removed
    } else {
      console.warn('No item found with ID:', productId);
      console.log('Available items:', cartItems.map(item => ({id: item.id, name: item.name})));
    }
  },

  // Actualizar cantidad
  update: (productId, newQuantity) => {
    // updating item
    const cartItems = getCart();
    const item = cartItems.find(item => String(item.id) === String(productId));
    
    if (item) {
      if (newQuantity <= 0) {
        // Si la cantidad es 0 o menos, eliminar el item
        cart.remove(productId);
        return;
      }
      
      item.quantity = Math.max(1, parseInt(newQuantity));
      saveCart(cartItems);
  // item updated
    } else {
      console.warn('Item not found for update:', productId);
      console.log('Available items:', cartItems.map(item => ({id: item.id, name: item.name})));
    }
  },

  // Obtener todos los items
  items: () => {
    const items = getCart();
    // cart.items called
    return items;
  },

  // Contar items totales
  count: () => {
    const items = getCart();
    const count = items.reduce((total, item) => total + parseInt(item.quantity || 0), 0);
  // cart.count called
    return count;
  },

  // Calcular total
  total: () => {
    const items = getCart();
    const total = items.reduce((total, item) => {
      const price = parseFloat(item.price || 0);
      const quantity = parseInt(item.quantity || 0);
      return total + (price * quantity);
    }, 0);
  // cart.total called
    return total;
  },

  // Limpiar carrito
  clear: () => {
    saveCart([]);
  // cart cleared
  },

  // Manejar visibilidad del carrito
  open: () => {
  // opening cart drawer
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    
    if (drawer) {
      drawer.classList.remove('translate-x-full');
      drawer.classList.add('translate-x-0');
      document.body.style.overflow = 'hidden';
  // drawer opened
    } else {
      console.error('Cart drawer element not found');
    }
    
    if (overlay) {
      overlay.classList.remove('hidden');
    }
  },

  close: () => {
  // closing cart drawer
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    
    if (drawer) {
      drawer.classList.add('translate-x-full');
      drawer.classList.remove('translate-x-0');
      document.body.style.overflow = '';
  // drawer closed
    }
    
    if (overlay) {
      overlay.classList.add('hidden');
    }
  },

  // Inicializar carrito
  init: () => {
  // initializing cart
    updateCartUI();
    
    // Remover listener anterior si existe
    window.removeEventListener('cartUpdated', updateCartUI);
    window.addEventListener('cartUpdated', updateCartUI);
    
    // Agregar event listener para cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        cart.close();
      }
    });
    
  // cart initialized
  }
};

// Actualizar UI del carrito
function updateCartUI() {
  // updating cart UI
  
  // Forzar recálculo desde localStorage
  const currentCount = cart.count();
  const currentTotal = cart.total();
  
  // UI update
  
  // Actualizar contador del ícono
  const countElements = document.querySelectorAll('[data-cart-count]');
  countElements.forEach(el => {
    el.textContent = currentCount;
  // updated cart count element
  });

  // Actualizar totales
  const totalElements = document.querySelectorAll('[data-cart-total]');
  totalElements.forEach(el => {
    el.textContent = currentTotal.toFixed(2);
  // updated cart total element
  });
  
  // Actualizar contenido del drawer si existe
  updateCartDrawerContent();
}

// Actualizar contenido del drawer
function updateCartDrawerContent() {
  const cartItemsContainer = document.getElementById('cart-items-container');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const cartItems = cart.items();
  
  // updating drawer content
  
  if (cartItemsContainer) {
    if (cartItems.length === 0) {
      if (emptyCartMessage) emptyCartMessage.style.display = 'block';
      cartItemsContainer.style.display = 'none';
    } else {
      if (emptyCartMessage) emptyCartMessage.style.display = 'none';
      cartItemsContainer.style.display = 'block';
      
      // Regenerar items del carrito
      cartItemsContainer.innerHTML = cartItems.map(item => {
        // Asegurar que el ID sea seguro para usar en HTML
        const safeId = String(item.id).replace(/['"]/g, '');
        const safeName = String(item.name).replace(/['"]/g, '&quot;');
        
        return `
        <div class="flex items-center py-4 border-b border-gray-700" data-item-id="${safeId}">
          <div class="flex-shrink-0">
            <img src="${item.image}" alt="${safeName}" class="w-20 h-20 object-cover rounded-md">
          </div>
          <div class="ml-4 flex-grow">
            <h3 class="text-white font-medium">${safeName}</h3>
            <p class="text-gray-400">S/. ${parseFloat(item.price).toFixed(2)}</p>
          </div>
          <div class="flex items-center">
            <div class="flex items-center border border-gray-600 rounded-md">
              <button onclick="cart.update('${safeId}', ${item.quantity - 1})" class="px-3 py-1 text-gray-400 hover:text-white" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
              <span class="px-3 py-1 text-white">${item.quantity}</span>
              <button onclick="cart.update('${safeId}', ${item.quantity + 1})" class="px-3 py-1 text-gray-400 hover:text-white">+</button>
            </div>
            <button onclick="cart.remove('${safeId}')" class="ml-4 text-red-500 hover:text-red-400" title="Eliminar producto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>`;
      }).join('');
    }
  }
}

// Función de depuración
function debugCart() {
  // debugCart output suppressed
}

// Hacer disponible globalmente
if (typeof window !== 'undefined') {
  window.cart = cart;
  window.debugCart = debugCart; // Para depuración
  // cart made available globally
}

export { cart };