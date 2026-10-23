// 1234.5 → "₱1,234.50"
// Formats by hand instead of toLocaleString, so the output is the same on every device.
export function formatPeso(amount: number): string {
  const [whole, cents] = amount.toFixed(2).split('.');
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `₱${withCommas}.${cents}`;
}
