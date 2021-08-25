import React from 'react'

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

export const readFileAndSetBase64 = (
  file: FileList | null,
  settingImageBuffer: React.Dispatch<React.SetStateAction<string | ArrayBuffer>>
) => {
  const reader = new FileReader()
  if (file && file[0]) {
    reader.readAsDataURL(file[0])
    reader.onload = () => {
      const result = reader.result
      if (result) settingImageBuffer(result)
    }
  }
}
