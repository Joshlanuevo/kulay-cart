import { FlatList, Text, View } from 'react-native';

import { CartItemRow } from '@/components/cart-item-row';
import { VoucherInput } from '@/components/voucher-input';
import { STRINGS } from '@/constants/strings';
import { useCart } from '@/hooks/use-cart';
import { formatPeso } from '@/utils/format';
import { getVoucherPercent } from '@/utils/voucher';

export default function CartScreen() {
  const { items, itemCount, subtotal, discount, total, voucherCode } = useCart();

  if (items.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-brand-light">
        <Text className="text-lg text-gray-500">{STRINGS.emptyCart}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-brand-light">
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => <CartItemRow item={item} />}
        contentContainerClassName="p-4 gap-3"
      />

      {/* Summary at the bottom */}
      <View className="gap-2 border-t border-pink-100 bg-white p-4">
        <VoucherInput />

        <View className="flex-row justify-between">
          <Text className="text-gray-600">{STRINGS.items}</Text>
          <Text className="text-gray-900">{itemCount}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600">{STRINGS.subtotal}</Text>
          <Text className="text-gray-900">{formatPeso(subtotal)}</Text>
        </View>

        {discount > 0 && voucherCode && (
          <View className="flex-row justify-between">
            <Text className="text-green-700">
              {STRINGS.discount} ({getVoucherPercent(voucherCode)}%)
            </Text>
            <Text className="text-green-700">−{formatPeso(discount)}</Text>
          </View>
        )}

        <View className="flex-row justify-between">
          <Text className="text-xl font-bold text-gray-900">{STRINGS.total}</Text>
          <Text className="text-xl font-bold text-brand">{formatPeso(total)}</Text>
        </View>
      </View>
    </View>
  );
}
