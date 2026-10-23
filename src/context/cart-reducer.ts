import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: 'ADD'; product: Product }
  | { type: 'INCREASE'; productId: string }
  | { type: 'DECREASE'; productId: string }
  | { type: 'REMOVE'; productId: string }
  | { type: 'CLEAR' };

export const initialCartState: CartState = { items: [] };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const exists = state.items.some(item => item.product.id === action.product.id);
      if (exists) {
        return {
          items: state.items.map(item =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return { items: [...state.items, { product: action.product, quantity: 1 }] };
    }
    case 'INCREASE':
      return {
        items: state.items.map(item =>
          item.product.id === action.productId ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      };
    case 'DECREASE':
      return {
        items: state.items
          .map(item =>
            item.product.id === action.productId ? { ...item, quantity: item.quantity - 1 } : item,
          )
          .filter(item => item.quantity > 0), // quantity 0 → removed
      };
    case 'REMOVE':
      return { items: state.items.filter(item => item.product.id !== action.productId) };
    case 'CLEAR':
      return initialCartState;
  }
}