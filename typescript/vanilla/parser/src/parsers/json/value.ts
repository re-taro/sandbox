import { cat, or } from '../../combinators'
import { list, map, str } from '../../utils'
import { bool } from '../boolean'
import { char } from '../../characters'
import { number } from './number'
import { string } from './string'
import { whitespace } from './whitespace'
import type { Parser, ParserInput, ParserOutput } from '../../types'

export type ValueType = string | number | boolean | null | Array<ValueType> | ObjectType

const parseNull: Parser<null> = map(str('null'), () => null)

const valueContent: Parser<ValueType> = or<ValueType>([
  string, number, bool, parseNull, array, object,
])

export function value(input: ParserInput): ParserOutput<ValueType> {
  return map(cat([whitespace, valueContent, whitespace]), ([, v]) => v)(input)
}

const arrayContent: Parser<Array<ValueType>> = map(or([list(value, char(',')), whitespace]), a => a ?? [])

export function array(input: ParserInput): ParserOutput<Array<ValueType>> {
  return map(cat([char('['), arrayContent, char(']')]), ([, a]) => a)(input)
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface ObjectType { [key: string]: ValueType }

const objectKeyValue: Parser<ObjectType> = map(cat([whitespace, string, whitespace, char(':'), value]), ([, k, , , v]) => ({ [k]: v }))

const objectContent: Parser<ObjectType> = map(or([list(objectKeyValue, char(',')), whitespace]), a => (a ?? []).reduce((obj, kv) => ({ ...obj, ...kv }), {}))

export function object(input: ParserInput): ParserOutput<ObjectType> {
  return map(cat([char('{'), objectContent, char('}')]), ([, o]) => o)(input)
}
