import { Pressable, Text, View } from 'react-native';

import { STRINGS } from '@/constants/strings';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/types/product';
import { formatPeso } from '@/utils/format';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <View className="gap-1 rounded-2xl border border-pink-100 bg-white p-4">
      <Text className="text-lg font-bold text-gray-900">{product.productName}</Text>
      <Text className="text-sm text-gray-600">{product.description}</Text>
      <Text className="text-base font-semibold text-brand">{formatPeso(product.price)}</Text>
      <Pressable
        onPress={() => addToCart(product)}
        className="mt-2 items-center rounded-xl bg-brand py-2"
        accessibilityLabel={`${STRINGS.addToCart}: ${product.productName}`}
      >
        <Text className="font-semibold text-white">{STRINGS.addToCart}</Text>
      </Pressable>
    </View>
  );
}
