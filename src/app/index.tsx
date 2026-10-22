import { ProductCard } from '@/components/product-card';
import { PRODUCTS } from '@/data/products';
import { FlatList } from 'react-native';

export default function MenuScreen() {
  return (
    <FlatList 
      data={PRODUCTS}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <ProductCard product={item} />}
      contentContainerClassName='p-4 gap-3'
    />
  )
}