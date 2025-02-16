export const numberFormatter = (value: number, digits = 2) =>
  value.toLocaleString('en-US', {
    minimumFractionDigits: digits
  })
