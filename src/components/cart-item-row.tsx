import { Pressable, Text, View } from 'react-native';

import { STRINGS } from '@/constants/strings';
import { useCart } from '@/hooks/use-cart';
import type { CartItem } from '@/types/cart';
import { formatPeso } from '@/utils/format';

export function CartItemRow({ item }: { item: CartItem }) {
  const { increase, decrease, removeFromCart } = useCart();
  const { id, productName, price } = item.product;

  return (
    <View className="gap-2 rounded-2xl border border-pink-100 bg-white p-4">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-2">
          <Text className="text-base font-bold text-gray-900">{productName}</Text>
          <Text className="text-sm text-gray-500">
            {formatPeso(price)} {STRINGS.each}
          </Text>
        </View>
        <Text className="text-base font-semibold text-gray-900">
          {formatPeso(price * item.quantity)}
        </Text>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <Pressable
            className="h-8 w-8 items-center justify-center rounded-full bg-pink-100"
            onPress={() => decrease(id)}
            accessibilityLabel={`${STRINGS.decrease} ${productName}`}
          >
            <Text className="text-lg font-bold text-brand">−</Text>
          </Pressable>
          <Text className="w-6 text-center text-base font-semibold">{item.quantity}</Text>
          <Pressable
            className="h-8 w-8 items-center justify-center rounded-full bg-pink-100"
            onPress={() => increase(id)}
            accessibilityLabel={`${STRINGS.increase} ${productName}`}
          >
            <Text className="text-lg font-bold text-brand">+</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => removeFromCart(id)}
          accessibilityLabel={`${STRINGS.remove} ${productName}`}
        >
          <Text className="font-semibold text-red-500">{STRINGS.remove}</Text>
        </Pressable>
      </View>
    </View>
  );
}
