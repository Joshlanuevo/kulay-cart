import { CartContext } from '@/context/cart-context';
import { useContext } from 'react';

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return cart;
}
