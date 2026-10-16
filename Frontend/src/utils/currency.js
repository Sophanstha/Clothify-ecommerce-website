/**
 * Currency configuration for Clothify (Nepal / NPR / Rs.)
 */
export const CURRENCY = "Rs.";

export const formatPrice = (amount, decimals = 2) => {
  const num = Number(amount);
  if (isNaN(num)) return `${CURRENCY} 0`;
  
  // Format with standard thousands separator (e.g. Rs. 1,200 or Rs. 85.00)
  return `${CURRENCY} ${num.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
};

export default CURRENCY;
