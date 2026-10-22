import { Product } from "@/types/product";
import { Pressable, Text, View } from "react-native";

export function ProductCard({ product }: { product: Product }) {
    return (
        <View className='bg-white rounded-2xl p-4 gap-1 border border-pink-100'>
            <Text className='text-lg font-bold text-gray-900'>{product.productName}</Text>
            <Text className='text-sm text-gray-600'>{product.description}</Text>
            <Text className='text-base font-semibold text-pink-600'>{product.price}</Text>
            <Pressable
                className='mt-2 bg-pink-600 rounded-xl py-2 items-center'
            >
                <Text className='text-white font-semibold'>Add to Cart</Text>
            </Pressable>
        </View>
    )
}