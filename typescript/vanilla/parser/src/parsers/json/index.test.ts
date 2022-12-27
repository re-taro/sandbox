import package_json from '../../../package.json'
import { json } from '.'
import type { JsonType } from '.'
import type { ParserOutput } from '../../types'

describe('json', () => {
  const parser = json
  test('package.json', () => {
    const jsonstr = JSON.stringify(package_json, null, 2)
    const input = [...jsonstr]
    const output = parser(input)
    expect(output).toEqual<ParserOutput<JsonType>>({
      result: 'success',
      data: package_json,
      rest: [],
    })
  })
})
