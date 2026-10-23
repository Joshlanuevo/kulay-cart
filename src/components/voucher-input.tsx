import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { STRINGS } from '@/constants/strings';
import { useCart } from '@/hooks/use-cart';
import { getVoucherPercent } from '@/utils/voucher';

export function VoucherInput() {
  const { voucherCode, applyVoucher, removeVoucher } = useCart();
  const [code, setCode] = useState(''); // what the user is typing
  const [error, setError] = useState<string | null>(null); // "Invalid voucher code"

  const handleApply = () => {
    if (applyVoucher(code)) {
      setCode('');
    } else {
      setError(STRINGS.invalidVoucher);
    }
  };

  // Case 1: a voucher is already applied
  if (voucherCode) {
    return (
      <View className="flex-row items-center justify-between rounded-xl bg-green-50 p-3">
        <Text className="font-semibold text-green-700">
          {voucherCode} {STRINGS.applied} · {getVoucherPercent(voucherCode)}% {STRINGS.off}
        </Text>
        <Pressable onPress={removeVoucher} accessibilityLabel={`${STRINGS.remove} ${voucherCode}`}>
          <Text className="font-semibold text-red-500">{STRINGS.remove}</Text>
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
          onChangeText={(text) => {
            setCode(text);
            setError(null); // clear the error while typing
          }}
          onSubmitEditing={handleApply}
          placeholder={STRINGS.voucherPlaceholder}
          autoCapitalize="characters"
          autoCorrect={false}
          returnKeyType="done"
          className="flex-1 rounded-xl border border-pink-200 bg-white px-3 py-2"
        />
        <Pressable onPress={handleApply} className="rounded-xl bg-brand px-4 py-2">
          <Text className="font-semibold text-white">{STRINGS.apply}</Text>
        </Pressable>
      </View>
      {error && <Text className="text-sm text-red-500">{error}</Text>}
    </View>
  );
}
