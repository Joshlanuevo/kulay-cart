import { Pressable, Text, View } from 'react-native';

import { Link } from 'expo-router';

import { STRINGS } from '@/constants/strings';
import { useCart } from '@/hooks/use-cart';

export function CartBadge() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart" asChild>
      <Pressable
        className="mr-4 flex-row items-center gap-1"
        accessibilityLabel={`${STRINGS.cart}, ${itemCount} ${STRINGS.items.toLowerCase()}`}
      >
        <Text className="font-semibold text-gray-900">{STRINGS.cart}</Text>
        <View className="h-6 min-w-6 items-center justify-center rounded-full bg-brand px-1.5">
          <Text className="text-xs font-bold text-white">{itemCount}</Text>
        </View>
      </Pressable>
    </Link>
  );
}
