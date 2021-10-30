import { isEmpty } from 'lodash'

import { UrlDecodeConverter, Converter } from '@lib/converters'

export const id = 'urlEncoded'

export const confidence = (input: string) => {
  if (isEmpty(input)) {
    return 0
  }

  let decoded
  try {
    decoded = UrlDecodeConverter.operation(input)
  } catch {
    return 0
  }

  // See https://stackoverflow.com/a/2295286
  if (decoded !== input) {
    return 100
  }

  return 0
}

export const converters = [UrlDecodeConverter] as Converter[]
