import { getVoucherRate } from '@/utils/voucher';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react';

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
  voucherCode: string | null;
  discount: number;
  total: number;
  applyVoucher: (code: string) => boolean;
  removeVoucher: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'kulay-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [voucherCode, setVoucherCode] = useState<string | null>(null);

  // load the saved cart once, when the app starts
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(saved => {
        if (!saved) return;
        const data = JSON.parse(saved);
        dispatch({ type: 'HYDRATE', items: data.items ?? [] });
        setVoucherCode(data.voucherCode ?? null);
      })
      .catch(() => {
        // corrupted or unreadable data: just start with an empty cart
      })
      .finally(() => setIsLoaded(true));
  }, []);

  // save whenever the cart or the voucher changes
  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items, voucherCode }));
  }, [state.items, voucherCode, isLoaded]);

  // useMemo: recalculated only when the cart items change
  const itemCount = useMemo(
    () => state.items.reduce((count, item) => count + item.quantity, 0),
    [state.items],
  );
  const subtotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [state.items],
  );

  // useMemo: recalculated only when the subtotal or the voucher changes
  const discount = useMemo(() => {
    if (!voucherCode) return 0;
    const rate = getVoucherRate(voucherCode) ?? 0;
    return Math.round(subtotal * rate * 100) / 100; // round to centavos
  }, [subtotal, voucherCode]);

  const total = subtotal - discount;

  const value: CartContextValue = {
    items: state.items,
    itemCount,
    subtotal,
    addToCart: product => dispatch({ type: 'ADD', product }),
    increase: productId => dispatch({ type: 'INCREASE', productId }),
    decrease: productId => dispatch({ type: 'DECREASE', productId }),
    removeFromCart: productId => dispatch({ type: 'REMOVE', productId }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
    voucherCode,
    discount,
    total,
    applyVoucher: code => {
      if (getVoucherRate(code) === null) return false // invalid code
      setVoucherCode(code.trim().toUpperCase());
      return true;
    },
    removeVoucher: () => setVoucherCode(null),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
