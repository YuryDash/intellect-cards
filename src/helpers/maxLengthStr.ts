export const maxLengthStr = (value: string, quantity: number = 16): string => {
  if (value.length >= quantity) {
    return value.slice(0, quantity) + '...'
  } else {
    return value
  }
}
