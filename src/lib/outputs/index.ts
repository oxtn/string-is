export * as Base64DecodedOutput from '@lib/outputs/Base64DecodedOutput'
export * as Base64EncodedOutput from '@lib/outputs/Base64EncodedOutput'
export * as JsonOutput from '@lib/outputs/JsonOutput'

export interface Output {
  operation: (input: string) => string
  id: string
}