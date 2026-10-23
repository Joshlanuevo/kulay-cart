import { Stack } from 'expo-router';
import '../../global.css';

import { CartBadge } from '@/components/cart-badge';
import { CartProvider } from '@/context/cart-context';

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Kulay Menu',
            headerRight: () => <CartBadge />,
          }}
        />
      </Stack>
    </CartProvider>
  );
}
