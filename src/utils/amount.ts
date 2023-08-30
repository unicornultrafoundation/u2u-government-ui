export const shortenDisplayNumber = (value: string | number, prefix: string = '', fractionDigits: number = 2) => {
  if (Number(value) < 0.001) {
    return `${prefix} < 0.001`
  }
  let valueInStr = String(value)
  const _value = Number(value)
  if (_value >= 1e9) {
    valueInStr = String((_value / 1e9).toFixed(2)) + 'B'
  } else if (_value >= 1e6) {
    valueInStr = String((_value / 1e6).toFixed(2)) + 'M'
  } else if (_value >= 1e4) {
    valueInStr = String((_value / 1e3).toFixed(2)) + 'K'
  } else {
    valueInStr = String((_value).toFixed(fractionDigits))
  }
  return `${prefix}${formatThousandDelimiter(valueInStr)}`
}

export const formatThousandDelimiter = (value: string | number) => {
  if (!value) return '0'
  const parts = value.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
