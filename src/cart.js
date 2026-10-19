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

function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
