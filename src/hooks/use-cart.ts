import { useContext } from 'react';

import { CartContext } from '@/context/cart-context';

// Custom hook: any component can read and update the cart with useCart()
export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return cart;
}
