import { CartItemRow } from "@/components/cart-item-row";
import { FlatList, Text, View } from "react-native";

import { useCart } from "@/hooks/use-cart";

export default function CartScreen() {
    const { items, itemCount, subtotal } = useCart();

    if (items.length === 0) {
        return (
            <View className="flex-1 items-center justify-center bg-pink-50">
                <Text className="text-lg text-gray-500">Your cart is empty</Text>
            </View>
        )
    }

    return (
        <View className="flex-1 bg-pink-50">
            <FlatList
                data={items}
                keyExtractor={item => item.product.id}
                renderItem={({ item }) => <CartItemRow item={item} />}
                contentContainerClassName="p-4 gap-3"
            />

            {/* Summary at the bottom */}
            <View className="bg-white p-4 gap-1 border-t border-pink-100">
                <Text className="text-gray-600">Items: {itemCount}</Text>
                <Text className="text-xl font-bold text-gray-900">
                    Total: ₱{subtotal.toFixed(2)}
                </Text>
            </View>
        </View>
    )
}