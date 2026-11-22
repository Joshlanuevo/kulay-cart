import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProductCard } from '@/components/product-card';
import { PRODUCTS } from '@/data/products';

export default function MenuScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-brand-light">
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerClassName="p-4 gap-3"
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
      />
    </View>
  );
}
