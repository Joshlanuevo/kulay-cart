import { Pressable, Text, View } from 'react-native';

import { useCart } from '@/hooks/use-cart';
import { Link } from 'expo-router';

export function CartBadge() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart" asChild>
      <Pressable className='mr-4 flex-row items-center gap-1'>
        <Text className="font-semibold text-gray-900">Cart</Text>
        <View className="min-w-6 h-6 px-1.5 rounded-full bg-pink-600 items-center justify-center">
          <Text className="text-xs font-bold text-white">{itemCount}</Text>
        </View>
      </Pressable>
    </Link>
  );
}
