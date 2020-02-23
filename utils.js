const greatestCommonDenominator = function (a, b) {
  if (b < 0.0000001) {
    return a
  }

  return greatestCommonDenominator(b, Math.floor(a % b)) // handle LIMIT 0
}
export const convertToFraction = (decimal) => {
  let len = decimal.toString().length - 2

  let denominator = Math.pow(10, len)
  let numerator = decimal * denominator

  let divisor = greatestCommonDenominator(numerator, denominator)

  numerator = Math.floor(numerator / divisor)
  denominator = Math.floor(denominator / divisor)

  return {numerator, denominator}
}