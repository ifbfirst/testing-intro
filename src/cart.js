function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, count) {
  if (count <= 0) throw new RangeError();
  
  const item = cart.find(p => p.id === product.id);
  const total = (item ? item.quantity : 0) + count;
  
  if (total > product.stock) throw new RangeError();
  
  if (item) item.quantity = total;
  else cart.push({ ...product, quantity: count });
  
  return cart;
}



  
 


function changeQuantity(cart, productId, count) {
  if (count <= 0) throw new RangeError();
  
  const item = cart.find(p => p.id === productId);
  if (!item) return cart; 
  
  if (count > item.stock) throw new RangeError();
  
  item.quantity = count;
  return cart;
}


function removeFromCart(cart, productId) { 

  return cart.filter((p)=>p.id !==productId);

}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  
  const discount = (promoCode === 'SAVE10' && subtotal >= 20000) 
    ? Math.floor(subtotal * 0.1) 
    : 0;
    
  const delivery = subtotal >= 50000 ? 0 : 30000;
  
  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery
  };
}


const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
