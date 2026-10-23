import { Stack } from 'expo-router';
import '../../global.css';

import { CartBadge } from '@/components/cart-badge';
import { STRINGS } from '@/constants/strings';
import { CartProvider } from '@/context/cart-context';

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: STRINGS.menuTitle,
            headerRight: () => <CartBadge />,
          }}
        />
        <Stack.Screen name="cart" options={{ title: STRINGS.cartTitle }} />
      </Stack>
    </CartProvider>
  );
}
