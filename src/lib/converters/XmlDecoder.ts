import type { ConverterOptions } from '@lib/types'
import { output as xmlOutput } from '@lib/outputs/XmlOutput'

/**
 * A string which uniquely identifies this operation.
 */
export const id = 'xmlDecoder'

/**
 * A string which uniquely identifies the output component used by
 * this converter.
 */
export const outputId = 'html'

/**
 * An operation that URL-decodes the given input string.
 *
 * @param input    - the string to convert.
 * @param _options - options that control the conversion process.
 *
 * @returns the converted string.
 */
export const operation = async (
  input: string,
  options: ConverterOptions = {},
): Promise<string> => {
  return xmlOutput(
    input.replace(
      /&(amp|lt|gt|quot|apos|#(?:\d+|x[\da-fA-F]+));/g,
      function (_, entity) {
        const entities: { [key: string]: string } = {
          amp: '&',
          apos: "'",
          gt: '>',
          lt: '<',
          quot: '"',
        }

        if (entity.charAt(0) === '#') {
          const code =
            entity.charAt(1) === 'x'
              ? parseInt(entity.substr(2), 16)
              : parseInt(entity.substr(1), 10)
          return String.fromCharCode(code)
        } else {
          return entities[entity]
        }
      },
    ),
    options,
  )
}
