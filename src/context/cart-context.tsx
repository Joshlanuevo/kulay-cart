import { createContext, useMemo, useReducer, type ReactNode } from 'react';

import type { CartItem } from '@/types/cart';
import type { Product } from '@/types/product';
import { cartReducer, initialCartState } from './cart-reducer';

export interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (product: Product) => void;
  increase: (productId: string) => void;
  decrease: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // useMemo: recalculated only when the cart items change
  const itemCount = useMemo(
    () => state.items.reduce((count, item) => count + item.quantity, 0),
    [state.items],
  );
  const subtotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [state.items],
  );

  const value: CartContextValue = {
    items: state.items,
    itemCount,
    subtotal,
    addToCart: product => dispatch({ type: 'ADD', product }),
    increase: productId => dispatch({ type: 'INCREASE', productId }),
    decrease: productId => dispatch({ type: 'DECREASE', productId }),
    removeFromCart: productId => dispatch({ type: 'REMOVE', productId }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
