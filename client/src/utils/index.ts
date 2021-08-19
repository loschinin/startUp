export const dateConvert = (isoString: string) => {
  const dateType = new Date(isoString)
  const date = dateType.getDate()
  const month = dateType.getMonth()
  const year = dateType.getFullYear()
  const hours = dateType.getHours()
  const minutes = dateType.getMinutes()
  const addZero = (number: number): string | number =>
    number >= 10 ? number : `0${number}`
  return `${date}.${addZero(month)}.${year} at ${addZero(hours)}:${addZero(
    minutes
  )}`
}
