import { SEGMENT_TYPE } from './constants'
import { convertToFraction } from './utils'

const parseSegmentInt = (string) => string.length > 0 ? parseInt(string) : 0

export const NumberSegment = () => {
  const segment = {
    type: SEGMENT_TYPE.number,
    integer: '',
    numerator: '',
    denominator: ''
  }

  segment.compute = () => {
    return parseSegmentInt(segment.integer) + (segment.denominator.length > 0 ? (parseSegmentInt(segment.numerator) / parseSegmentInt(segment.denominator)) : 0)
  }

  return segment
}

export const buildNumberSegment = (value, roundingStrategy, roundingAccuracy) => {
  const segment = NumberSegment()
  segment.integer = Math.trunc(value)
  const decimal = value - segment.integer
  const roundedDecimal = roundingStrategy(decimal * roundingAccuracy) / roundingAccuracy
  const fraction = convertToFraction(roundedDecimal)
  if (fraction.numerator !== 0) {
    segment.numerator = fraction.numerator
    segment.denominator = fraction.denominator
  }

  return segment
}

export const buildOperationalSegment = (operation) => {
  return {
    type: SEGMENT_TYPE.operational,
    operation
  }
}

export const calculateSegments = (segments) => {
  const allCalculationSegments = segments
  const firstSegment = allCalculationSegments.shift()

  let sum = firstSegment.compute()
  let currentOperation = null

  // Calculate in order from left to right instead of 'pemdas'
  allCalculationSegments.forEach(segment => {
    if (segment.type === SEGMENT_TYPE.number) {
      sum = eval(`${sum}${currentOperation}${segment.compute()}`)
      currentOperation = null
    } else if (segment.type === SEGMENT_TYPE.operational) {
      currentOperation = segment.operation
    }
  })

  return sum
}