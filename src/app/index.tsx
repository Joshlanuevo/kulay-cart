import { FlatList, View } from 'react-native';

import { ProductCard } from '@/components/product-card';
import { PRODUCTS } from '@/data/products';

export default function MenuScreen() {
  return (
    <View className="flex-1 bg-brand-light">
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerClassName="p-4 gap-3"
      />
    </View>
  );
}
