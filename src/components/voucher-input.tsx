import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { useCart } from '@/hooks/use-cart';

export function VoucherInput() {
    const { voucherCode, applyVoucher, removeVoucher } = useCart();
    const [code, setCode] = useState('');                     // what the user is typing
    const [error, setError] = useState<string | null>(null);  // "Invalid voucher code"

    const handleApply = () => {
        if (applyVoucher(code)) {
            setCode('');
        } else {
            setError('Invalid voucher code');
        }
    };

    // Case 1: a voucher is already applied
    if (voucherCode) {
        return (
            <View className="flex-row items-center justify-between bg-green-50 rounded-xl p-3">
                <Text className="text-green-700 font-semibold">{voucherCode} applied · 10% off</Text>
                <Pressable onPress={removeVoucher}>
                    <Text className="text-red-500 font-semibold">Remove</Text>
                </Pressable>
            </View>
        );
    }

    // Case 2: no voucher yet, showing the input
    return (
        <View className="gap-1">
            <View className="flex-row items-center gap-2">
                <TextInput
                    value={code}
                    onChangeText={text => {
                        setCode(text);
                        setError(null); // clear the error while typing
                    }}
                    placeholder="Enter voucher code"
                    autoCapitalize="characters"
                    className="flex-1 bg-white border border-pink-200 rounded-xl px-3 py-2"
                />
                <Pressable onPress={handleApply} className="bg-pink-600 rounded-xl px-4 py-2">
                    <Text className="text-white font-semibold">Apply</Text>
                </Pressable>
            </View>
            {error && <Text className="text-red-500 text-sm">{error}</Text>}
        </View>
    );
}
