import { XMLBuilder } from 'fast-xml-parser'
import xmlFormatter from 'xml-formatter'

import type { ConverterOptions, Obj } from '@lib/types'
import { output as htmlOutput } from '@lib/outputs/HtmlOutput'

/**
 * A string which uniquely identifies this output function.
 */
export const id = 'xml'

/**
 * Converts the given object to an XML string.
 *
 * @param input   - The object to convert to XML.
 * @param options - A subset of XML formatting options defined by fast-xml-parser.
 *
 * @returns the formatted XML string.
 */
export const output = async (
  input: Obj | string,
  options: ConverterOptions = {},
): Promise<string> => {
  if (typeof input !== 'string') {
    const builder = new XMLBuilder({ arrayNodeName: 'item', format: true })
    const xml = builder.build(input)
    const formatted = await htmlOutput(xml, options)
    return `<?xml version="1.0" encoding="UTF-8"?>\n${formatted}`
  } else {
    return xmlFormatter(input, {
      collapseContent: true,
      indentation: '    ',
      lineSeparator: '\n',
    })
  }
}
