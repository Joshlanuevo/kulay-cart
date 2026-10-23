// Voucher codes and their discount rate (0.1 = 10%)
const VOUCHERS: Record<string, number> = {
  DISCOUNT10: 0.1,
};

export function getVoucherRate(code: string): number | null {
  return VOUCHERS[code.trim().toUpperCase()] ?? null;
}

// "DISCOUNT10" → 10 (0 if the code is invalid)
export function getVoucherPercent(code: string): number {
  return Math.round((getVoucherRate(code) ?? 0) * 100);
}
