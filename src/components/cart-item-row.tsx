import { useCart } from "@/hooks/use-cart";
import type { CartItem } from "@/types/cart";
import { Pressable, Text, View } from "react-native";


export function CartItemRow({ item }: { item: CartItem }) {
    const { increase, decrease, removeFromCart } = useCart();

    return (
        <View className='bg-white rounded-2xl p-4 gap-2 border border-pink-100'>
            <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-2">
                    <Text className="text-base font-bold text-gray-900">{item.product.productName}</Text>
                    <Text className="text-sm text-gray-500">₱{item.product.price.toFixed(2)} each</Text>
                </View>
                <Text className="text-base font-semibold text-gray-900">
                    ₱{(item.product.price * item.quantity).toFixed(2)}
                </Text>
            </View>

            <View className="flex-row items-center justify-between">
                <View className='flex-row items-center gap-3'>
                    <Pressable
                        className="w-8 h-8 rounded-full bg-pink-100 items-center justify-center"
                        onPress={() => decrease(item.product.id)}
                    >
                        <Text className='text-pink-600 font-bold text-lg'>-</Text>
                    </Pressable>
                    <Text className="text-base font-semibold w-6 text-center">{item.quantity}</Text>
                    <Pressable
                        className="w-8 h-8 rounded-full bg-pink-100 items-center justify-center"
                        onPress={() => increase(item.product.id)}
                    >
                        <Text className='text-pink-600 font-bold text-lg'>+</Text>
                    </Pressable>
                </View>
                <Pressable onPress={() => removeFromCart(item.product.id)}>
                    <Text className="text-red-500 font-semibold">Remove</Text>
                </Pressable>
            </View>
        </View>
    )
}